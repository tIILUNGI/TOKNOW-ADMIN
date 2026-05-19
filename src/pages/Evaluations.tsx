import { FileCheck, Search, Eye } from "lucide-react";

export const Evaluations = () => {
  const evaluations = [
    { id: "EV-2041", entity: "TechCorp Lda.", type: "Avaliação 360º", progress: 100, status: "Concluído", date: "18 Mai 2026" },
    { id: "EV-2042", entity: "Global Logistics", type: "Due Diligence (KYC)", progress: 45, status: "Em Progresso", date: "19 Mai 2026" },
    { id: "EV-2043", entity: "Retail Group SA", type: "Auditoria Interna", progress: 0, status: "Pendente", date: "20 Mai 2026" },
    { id: "EV-2044", entity: "FinTech Solutions", type: "Due Diligence (KYC)", progress: 100, status: "Revisão", date: "17 Mai 2026" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Avaliações e Due Diligence</h1>
        <p className="text-slate-500 text-sm mt-1">Acompanhe as auditorias e formulários preenchidos na aplicação</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Pesquisar entidade ou ID..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
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
              {evaluations.map((ev) => (
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
                        <div className={\`h-1.5 rounded-full \${ev.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}\`} style={{ width: \`\${ev.progress}%\` }}></div>
                      </div>
                      <span className="text-xs text-slate-500 font-medium w-8">{ev.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={\`inline-flex px-2.5 py-1 rounded-full text-xs font-medium \${
                      ev.status === 'Concluído' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                      ev.status === 'Em Progresso' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 
                      ev.status === 'Revisão' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 
                      'bg-slate-100 text-slate-600 border border-slate-200'
                    }\`}>
                      {ev.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-600 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-md hover:bg-blue-50 text-xs font-medium border border-slate-200 flex items-center gap-1.5 ml-auto">
                      <Eye className="w-3.5 h-3.5" /> Analisar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
