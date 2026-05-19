import {
  Users,
  CreditCard,
  LayoutDashboard,
  Settings,
  LogOut,
  Bell,
  Search,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  UserPlus,
  Package,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, FormEvent } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import { auth, loginWithGoogle, logout, db } from "./lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { cn, formatDate, formatCurrency } from "./lib/utils";

// --- Shared Components ---

const Sidebar = ({
  user,
  isOpen,
  setIsOpen,
}: {
  user: User;
  isOpen: boolean;
  setIsOpen: (o: boolean) => void;
}) => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Users, label: "Usuários", path: "/users" },
    { icon: Package, label: "Planos", path: "/plans" },
    { icon: CreditCard, label: "Subscrições", path: "/subscriptions" },
    { icon: Settings, label: "Definições", path: "/settings" },
  ];

  return (
    <>
      {/* Overlay para mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:h-screen",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-8 pb-4">
          <div className="flex items-center justify-between mb-10 text-slate-900">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <Activity className="text-white size-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight uppercase">
                To-Know{" "}
                <span className="text-indigo-600 font-medium">Admin</span>
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <Activity className="size-5 rotate-45" />
            </button>
          </div>
          <div className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-6 px-1">
            Gestão Principal
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 group font-semibold text-sm",
                  isActive
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200"
                    : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600",
                )
              }
            >
              <item.icon className="size-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="mb-6 bg-slate-50 rounded-3xl p-5 border border-slate-100">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">
              Plano Atual
            </p>
            <p className="text-sm font-bold text-slate-900">Enterprise Admin</p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-indigo-500 w-3/4 h-full"></div>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 w-full px-5 py-4 rounded-2xl hover:bg-red-50 text-slate-500 hover:text-red-500 transition-all font-bold text-sm group"
          >
            <LogOut className="size-5 transition-transform group-hover:-translate-x-1" />
            <span>Encerrar Sessão</span>
          </button>
        </div>
      </aside>
    </>
  );
};

const Header = ({
  user,
  setIsSidebarOpen,
}: {
  user: User;
  setIsSidebarOpen: (o: boolean) => void;
}) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-30 px-6 lg:px-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-100 hover:text-indigo-600 transition-all active:scale-95"
        >
          <Activity className="size-5" />
        </button>
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl group focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all">
          <Search className="size-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Procurar tudo..."
            className="bg-transparent text-sm outline-none w-64 text-slate-900 placeholder:text-slate-400 font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:transition-all relative group">
          <Bell className="size-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-4 pl-5 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-none mb-1">
              {user.displayName}
            </p>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">
              Admin Nível Max
            </p>
          </div>
          <img
            src={
              user.photoURL ||
              `https://ui-avatars.com/api/?name=${user.displayName}`
            }
            className="w-11 h-11 rounded-2xl border-2 border-white shadow-xl shadow-indigo-100/50"
            alt="Perfil"
          />
        </div>
      </div>
    </header>
  );
};

// --- Pages ---

const Dashboard = () => {
  const stats = [
    {
      label: "Receita Mensal Recorrente",
      value: "R$ 24.842,00",
      trend: "+12.4% vs mês anterior",
      icon: TrendingUp,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Utilizadores Ativos",
      value: "1.402",
      trend: "70% da quota preenchida",
      icon: Users,
      color: "text-slate-600",
      bg: "bg-slate-100",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12"
    >
      {/* MRR Card */}
      <div className="md:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-500 ease-out group">
        <div className="flex justify-between items-start">
          <span className="p-4 bg-indigo-50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
            <TrendingUp className="w-8 h-8 text-indigo-600" />
          </span>
          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
            {stats[0].trend}
          </span>
        </div>
        <div className="mt-12">
          <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-2">
            {stats[0].label}
          </p>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
            {stats[0].value}
          </h2>
        </div>
      </div>

      {/* active Users Card */}
      <div className="md:col-span-1 bg-white border border-slate-200 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-500 ease-out">
        <div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            {stats[1].label}
          </p>
          <div className="flex items-end gap-2">
            <h3 className="text-5xl font-black text-slate-900 leading-none tracking-tighter">
              {stats[1].value}
            </h3>
            <span className="text-[10px] text-slate-400 font-black mb-1 uppercase tracking-widest">
              / 5k Max
            </span>
          </div>
        </div>
        <div className="flex -space-x-3 mt-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-2xl bg-indigo-50 border-2 border-white flex items-center justify-center text-[10px] font-black text-indigo-400 shadow-sm"
            >
              {i === 5 ? "+34" : i}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Card */}
      <div className="md:col-span-1 bg-indigo-600 rounded-[2.5rem] p-10 flex flex-col justify-between text-white shadow-2xl shadow-indigo-200 active:scale-[0.98] transition-all duration-500 cursor-pointer group hover:bg-slate-900">
        <div className="flex justify-between items-start">
          <p className="text-indigo-100 text-[10px] font-black uppercase tracking-[0.3em]">
            Ação Rápida
          </p>
          <Activity className="w-7 h-7 text-indigo-300 group-hover:rotate-[360deg] transition-all duration-700" />
        </div>
        <div className="mt-10">
          <h4 className="text-2xl font-black leading-tight mb-6 tracking-tight">
            Novo Plano de Subscrição
          </h4>
          <button className="w-full bg-white text-slate-900 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl group-hover:bg-indigo-50 transition-colors">
            Configurar Agora
          </button>
        </div>
      </div>

      {/* Recent Subscriptions Section */}
      <div className="md:col-span-2 row-span-2 bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm flex flex-col">
        <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <h5 className="font-black text-slate-900 tracking-tighter text-xl">
            Subscrições Recentes
          </h5>
          <button className="text-indigo-600 text-xs font-bold uppercase tracking-widest hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all">
            Ver Todas
          </button>
        </div>
        <div className="flex-1 overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-white text-[10px] uppercase text-slate-400 font-black">
              <tr className="border-b border-slate-100">
                <th className="px-10 py-5 tracking-widest">Utilizador</th>
                <th className="px-10 py-5 tracking-widest">Plano</th>
                <th className="px-10 py-5 text-right tracking-widest">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                {
                  name: "Marcos Silva",
                  plan: "Pro Mensal",
                  status: "Ativo",
                  color: "emerald",
                },
                {
                  name: "Júlia Reis",
                  plan: "Básico Anual",
                  status: "Ativo",
                  color: "emerald",
                },
                {
                  name: "Artur P.",
                  plan: "Pro Mensal",
                  status: "Pendente",
                  color: "slate",
                },
                {
                  name: "Carla Dias",
                  plan: "Enterprise",
                  status: "Revisão",
                  color: "amber",
                },
              ].map((sub, i) => (
                <tr
                  key={i}
                  className="text-sm hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-10 py-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 shadow-sm flex items-center justify-center font-bold text-slate-400">
                      {sub.name.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                      {sub.name}
                    </span>
                  </td>
                  <td className="px-10 py-6 font-bold text-slate-500 tracking-tight text-xs">
                    {sub.plan}
                  </td>
                  <td className="px-10 py-6 text-right">
                    <span
                      className={cn(
                        "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm",
                        sub.color === "emerald"
                          ? "bg-emerald-50 text-emerald-600"
                          : sub.color === "amber"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-slate-100 text-slate-500",
                      )}
                    >
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Distribution Card */}
      <div className="md:col-span-2 lg:col-span-1 bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm flex flex-col justify-between">
        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">
          Distribuição de Planos
        </h5>
        <div className="flex items-end gap-4 h-40 mb-10">
          <div
            className="flex-1 bg-indigo-600 rounded-2xl h-[85%] shadow-xl shadow-indigo-100 hover:h-[90%] transition-all duration-500 cursor-help"
            title="Plano Pro: 42%"
          ></div>
          <div
            className="flex-1 bg-indigo-400 rounded-2xl h-[45%] opacity-80 hover:h-[50%] transition-all duration-500 cursor-help"
            title="Plano Básico: 31%"
          ></div>
          <div
            className="flex-1 bg-slate-200 rounded-2xl h-[30%] opacity-80 hover:h-[35%] transition-all duration-500 cursor-help"
            title="Grátis: 15%"
          ></div>
          <div
            className="flex-1 bg-indigo-900 rounded-2xl h-[20%] opacity-80 hover:h-[25%] transition-all duration-500 cursor-help"
            title="Enterprise: 12%"
          ></div>
        </div>
        <div className="flex justify-between text-[10px] font-black text-slate-900 uppercase tracking-tighter bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 italic">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div> PRO
            (42%)
          </div>
          <div className="flex items-center gap-2 italic">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> OUTROS
            (58%)
          </div>
        </div>
      </div>

      {/* System Health Card */}
      <div className="md:col-span-2 lg:col-span-1 bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col justify-between border border-slate-800 hover:bg-slate-950 transition-colors duration-500">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.8)]"></div>
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em]">
            Estado do Sistema
          </p>
        </div>
        <div className="space-y-6 mt-12 bg-slate-800/20 p-6 rounded-3xl border border-slate-800/50">
          <div className="flex justify-between text-xs font-bold border-b border-white/5 pb-4">
            <span className="text-slate-500 uppercase tracking-widest text-[9px]">
              API Latência
            </span>
            <span className="font-mono text-emerald-400 italic">24ms</span>
          </div>
          <div className="flex justify-between text-xs font-bold border-b border-white/5 pb-4">
            <span className="text-slate-500 uppercase tracking-widest text-[9px]">
              Carga da BD
            </span>
            <span className="font-mono text-indigo-400 italic">Baixa</span>
          </div>
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-500 uppercase tracking-widest text-[9px]">
              Webhooks
            </span>
            <span className="font-mono text-white italic">Ativo ✅</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const UsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(
          collection(db, "users"),
          orderBy("createdAt", "desc"),
          limit(50),
        );
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
      } catch (error) {
        console.error("Erro ao carregar utilizadores:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
            Utilizadores do Sistema
          </h1>
          <p className="text-slate-500 font-bold text-sm mt-1">
            Gestão de acessos e perfis da plataforma To-Know.
          </p>
        </div>
        <div className="flex gap-3">
          <span className="px-6 py-2.5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm italic transition-all hover:border-indigo-100">
            Total: {users.length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                  Identidade
                </th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                  Estado
                </th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                  Registado em
                </th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right italic">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={4} className="px-10 py-12 bg-slate-50/5"></td>
                  </tr>
                ))
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-10 py-24 text-center text-slate-400 font-black text-xs uppercase tracking-widest italic"
                  >
                    Nenhum utilizador encontrado no ecossistema.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-slate-50 transition-all duration-300 group"
                  >
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-5">
                        <img
                          src={
                            u.photoURL ||
                            `https://ui-avatars.com/api/?name=${u.displayName}`
                          }
                          className="w-12 h-12 rounded-2xl border-2 border-white shadow-xl shadow-indigo-100/30 group-hover:scale-110 transition-transform duration-500"
                          alt="Avatar"
                        />
                        <div>
                          <p className="font-black text-slate-900 text-sm tracking-tighter group-hover:text-indigo-600 transition-colors italic uppercase">
                            {u.displayName || "Anónimo"}
                          </p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <span
                        className={cn(
                          "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm italic transition-all",
                          u.status === "active"
                            ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100"
                            : "bg-red-50 text-red-600 ring-1 ring-red-100",
                        )}
                      >
                        {u.status === "active" ? "Ativo ✅" : "Suspenso"}
                      </span>
                    </td>
                    <td className="px-10 py-7 text-slate-500 text-[11px] font-black uppercase tracking-tighter italic">
                      {u.createdAt?.seconds
                        ? formatDate(
                            new Date(u.createdAt.seconds * 1000).toISOString(),
                          )
                        : "N/D"}
                    </td>
                    <td className="px-10 py-7 text-right">
                      <button className="text-slate-400 hover:text-indigo-600 transition-all p-3 hover:bg-white rounded-2xl border border-transparent hover:border-slate-100 shadow-sm">
                        <Settings className="size-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PlansPage = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const q = collection(db, "plans");
        const querySnapshot = await getDocs(q);
        const planData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlans(planData);
      } catch (error) {
        console.error("Erro ao carregar planos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
          Planos de Subscrição
        </h1>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95 flex items-center gap-3 italic">
          <Package className="size-4" />
          <span>Novo Plano</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-96 bg-white animate-pulse rounded-[3rem] border border-slate-200 shadow-sm"
            ></div>
          ))
        ) : plans.length === 0 ? (
          <div className="col-span-full p-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Package className="size-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">
              Sem planos configurados
            </h3>
            <p className="text-slate-400 mt-3 max-w-sm mx-auto font-bold text-sm">
              Inicie a criação do ecossistema definindo o primeiro nível de
              acesso para o To-Know.
            </p>
          </div>
        ) : (
          plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-200 hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                <div className="px-5 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-indigo-200 italic ring-4 ring-indigo-50">
                  {plan.tier}
                </div>
              </div>

              <div className="mb-10">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 w-fit mb-8 group-hover:scale-110 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all duration-500">
                  <Package className="size-10 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
                  {plan.name}
                </h3>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed font-bold italic">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-4 mb-12">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-6">
                  Recursos Incluídos
                </p>
                {plan.features?.map((f: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 text-sm text-slate-700"
                  >
                    <div className="size-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 shadow-sm shadow-indigo-100">
                      <ChevronRight className="size-3 text-indigo-600" />
                    </div>
                    <span className="font-bold italic">{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                    {formatCurrency(plan.price || 0)}
                  </p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2 italic">
                    {plan.billingCycle}
                  </p>
                </div>
                <button className="p-4 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-2xl transition-all duration-500 text-slate-400 border border-slate-100 hover:border-slate-900 shadow-sm active:scale-95 group/btn">
                  <Settings className="size-6 group-hover/btn:rotate-90 transition-transform" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const q = query(
          collection(db, "subscriptions"),
          orderBy("currentPeriodEnd", "desc"),
          limit(50),
        );
        const querySnapshot = await getDocs(q);
        const subData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSubscriptions(subData);
      } catch (error) {
        console.error("Erro ao carregar subscrições:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
            Facturação & Subscritores
          </h1>
          <p className="text-slate-500 font-bold text-sm mt-1">
            Gestão detalhada do fluxo de receita do To-Know.
          </p>
        </div>
        <div className="flex gap-3">
          <span className="px-6 py-2.5 bg-emerald-50 text-emerald-700 rounded-2xl text-[10px] font-black border border-emerald-100 uppercase tracking-widest shadow-sm flex items-center gap-2 italic">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            Ativas: {subscriptions.filter((s) => s.status === "active").length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                  ID Subscritor
                </th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                  Plano Escolhido
                </th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                  Estado Atual
                </th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right italic">
                  Detalhes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={4} className="px-10 py-12"></td>
                  </tr>
                ))
              ) : subscriptions.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-10 py-24 text-center text-slate-400 font-black text-xs uppercase tracking-widest bg-slate-50/20"
                  >
                    Sem subscrições registadas até ao momento.
                  </td>
                </tr>
              ) : (
                subscriptions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-slate-50 transition-all duration-300 group"
                  >
                    <td className="px-10 py-7 text-slate-900 text-sm font-mono tracking-tighter truncate max-w-[200px] font-bold italic">
                      {sub.userId}
                    </td>
                    <td className="px-10 py-7">
                      <span className="text-slate-700 text-sm font-black tracking-tight group-hover:text-indigo-600 transition-colors uppercase italic">
                        {sub.planId}
                      </span>
                    </td>
                    <td className="px-10 py-7">
                      <span
                        className={cn(
                          "px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] shadow-sm italic transition-all",
                          sub.status === "active"
                            ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100"
                            : "bg-red-50 text-red-600 ring-1 ring-red-100",
                        )}
                      >
                        {sub.status === "active" ? "Ativo ✅" : sub.status}
                      </span>
                    </td>
                    <td className="px-10 py-7 text-right">
                      <button className="text-indigo-400 hover:text-white hover:bg-indigo-600 transition-all p-3 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-500">
                        <ChevronRight className="size-6 shrink-0" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError("Erro ao entrar com Google: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      setTimeout(() => {
        setError(
          "Login por email requer configuração adicional de utilizadores no Firebase.",
        );
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex font-sans overflow-hidden relative">
      {/* Dynamic Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/30 blur-[150px] rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/30 blur-[150px] rounded-full animate-pulse delay-1000 pointer-events-none"></div>
      
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '48px 48px'
      }}></div>

      <div className="w-full flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-[480px] relative"
        >
          {/* Glassmorphic Card Container */}
          <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_32px_rgb(0,0,0,0.5)] border border-white/10 p-10 sm:p-12 relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500"></div>

            <div className="text-center mb-10 relative z-10">
              <div className="w-20 h-20 bg-indigo-600/20 border border-indigo-500/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(79,70,229,0.3)] relative group">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-3xl blur-xl group-hover:bg-indigo-500/40 transition-all duration-500"></div>
                <Activity className="text-indigo-400 size-10 group-hover:scale-110 transition-transform duration-500 relative z-10" />
              </div>
              
              <h1 className="text-3xl font-black text-white tracking-tight">
                To-Know <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 font-extrabold uppercase italic">Admin</span>
              </h1>
              <p className="text-slate-400 mt-3 font-medium text-sm leading-relaxed">
                Gestão centralizada do ecossistema e subscrições.
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold mb-8 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                  <Activity className="size-4 shrink-0 rotate-45" />
                </div>
                <p>{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleEmailLogin} className="space-y-5 relative z-10">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Email Corporativo
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@to-know.com"
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 py-4 px-5 rounded-2xl font-medium text-white transition-all placeholder:text-slate-600 outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Palavra-passe
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 py-4 px-5 rounded-2xl font-medium text-white transition-all placeholder:text-slate-600 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 mt-6 rounded-2xl font-bold transition-all hover:from-indigo-500 hover:to-blue-500 active:scale-[0.98] shadow-[0_0_20px_rgba(79,70,229,0.4)] disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <Activity className="size-5 animate-spin" />
                ) : (
                  <>Acessar Plataforma <ChevronRight className="size-5" /></>
                )}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                <span className="bg-slate-900 px-4 text-slate-500 rounded-full border border-slate-800">
                  Login Alternativo
                </span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-4 px-6 rounded-2xl font-bold transition-all active:scale-[0.98] disabled:opacity-50 group"
            >
              <img
                src="https://www.google.com/favicon.ico"
                className="w-5 h-5 filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                alt="Google"
              />
              <span>Entrar com Google Workspace</span>
            </button>
          </div>
          
          <p className="text-center mt-8 text-xs font-medium text-slate-500">
            Ambiente restrito • To-Know Admin © {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        try {
          const userRef = doc(db, "users", u.uid);
          const userDoc = await getDoc(userRef);

          if (!userDoc.exists()) {
            await setDoc(userRef, {
              email: u.email,
              displayName: u.displayName,
              photoURL: u.photoURL,
              role: "admin",
              status: "active",
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp(),
            });
          } else {
            await setDoc(
              userRef,
              {
                lastLogin: serverTimestamp(),
                photoURL: u.photoURL,
                displayName: u.displayName,
              },
              { merge: true },
            );
          }
        } catch (err) {
          console.error("Erro na sincronização:", err);
        }
        setUser(u);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-500 rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
        <Sidebar
          user={user}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <Header user={user} setIsSidebarOpen={setIsSidebarOpen} />
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto p-6 lg:p-10">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/plans" element={<PlansPage />} />
                  <Route
                    path="/subscriptions"
                    element={<SubscriptionsPage />}
                  />
                  <Route
                    path="/settings"
                    element={
                      <div className="p-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 text-slate-400 font-bold uppercase tracking-widest text-xs">
                        Definições Avançadas do Ecossistema To-Know (Brevemente)
                      </div>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}
