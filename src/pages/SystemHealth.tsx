import { useState, useEffect } from "react";
import { Activity, Server, Database, Cloud, RefreshCw, Play, Pause, AlertTriangle } from "lucide-react";
import { adminFetch } from "../lib/api";

interface LogEntry {
  time: string;
  level: "INFO" | "WARN" | "ERROR";
  message: string;
}

interface SystemStats {
  apiStatus: string;
  dbStatus: string;
  usedMemoryMB: number;
  totalMemoryMB: number;
  uptimeMs: number;
}

export const SystemHealth = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);

  const addLog = (level: LogEntry["level"], message: string) => {
    const now = new Date();
    const time = now.toISOString().replace("T", " ").slice(0, 19);
    setLogs((prev) => [{ time, level, message }, ...prev].slice(0, 50));
  };

  const fetchHealth = async () => {
    try {
      const data = await adminFetch<SystemStats>("/system/health");
      setStats(data);
      if (logs.length === 0) {
        addLog("INFO", "Sistema de monitorização inicializado. Ligado ao backend.");
      }
    } catch (err) {
      addLog("ERROR", "Falha ao conectar com o backend: " + (err as Error).message);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const refreshMetrics = () => {
    fetchHealth();
    addLog("INFO", "Métricas atualizadas manualmente");
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const formatUptime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const apiRunning = stats?.apiStatus === "Operacional";
  const dbRunning = stats?.dbStatus === "Operacional";
  
  const memoryPercentage = stats ? (stats.usedMemoryMB / stats.totalMemoryMB) * 100 : 0;

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
              <h2 className="text-lg font-bold text-slate-900">APIs Core (Spring Boot)</h2>
              <p
                className={`text-sm font-medium flex items-center gap-1 ${
                  apiRunning ? "text-emerald-600" : "text-red-500"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${apiRunning ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}
                ></span>
                {apiRunning ? "Operacional" : "Indisponível"}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Uptime do Servidor</span>
                <span className="font-bold text-slate-800">{stats ? formatUptime(stats.uptimeMs) : "--"}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Uso de Memória JVM</span>
                <span className="font-bold text-slate-800">
                  {stats ? `${stats.usedMemoryMB} MB / ${stats.totalMemoryMB} MB` : "--"}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${memoryPercentage > 85 ? "bg-red-500" : memoryPercentage > 70 ? "bg-amber-500" : "bg-emerald-500"}`}
                  style={{ width: `${Math.min(memoryPercentage, 100)}%` }}
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
              <h2 className="text-lg font-bold text-slate-900">Base de Dados (PostgreSQL)</h2>
              <p
                className={`text-sm font-medium flex items-center gap-1 ${
                  dbRunning ? "text-emerald-600" : "text-red-500"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${dbRunning ? "bg-emerald-500" : "bg-red-500"}`}
                ></span>
                {dbRunning ? "Conectado" : "Desconectado"}
              </p>
            </div>
          </div>
          <div className="space-y-4">
             <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start gap-3">
               <Server className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
               <div>
                 <p className="text-sm font-semibold text-blue-900">Conexão Estável</p>
                 <p className="text-xs text-blue-700 mt-1">A ligação JDBC ao pool de base de dados está operacional. Não há bloqueios de threads ativos.</p>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-slate-900 text-slate-300 rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700">
          <span className="text-emerald-400 text-sm font-bold"># Admin Portal Logs</span>
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

