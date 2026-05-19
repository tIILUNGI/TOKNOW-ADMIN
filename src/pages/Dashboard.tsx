import { useNavigate } from "react-router-dom";
import {
  Users,
  CreditCard,
  Activity,
  FileCheck,
  ChevronRight,
  TrendingUp,
  Server,
} from "lucide-react";

export const Dashboard = () => {
  const navigate = useNavigate();

  const topStats = [
    {
      title: "Utilizadores Ativos",
      total: "2.405",
      subtitle: "Perfis ativos na plataforma",
      icon: Users,
      path: "/users",
    },
    {
      title: "MRR Atual",
      total: "Kz45.2M",
      subtitle: "Crescimento de 12% este mês",
      icon: TrendingUp,
      path: "/plans",
    },
    {
      title: "System Health",
      total: "99.9%",
      subtitle: "APIs e Base de Dados estáveis",
      icon: Server,
      path: "/health",
    },
    {
      title: "Avaliações KYC / 360",
      total: "128",
      subtitle: "Auditorias pendentes de análise",
      icon: FileCheck,
      path: "/evaluations",
    },
  ];

  const modules = [
    {
      title: "Gestão de Utilizadores",
      desc: "Controlar papéis, permissões e status de todos os perfis ativos na plataforma.",
      total: 2405,
      pendente: 42,
      ativo: 2363,
      icon: Users,
      action: "Gerir Acessos",
      path: "/users",
    },
    {
      title: "Planos e Subscrições",
      desc: "Criar e editar assinaturas (Básico, Pro, Enterprise) e acompanhar métricas.",
      total: 3,
      pendente: 12,
      ativo: 840,
      icon: CreditCard,
      action: "Configurar Planos",
      path: "/plans",
    },
    {
      title: "Monitorização",
      desc: "Acompanhar em tempo real os webhooks, base de dados e a latência das APIs.",
      total: "100%",
      pendente: "2ms",
      ativo: "OK",
      icon: Activity,
      action: "Ver Logs do Sistema",
      path: "/health",
    },
    {
      title: "Avaliações e Due Diligence",
      desc: "Auditar o progresso dos módulos de Avaliação KYC/KYS da aplicação.",
      total: 450,
      pendente: 128,
      ativo: 322,
      icon: FileCheck,
      action: "Acompanhar Auditorias",
      path: "/evaluations",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Cérebro Central da Plataforma
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Monitorização global, gestão financeira e administração de acessos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {topStats.map((stat, i) => (
          <button
            key={i}
            onClick={() => navigate(stat.path)}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full text-left hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">
                {stat.title}
              </h3>
              <stat.icon className="size-4 text-blue-500" />
            </div>
            <div className="mt-auto">
              <p className="text-3xl font-bold text-slate-900 mb-1">{stat.total}</p>
              <p className="text-xs text-slate-400">{stat.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Módulos de Administração</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {modules.map((mod, i) => (
            <button
              key={i}
              onClick={() => navigate(mod.path)}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden text-left hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group w-full"
            >
              <div className="p-6 pb-4 flex-1">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  <mod.icon className="size-5 text-blue-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6 h-12">{mod.desc}</p>

                <div className="flex justify-between text-center px-2">
                  <div>
                    <p className="text-lg font-bold text-slate-800 leading-none">{mod.total}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">Total</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-amber-500 leading-none">{mod.pendente}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">Pendente/Latência</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-emerald-500 leading-none">{mod.ativo}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">Ativo/Status</p>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(mod.path);
                  }}
                  className="w-full py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition-colors flex items-center justify-center gap-2 pointer-events-none"
                >
                  {mod.action} <ChevronRight className="size-4 text-slate-400" />
                </button>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
