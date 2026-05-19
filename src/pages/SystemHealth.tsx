import { useState } from "react";
import { Activity, Server, Database, Cloud, RefreshCw, Play, Pause, AlertTriangle } from "lucide-react";

interface LogEntry {
  time: string;
  level: "INFO" | "WARN" | "ERROR";
  message: string;
}

export const SystemHealth = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { time: "2026-05-19 10:14:22", level: "INFO", message: "Webhook POST /api/v1/stripe/webhook - 200 OK" },
    { time: "2026-05-19 10:15:03", level: "INFO", message: "Sync worker completed KYC batch (45 records)" },
    { time: "2026-05-19 10:17:10", level: "WARN", message: "High memory usage detected on node-worker-02" },
    { time: "2026-05-19 10:18:45", level: "INFO", message: "Database backup successful (size: 4.2GB)" },
  ]);

  const [apiRunning, setApiRunning] = useState(true);
  const [dbRunning, setDbRunning] = useState(true);
  const [apiResponse, setApiResponse] = useState(42);
  const [dbCpu, setDbCpu] = useState(68);

  const addLog = (level: LogEntry["level"], message: string) => {
    const now = new Date();
    const time = now.toISOString().replace("T", " ").slice(0, 19);
    setLogs((prev) => [{ time, level, message }, ...prev].slice(0, 20));
  };

  const toggleApi = () => {
    setApiRunning((prev) => {
      const next = !prev;
      if (next) {
        setApiResponse(42);
        addLog("INFO", "APIs Core restarted successfully – response time restored");
      } else {
        addLog("ERROR", "APIs Core manually stopped by administrator");
      }
      return next;
    });
  };

  const toggleDb = () => {
    setDbRunning((prev) => {
      const next = !prev;
      if (next) {
        setDbCpu(30);
        addLog("INFO", "Database connection restored – CPU load normalized");
      } else {
        addLog("ERROR", "Database connection terminated by administrator");
      }
      return next;
    });
  };

  const refreshMetrics = () => {
    setApiResponse(Math.floor(Math.random() * 80) + 10);
    setDbCpu(Math.floor(Math.random() * 80) + 10);
    addLog("INFO", "Health check refreshed – metrics updated");
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Monitorização (System Health)</h1>
          <p className="text-slate-500 text-sm mt-1">Estado da infraestrutura, latência e carga em tempo real</p>
        </div>
        <button
          onClick={refreshMetrics}
          className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Atualizar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* API Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex justify-center items-center">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-900">APIs Core</h2>
              <p
                className={`text-sm font-medium flex items-center gap-1 ${
                  apiRunning ? "text-emerald-600" : "text-red-500"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${apiRunning ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}
                ></span>
                {apiRunning ? "Operacional" : "Parado"}
              </p>
            </div>
            <button
              onClick={toggleApi}
              className={`p-2 rounded-lg border transition-colors ${
                apiRunning
                  ? "border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  : "border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600"
              }`}
              title={apiRunning ? "Parar APIs" : "Iniciar APIs"}
            >
              {apiRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Tempo de Resposta (Média)</span>
                <span className="font-bold text-slate-800">{apiRunning ? apiResponse + "ms" : "--"}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${apiRunning ? "bg-emerald-500" : "bg-slate-300"}`}
                  style={{ width: apiRunning ? Math.min(apiResponse, 100) + "%" : "0%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Taxa de Erro (5xx)</span>
                <span className="font-bold text-slate-800">{apiRunning ? "0.01%" : "--"}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${apiRunning ? "bg-emerald-500" : "bg-slate-300"}`}
                  style={{ width: apiRunning ? "1%" : "0%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Database Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex justify-center items-center">
              <Database className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-900">Base de Dados</h2>
              <p
                className={`text-sm font-medium flex items-center gap-1 ${
                  dbRunning ? "text-emerald-600" : "text-red-500"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${dbRunning ? "bg-emerald-500" : "bg-red-500"}`}
                ></span>
                {dbRunning ? "Operacional" : "Parado"}
              </p>
            </div>
            <button
              onClick={toggleDb}
              className={`p-2 rounded-lg border transition-colors ${
                dbRunning
                  ? "border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  : "border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600"
              }`}
              title={dbRunning ? "Parar BD" : "Iniciar BD"}
            >
              {dbRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Carga do Servidor (CPU)</span>
                <span className={`font-bold ${dbRunning && dbCpu > 80 ? "text-red-500" : "text-slate-800"}`}>
                  {dbRunning ? dbCpu + "%" : "--"}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${dbRunning && dbCpu > 80 ? "bg-red-500" : "bg-blue-500"}`}
                  style={{ width: dbRunning ? dbCpu + "%" : "0%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Uso de Memória</span>
                <span className="font-bold text-slate-800">{dbRunning ? "4.2 GB / 8 GB" : "--"}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-blue-500"
                  style={{ width: dbRunning ? "52%" : "0%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-slate-900 text-slate-300 rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700">
          <span className="text-emerald-400 text-sm font-bold"># System Logs</span>
          <button
            onClick={clearLogs}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            Limpar logs
          </button>
        </div>
        <div className="p-4 font-mono text-xs overflow-x-auto space-y-1 max-h-64 overflow-y-auto">
          {logs.length === 0 && (
            <span className="text-slate-500 italic">Sem logs disponíveis.</span>
          )}
          {logs.map((log, i) => (
            <p key={i}>
              <span className="text-slate-500">[{log.time}]</span>{" "}
              <span
                className={
                  log.level === "INFO"
                    ? "text-emerald-400"
                    : log.level === "WARN"
                    ? "text-amber-400"
                    : "text-red-400"
                }
              >
                {log.level}
              </span>
              : {log.message}
            </p>
          ))}
          {logs.length > 0 && (
            <span className="animate-pulse text-slate-500">_</span>
          )}
        </div>
      </div>
    </div>
  );
};
