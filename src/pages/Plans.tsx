import { useState } from "react";
import { CreditCard, Plus, Search, Filter, X, Trash2, Save } from "lucide-react";

interface PlanType {
  id: number;
  name: string;
  price: number;
  users: number;
  status: string;
}

export const Plans = () => {
  const [plans, setPlans] = useState<PlanType[]>([
    { id: 1, name: "Básico", price: 19000, users: 10, status: "Ativo" },
    { id: 2, name: "Pro", price: 49000, users: 50, status: "Ativo" },
    { id: 3, name: "Enterprise", price: 0, users: 0, status: "Inativo" },
  ]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PlanType | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<PlanType | null>(null);
  const [form, setForm] = useState({ name: "", price: "", users: "", status: "Ativo" });
  const [filterStatus, setFilterStatus] = useState<string>("Todos");

  const formatKz = (price: number) =>
    price > 0
      ? `Kz ${price.toLocaleString("pt-AO")}/mês`
      : "Contactar";

  const filtered = plans.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Todos" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openCreate = () => {
    setEditingPlan(null);
    setForm({ name: "", price: "", users: "", status: "Ativo" });
    setShowModal(true);
  };

  const openEdit = (p: PlanType) => {
    setEditingPlan(p);
    setForm({ name: p.name, price: String(p.price), users: String(p.users), status: p.status });
    setShowModal(true);
  };

  const savePlan = () => {
    if (!form.name.trim()) return;
    const priceVal = form.price === "Contactar" ? 0 : Number(form.price.replace(/\D/g, "")) || 0;
    const usersVal = form.users === "Ilimitado" ? 0 : Number(form.users) || 0;
    if (editingPlan) {
      setPlans(
        plans.map((p) =>
          p.id === editingPlan.id ? { ...p, name: form.name, price: priceVal, users: usersVal, status: form.status } : p
        )
      );
    } else {
      setPlans([...plans, { id: Date.now(), name: form.name, price: priceVal, users: usersVal, status: form.status }]);
    }
    setShowModal(false);
  };

  const removePlan = (id: number) => {
    setPlans(plans.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Planos & Subscrições</h1>
          <p className="text-slate-500 text-sm mt-1">Gerencie os planos disponíveis, preços e limites de utilizadores.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="size-4" /> Novo Plano
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-3 items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar plano..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          >
            <option value="Todos">Todos os estados</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Preço</th>
              <th className="px-4 py-2">Utilizadores</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((plan) => (
              <tr key={plan.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-4 py-2 font-medium text-slate-800">{plan.name}</td>
                <td className="px-4 py-2 text-slate-700">{formatKz(plan.price)}</td>
                <td className="px-4 py-2 text-slate-700">{plan.users > 0 ? plan.users : "Ilimitado"}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      plan.status === "Ativo" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {plan.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-right flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEdit(plan)}
                    className="text-slate-500 hover:text-blue-600 transition-colors p-1"
                    title="Editar plano"
                  >
                    <CreditCard className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(plan)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                    title="Remover plano"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-400">
                  Nenhum plano encontrado.
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
                {editingPlan ? "Editar Plano" : "Novo Plano"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Nome do Plano</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Ex: Básico"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Preço (Kz)</label>
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Ex: 19000"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Limite de Utilizadores</label>
                <input
                  type="text"
                  value={form.users}
                  onChange={(e) => setForm({ ...form, users: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Ex: 10 ou Ilimitado"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Estado</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
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
                onClick={savePlan}
                disabled={!form.name.trim()}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingPlan ? "Guardar" : "Criar Plano"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Remover Plano</h2>
            <p className="text-sm text-slate-600">
              Tem certeza que deseja remover o plano <strong>{deleteConfirm.name}</strong>? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={() => removePlan(deleteConfirm.id)}
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
