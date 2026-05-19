import { Activity, Server, Database, Cloud } from "lucide-react";

export const SystemHealth = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Monitorização (System Health)</h1>
        <p className="text-slate-500 text-sm mt-1">Estado da infraestrutura, latência e carga em tempo real</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* API Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex justify-center items-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">APIs Core</h2>
              <p className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Operacional
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Tempo de Resposta (Média)</span>
                <span className="font-bold text-slate-800">42ms</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Taxa de Erro (5xx)</span>
                <span className="font-bold text-slate-800">0.01%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '1%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Database Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex justify-center items-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Base de Dados</h2>
              <p className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Operacional
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Carga do Servidor (CPU)</span>
                <span className="font-bold text-amber-500">68%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Uso de Memória</span>
                <span className="font-bold text-slate-800">4.2 GB / 8 GB</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '52%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-xs overflow-x-auto">
        <p className="text-emerald-400 mb-2"># System Logs</p>
        <p>[2026-05-19 10:14:22] INFO: Webhook POST /api/v1/stripe/webhook - 200 OK</p>
        <p>[2026-05-19 10:15:03] INFO: Sync worker completed KYC batch (45 records)</p>
        <p className="text-amber-400">[2026-05-19 10:17:10] WARN: High memory usage detected on node-worker-02</p>
        <p>[2026-05-19 10:18:45] INFO: Database backup successful (size: 4.2GB)</p>
        <span className="animate-pulse">_</span>
      </div>
    </div>
  );
};
