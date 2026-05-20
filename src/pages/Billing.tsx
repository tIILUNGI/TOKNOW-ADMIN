import { useState, useEffect } from "react";
import { CreditCard, Search } from "lucide-react";
import { adminFetch } from "../lib/api";

export const Billing = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchSubscriptions = async () => {
    try {
      const data = await adminFetch<any[]>("/admin/subscriptions");
      setSubscriptions(data);
    } catch (err) {
      console.error("Erro ao carregar subscrições:", err);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleApprove = async (userId: number) => {
    try {
      await adminFetch(`/admin/subscriptions/${userId}/approve`, {
        method: "PUT",
      });
      fetchSubscriptions();
    } catch (err) {
      console.error("Erro ao aprovar subscrição:", err);
    }
  };

  const handleReject = async (userId: number) => {
    try {
      await adminFetch(`/admin/subscriptions/${userId}/reject`, {
        method: "PUT",
      });
      fetchSubscriptions();
    } catch (err) {
      console.error("Erro ao rejeitar subscrição:", err);
    }
  };

  const handleToggle = async (userId: number) => {
    try {
      await adminFetch(`/admin/subscriptions/${userId}/toggle`, {
        method: "PUT",
      });
      fetchSubscriptions();
    } catch (err) {
      console.error("Erro ao alterar estado da subscrição:", err);
    }
  };

  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      (sub.fullName && sub.fullName.toLowerCase().includes(search.toLowerCase())) ||
      (sub.email && sub.email.toLowerCase().includes(search.toLowerCase())) ||
      (sub.subscriptionStatus && sub.subscriptionStatus.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Gestão de Subscrições</h1>
      <p className="text-slate-500 text-sm">Aprovar e gerir assinaturas ativas na plataforma.</p>

      {/* Pedidos de Subscrição */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-slate-500" />
            <h2 className="text-base font-bold text-slate-900">Assinaturas de Clientes</h2>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar cliente ou estado..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <th className="px-4 py-2 text-left">Cliente</th>
              <th className="px-4 py-2 text-left">E‑mail</th>
              <th className="px-4 py-2 text-left">Plano Escolhido</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredSubscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-2.5 font-medium text-slate-800">{sub.fullName || "N/D"}</td>
                <td className="px-4 py-2.5 text-slate-700">{sub.email}</td>
                <td className="px-4 py-2.5 font-semibold text-blue-600">
                  {sub.plan ? sub.plan.name : "Nenhum"}
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      sub.subscriptionStatus === "ACTIVE"
                        ? "bg-emerald-50 text-emerald-700"
                        : sub.subscriptionStatus === "PENDING_APPROVAL"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {sub.subscriptionStatus === "ACTIVE"
                      ? "Ativo"
                      : sub.subscriptionStatus === "PENDING_APPROVAL"
                      ? "Pendente"
                      : sub.subscriptionStatus === "REJECTED"
                      ? "Rejeitado"
                      : "Inativo"}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right space-x-2">
                  {sub.subscriptionStatus === "PENDING_APPROVAL" ? (
                    <>
                      <button
                        onClick={() => handleApprove(sub.id)}
                        className="px-2.5 py-1 text-xs font-medium bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                      >
                        Aprovar
                      </button>
                      <button
                        onClick={() => handleReject(sub.id)}
                        className="px-2.5 py-1 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        Rejeitar
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleToggle(sub.id)}
                      className={`px-2.5 py-1 text-xs font-medium rounded border transition-colors ${
                        sub.subscriptionStatus === "ACTIVE"
                          ? "border-amber-200 text-amber-700 hover:bg-amber-50"
                          : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      }`}
                    >
                      {sub.subscriptionStatus === "ACTIVE" ? "Desativar" : "Reativar"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredSubscriptions.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-400">
                  Nenhuma subscrição ou registo de cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
