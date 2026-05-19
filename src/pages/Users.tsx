import { useState } from "react";
import { User, Settings, LogOut, Plus, Search, X, Trash2 } from "lucide-react";

interface UserType {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const Users = () => {
  const [users, setUsers] = useState<UserType[]>([
    { id: 1, name: "Ana Silva", email: "ana.silva@toknow.ao", role: "Administrador" },
    { id: 2, name: "Bruno Costa", email: "bruno.costa@toknow.ao", role: "Gestor" },
    { id: 3, name: "Carla Mendes", email: "carla.mendes@toknow.ao", role: "Operador" },
  ]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<UserType | null>(null);
  const [form, setForm] = useState({ name: "", email: "", role: "Operador" });

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", role: "Operador" });
    setShowModal(true);
  };

  const openEdit = (u: UserType) => {
    setEditingUser(u);
    setForm({ name: u.name, email: u.email, role: u.role });
    setShowModal(true);
  };

  const saveUser = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...form } : u)));
    } else {
      setUsers([...users, { id: Date.now(), ...form }]);
    }
    setShowModal(false);
  };

  const removeUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
    setDeleteConfirm(null);
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
                  <span className="text-sm text-slate-800">{u.name}</span>
                </td>
                <td className="px-4 py-2 text-sm text-slate-700">{u.email}</td>
                <td className="px-4 py-2 text-sm text-slate-700">{u.role}</td>
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
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                <label className="text-sm font-medium text-slate-700 block mb-1">Função</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Gestor">Gestor</option>
                  <option value="Operador">Operador</option>
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
                disabled={!form.name.trim() || !form.email.trim()}
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
              Tem certeza que deseja remover <strong>{deleteConfirm.name}</strong>? Esta ação não pode ser desfeita.
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
