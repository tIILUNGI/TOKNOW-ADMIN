import { useState, useEffect } from "react";
import { User, Settings, LogOut, Plus, Search, X, Trash2 } from "lucide-react";
import { adminFetch } from "../lib/api";

interface UserType {
  id: number;
  fullName: string;
  email: string;
  roles: string;
}

export const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<UserType | null>(null);
  const [form, setForm] = useState({ fullName: "", email: "", roles: "ROLE_USER", password: "" });

  const fetchUsers = async () => {
    try {
      const data = await adminFetch<UserType[]>("/users");
      setUsers(data);
    } catch (err) {
      console.error("Erro ao carregar utilizadores", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      (u.fullName && u.fullName.toLowerCase().includes(search.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const openCreate = () => {
    setEditingUser(null);
    setForm({ fullName: "", email: "", roles: "ROLE_USER", password: "" });
    setShowModal(true);
  };

  const openEdit = (u: UserType) => {
    setEditingUser(u);
    setForm({ fullName: u.fullName, email: u.email, roles: u.roles, password: "" });
    setShowModal(true);
  };

  const saveUser = async () => {
    if (!form.fullName.trim() || !form.email.trim()) return;
    try {
      if (editingUser) {
        await adminFetch(`/users/${editingUser.id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await adminFetch("/users", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }
      fetchUsers();
      setShowModal(false);
    } catch (err) {
      console.error("Erro ao guardar utilizador", err);
    }
  };

  const removeUser = async (id: number) => {
    try {
      await adminFetch(`/users/${id}`, { method: "DELETE" });
      fetchUsers();
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Erro ao remover utilizador", err);
      alert("Não é possível remover este utilizador (pode ser o próprio administrador).");
      setDeleteConfirm(null);
    }
  };

  const displayRole = (role: string) => {
    if (role?.includes("ADMIN")) return "Administrador";
    if (role?.includes("COMPLIANCE_MANAGER")) return "Gestor de Compliance";
    return "Utilizador (Cliente)";
  };

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Gestão de Utilizadores</h1>
      <div className="mb-4 flex items-center gap-3">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar utilizador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors ml-auto"
        >
          <Plus className="size-4" /> Novo Utilizador
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-slate-600">Nome</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-slate-600">E‑mail</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-slate-600">Função</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-slate-600">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="px-4 py-2 flex items-center gap-2">
                  <User className="size-4 text-slate-500" />
                  <span className="text-sm text-slate-800">{u.fullName || "Sem Nome"}</span>
                </td>
                <td className="px-4 py-2 text-sm text-slate-700">{u.email}</td>
                <td className="px-4 py-2 text-sm text-slate-700">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    u.roles?.includes("ADMIN") ? "bg-purple-100 text-purple-700" :
                    u.roles?.includes("COMPLIANCE") ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-700"
                  }`}>
                    {displayRole(u.roles)}
                  </span>
                </td>
                <td className="px-4 py-2 text-right flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEdit(u)}
                    className="text-slate-500 hover:text-blue-600 transition-colors p-1"
                    title="Editar perfil"
                  >
                    <Settings className="size-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(u)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                    title="Remover utilizador"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-400">
                  Nenhum utilizador encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                {editingUser ? "Editar Utilizador" : "Novo Utilizador"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Nome</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">E-mail</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="email@toknow.ao"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">
                  {editingUser ? "Nova Palavra-passe (Opcional)" : "Palavra-passe"}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="******"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Função</label>
                <select
                  value={form.roles}
                  onChange={(e) => setForm({ ...form, roles: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                >
                  <option value="ROLE_ADMIN">Administrador</option>
                  <option value="ROLE_COMPLIANCE_MANAGER">Gestor de Compliance</option>
                  <option value="ROLE_USER">Utilizador</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={saveUser}
                disabled={!form.fullName.trim() || !form.email.trim() || (!editingUser && !form.password)}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingUser ? "Guardar" : "Criar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Remover Utilizador</h2>
            <p className="text-sm text-slate-600">
              Tem certeza que deseja remover <strong>{deleteConfirm.fullName}</strong>? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={() => removeUser(deleteConfirm.id)}
                className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
