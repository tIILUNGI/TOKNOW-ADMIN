import { useState } from "react";
import { FileText, CreditCard, Receipt, Download, Calendar, DollarSign, CheckCircle, AlertCircle } from "lucide-react";

interface Invoice {
  id: string;
  date: string;
  plan: string;
  amount: number;
  status: "Pago" | "Pendente" | "Atrasado";
  dueDate: string;
}

export const Billing = () => {
  const [invoices] = useState<Invoice[]>([
    { id: "FT-2026-0051", date: "01 Mai 2026", plan: "Plano Pro", amount: 49000, status: "Pago", dueDate: "10 Mai 2026" },
    { id: "FT-2026-0050", date: "01 Abr 2026", plan: "Plano Pro", amount: 49000, status: "Pago", dueDate: "10 Abr 2026" },
    { id: "FT-2026-0049", date: "01 Mar 2026", plan: "Plano Pro", amount: 49000, status: "Pago", dueDate: "10 Mar 2026" },
    { id: "FT-2026-0048", date: "01 Fev 2026", plan: "Plano Básico", amount: 19000, status: "Atrasado", dueDate: "10 Fev 2026" },
  ]);

  const currentPlan = {
    name: "Pro",
    amount: 49000,
    renewDate: "01 Jun 2026",
    usersUsed: 47,
    maxUsers: 50,
    status: "Ativo",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Faturação</h1>
      <p className="text-slate-500 text-sm">Histórico de faturas, plano atual e método de pagamento.</p>

      {/* Current Plan */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Plano Atual</h2>
            <p className="text-xs text-slate-500">Detalhes da sua subscrição ativa.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Plano</p>
            <p className="text-xl font-bold text-slate-800 mt-1">{currentPlan.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              <Calendar className="w-3 h-3 inline mr-1" />
              Renova em {currentPlan.renewDate}
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Valor Mensal</p>
            <p className="text-xl font-bold text-emerald-600 mt-1">
              Kz{currentPlan.amount.toLocaleString("pt-AO")}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              <DollarSign className="w-3 h-3 inline mr-1" />
              Pagamento recorrente
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Utilizadores</p>
            <p className="text-xl font-bold text-slate-800 mt-1">
              {currentPlan.usersUsed}/{currentPlan.maxUsers}
            </p>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
              <div
                className="h-1.5 rounded-full bg-blue-500"
                style={{ width: (currentPlan.usersUsed / currentPlan.maxUsers) * 100 + "%" }}
              />
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Estado</p>
            <p className="text-xl font-bold text-emerald-600 mt-1">{currentPlan.status}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              <CheckCircle className="w-3 h-3 inline mr-1" />
              Pagamento em dia
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-base font-bold text-slate-900 mb-4">Método de Pagamento</h2>
        <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg bg-slate-50">
          <div className="w-12 h-8 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-600">
            MB
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800">Multicaixa / Transferência</p>
            <p className="text-xs text-slate-500">Pagamento via referência bancária</p>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">Confirmado</span>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center gap-2">
          <Receipt className="w-4 h-4 text-slate-500" />
          <h2 className="text-base font-bold text-slate-900">Histórico de Faturas</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <th className="px-4 py-2 text-left">Número</th>
              <th className="px-4 py-2 text-left">Data</th>
              <th className="px-4 py-2 text-left">Plano</th>
              <th className="px-4 py-2 text-left">Valor (Kz)</th>
              <th className="px-4 py-2 text-left">Vencimento</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-2.5 font-mono text-slate-800 text-xs">{inv.id}</td>
                <td className="px-4 py-2.5 text-slate-700">{inv.date}</td>
                <td className="px-4 py-2.5 text-slate-700">{inv.plan}</td>
                <td className="px-4 py-2.5 font-semibold text-slate-800">
                  Kz{inv.amount.toLocaleString("pt-AO")}
                </td>
                <td className="px-4 py-2.5 text-slate-700">{inv.dueDate}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                      inv.status === "Pago"
                        ? "bg-emerald-50 text-emerald-700"
                        : inv.status === "Atrasado"
                        ? "bg-red-50 text-red-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {inv.status === "Pago" && <CheckCircle className="w-3 h-3" />}
                    {inv.status === "Atrasado" && <AlertCircle className="w-3 h-3" />}
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <button
                    className="flex items-center gap-1.5 ml-auto px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 transition-colors"
                    title="Descarregar fatura"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
