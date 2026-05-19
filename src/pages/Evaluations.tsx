import { useState } from "react";
import { FileCheck, Search, Eye, X, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface EvaluationType {
  id: string;
  entity: string;
  type: string;
  progress: number;
  status: string;
  date: string;
}

export const Evaluations = () => {
  const [evaluations, setEvaluations] = useState<EvaluationType[]>([
    { id: "EV-2041", entity: "TechCorp Lda.", type: "Avaliação 360º", progress: 100, status: "Concluído", date: "18 Mai 2026" },
    { id: "EV-2042", entity: "Global Logistics", type: "Due Diligence (KYC)", progress: 45, status: "Em Progresso", date: "19 Mai 2026" },
    { id: "EV-2043", entity: "Retail Group SA", type: "Auditoria Interna", progress: 0, status: "Pendente", date: "20 Mai 2026" },
    { id: "EV-2044", entity: "FinTech Solutions", type: "Due Diligence (KYC)", progress: 100, status: "Revisão", date: "17 Mai 2026" },
  ]);
  const [search, setSearch] = useState("");
  const [selectedEval, setSelectedEval] = useState<EvaluationType | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const filtered = evaluations.filter(
    (ev) =>
      ev.entity.toLowerCase().includes(search.toLowerCase()) ||
      ev.id.toLowerCase().includes(search.toLowerCase())
  );

  const openDetail = (ev: EvaluationType) => {
    setSelectedEval(ev);
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedEval(null);
  };

  const advanceStatus = (id: string) => {
    const flow = ["Pendente", "Em Progresso", "Concluído", "Revisão"];
    setEvaluations(
      evaluations.map((ev) => {
        if (ev.id !== id) return ev;
        const idx = flow.indexOf(ev.status);
        const next = idx < flow.length - 1 ? flow[idx + 1] : ev.status;
        const progressMap: Record<string, number> = { Pendente: 0, "Em Progresso": 45, Concluído: 100, Revisão: 100 };
        return { ...ev, status: next, progress: progressMap[next] ?? ev.progress };
      })
    );
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "Concluído":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "Em Progresso":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Revisão":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      default:
        return "bg-slate-100 text-slate-600 border border-slate-200";
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "Concluído":
        return <CheckCircle2 className="w-4 h-4" />;
      case "Em Progresso":
        return <Clock className="w-4 h-4" />;
      case "Revisão":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileCheck className="w-4 h-4" />;
    }
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
                <th className="px-6 py-4">ID & Entidade</th>
                <th className="px-6 py-4">Tipo de Avaliação</th>
                <th className="px-6 py-4 w-48">Progresso</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">{ev.entity}</p>
                    <p className="text-slate-500 text-xs font-mono mt-0.5">{ev.id} • {ev.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-700">{ev.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-100 rounded-full h-1.5 flex-1">
                        <div
                          className={"h-1.5 rounded-full " + (ev.progress === 100 ? "bg-emerald-500" : "bg-blue-500")}
                          style={{ width: ev.progress + "%" }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 font-medium w-8">{ev.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium items-center gap-1 ${statusBadge(ev.status)}`}>
                      {statusIcon(ev.status)}
                      {ev.status}
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
                      <button
                        onClick={() => advanceStatus(ev.id)}
                        className="text-slate-600 hover:text-emerald-600 transition-colors px-3 py-1.5 rounded-md hover:bg-emerald-50 text-xs font-medium border border-slate-200 flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" /> Avançar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-400">
                    Nenhuma avaliação encontrada.
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
              <h2 className="text-lg font-bold text-slate-900">{selectedEval.entity}</h2>
              <button onClick={closeDetail} className="text-slate-400 hover:text-slate-600">
                <X className="size-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 text-xs mb-0.5">ID</p>
                <p className="font-mono text-slate-800">{selectedEval.id}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-0.5">Data</p>
                <p className="text-slate-800">{selectedEval.date}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-0.5">Tipo</p>
                <p className="text-slate-800">{selectedEval.type}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-0.5">Status</p>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium items-center gap-1 ${statusBadge(selectedEval.status)}`}>
                  {statusIcon(selectedEval.status)}
                  {selectedEval.status}
                </span>
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Progresso</p>
              <div className="flex items-center gap-3">
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={"h-2 rounded-full " + (selectedEval.progress === 100 ? "bg-emerald-500" : "bg-blue-500")}
                    style={{ width: selectedEval.progress + "%" }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-800 w-10">{selectedEval.progress}%</span>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={closeDetail} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
                Fechar
              </button>
              <button
                onClick={() => {
                  advanceStatus(selectedEval.id);
                  closeDetail();
                }}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" /> Avançar Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
