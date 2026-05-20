import { useState, useEffect } from "react";
import { FileCheck, Search, Eye, X, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { adminFetch } from "../lib/api";

interface EvaluationType {
  id: number;
  token: string;
  recipient_name: string;
  employee_name: string;
  percentage: number;
  classification: string;
  status: string;
  created_at?: string;
}

export const Evaluations = () => {
  const [evaluations, setEvaluations] = useState<EvaluationType[]>([]);
  const [search, setSearch] = useState("");
  const [selectedEval, setSelectedEval] = useState<EvaluationType | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const fetchEvaluations = async () => {
    try {
      const data = await adminFetch<EvaluationType[]>("/collaboration/360/links");
      setEvaluations(data);
    } catch (err) {
      console.error("Erro ao carregar avaliações", err);
    }
  };

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const filtered = evaluations.filter(
    (ev) =>
      (ev.employee_name && ev.employee_name.toLowerCase().includes(search.toLowerCase())) ||
      (ev.recipient_name && ev.recipient_name.toLowerCase().includes(search.toLowerCase())) ||
      (ev.token && ev.token.toLowerCase().includes(search.toLowerCase()))
  );

  const openDetail = (ev: EvaluationType) => {
    setSelectedEval(ev);
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedEval(null);
  };

  const statusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "concluded":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "pending":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "review":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      default:
        return "bg-slate-100 text-slate-600 border border-slate-200";
    }
  };

  const statusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "concluded":
        return <CheckCircle2 className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "review":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileCheck className="w-4 h-4" />;
    }
  };

  const displayStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case "concluded": return "Concluído";
      case "pending": return "Pendente";
      case "review": return "Revisão";
      default: return status || "Pendente";
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/D";
    return new Date(dateStr).toLocaleDateString("pt-AO", { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Avaliações e Due Diligence</h1>
        <p className="text-slate-500 text-sm mt-1">Acompanhe as auditorias e formulários preenchidos na aplicação</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-wrap gap-3 items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar entidade ou ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <span className="text-sm text-slate-500 ml-auto">
            {filtered.length} avaliação{filtered.length !== 1 ? "ões" : ""}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">ID & Avaliado</th>
                <th className="px-6 py-4">Avaliador (Par)</th>
                <th className="px-6 py-4 w-48">Desempenho</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">{ev.employee_name || "N/D"}</p>
                    <p className="text-slate-500 text-xs font-mono mt-0.5">{ev.token?.substring(0, 8)}... • {formatDate(ev.created_at)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-700">{ev.recipient_name || "N/D"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-100 rounded-full h-1.5 flex-1">
                        <div
                          className={"h-1.5 rounded-full " + ((ev.percentage || 0) >= 80 ? "bg-emerald-500" : "bg-blue-500")}
                          style={{ width: (ev.percentage || 0) + "%" }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 font-medium w-8">{Math.round(ev.percentage || 0)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium items-center gap-1 ${statusBadge(ev.status)}`}>
                      {statusIcon(ev.status)}
                      {displayStatus(ev.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => openDetail(ev)}
                        className="text-slate-600 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-md hover:bg-blue-50 text-xs font-medium border border-slate-200 flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" /> Analisar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-400">
                    Nenhuma avaliação encontrada no backend.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && selectedEval && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{selectedEval.employee_name}</h2>
              <button onClick={closeDetail} className="text-slate-400 hover:text-slate-600">
                <X className="size-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 text-xs mb-0.5">ID / Token</p>
                <p className="font-mono text-slate-800">{selectedEval.token}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-0.5">Data de Criação</p>
                <p className="text-slate-800">{formatDate(selectedEval.created_at)}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-0.5">Avaliador Associado</p>
                <p className="text-slate-800">{selectedEval.recipient_name || "N/D"}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-0.5">Status</p>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium items-center gap-1 ${statusBadge(selectedEval.status)}`}>
                  {statusIcon(selectedEval.status)}
                  {displayStatus(selectedEval.status)}
                </span>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-0.5">Classificação Final</p>
                <p className="text-slate-800 font-semibold">{selectedEval.classification || "N/A"}</p>
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Resultado (Desempenho)</p>
              <div className="flex items-center gap-3">
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={"h-2 rounded-full " + ((selectedEval.percentage || 0) >= 80 ? "bg-emerald-500" : "bg-blue-500")}
                    style={{ width: (selectedEval.percentage || 0) + "%" }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-800 w-10">{Math.round(selectedEval.percentage || 0)}%</span>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={closeDetail} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
