import {
  Shield,
  Activity,
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
  FileText,
  CheckCircle,
  AlertTriangle,
  GraduationCap,
  Briefcase,
  GitCommit,
  GitPullRequest,
  BarChart2,
  Target,
  Users as UsersIcon,
  AlertOctagon,
  Network,
  ListTodo
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
    { icon: Shield, label: "Standards", path: "/standards" },
    { icon: FileText, label: "Documented Information", path: "/documents" },
    { icon: CheckCircle, label: "Conformities", path: "/conformities" },
    { icon: AlertTriangle, label: "Auditorias", path: "/audits" },
    { icon: GraduationCap, label: "Trainings", path: "/trainings" },
    { icon: Briefcase, label: "Departments", path: "/departments" },
    { icon: GitCommit, label: "Systems", path: "/systems" },
    { icon: GitPullRequest, label: "Processes", path: "/processes" },
    { icon: Target, label: "Programs", path: "/programs" },
    { icon: BarChart2, label: "Indicators", path: "/indicators" },
    { icon: Target, label: "Objectives", path: "/objectives" },
    { icon: UsersIcon, label: "Stakeholders", path: "/stakeholders" },
    { icon: AlertOctagon, label: "Risk Register", path: "/risks" },
    { icon: Network, label: "Flowcharts", path: "/flowcharts" },
    { icon: ListTodo, label: "Actions", path: "/actions" }
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 xl:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-slate-50 border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 transform xl:translate-x-0 xl:static xl:h-screen shadow-lg xl:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Shield className="text-white size-4" />
             </div>
             <span className="font-bold text-slate-800 tracking-tight leading-none uppercase">
                TOKNOW <br/><span className="text-[10px] text-slate-500">ADMIN</span>
             </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                  isActive
                    ? "bg-slate-200/70 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-blue-700"
                )
              }
            >
              <item.icon className="size-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-200 bg-slate-50">
           <button
            onClick={() => logout()}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors text-sm font-medium"
          >
            <LogOut className="size-4" />
            <span>Sair do sistema</span>
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
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="xl:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md"
        >
          <Activity className="size-5" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </button>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        <button className="text-slate-400 hover:text-slate-600 transition-colors relative">
          <Bell className="size-5" />
        </button>
        
        <div className="flex items-center gap-3 pl-4 ml-2 border-l border-slate-200">
           <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase">
              {user.displayName ? user.displayName.substring(0,2) : "AD"}
           </div>
           <div className="hidden sm:block text-sm">
             <p className="font-semibold text-slate-800 leading-none">{user.displayName || "Administrador"}</p>
             <p className="text-xs text-slate-500 mt-0.5">Admin</p>
           </div>
        </div>
      </div>
    </header>
  );
};

// --- Pages ---

const Dashboard = () => {
  const topStats = [
    { title: "Conformidades Ativas", total: 0, subtitle: "Conformidades totais monitoradas", icon: Shield },
    { title: "Auditorias pendentes", total: 0, subtitle: "Auditorias a serem realizadas", icon: AlertTriangle },
    { title: "Treinamentos Ativos", total: 0, subtitle: "Programas de treinamento em andamento", icon: GraduationCap },
    { title: "Taxa de Conformidade", total: "0%", subtitle: "Índice geral de conformidade", icon: TrendingUp },
  ];

  const modules = [
    { title: "Padrões", desc: "Gerencie normas e regulamentos aplicáveis à sua organização", total: 9, pendente: 0, ativo: 9, icon: FileText, action: "Padrões de Acesso" },
    { title: "Conformidades", desc: "Gerencie conformidades", total: 0, pendente: 0, ativo: 0, icon: CheckCircle, action: "Conformidades de Acesso" },
    { title: "Auditorias", desc: "Gerenciar auditorias internas e externas", total: 0, pendente: 0, ativo: 0, icon: AlertTriangle, action: "Auditorias de Acesso" },
    { title: "Treinamentos", desc: "Gerenciar treinamentos relacionados a normas e conformidade", total: 0, pendente: 0, ativo: 0, icon: GraduationCap, action: "Treinamentos de Acesso" },
    { title: "Sistemas", desc: "Gerenciar sistemas e padrões de gestão", total: 0, pendente: 0, ativo: 0, icon: Settings, action: "Sistemas de Acesso" },
    { title: "Processos", desc: "Gerencie os processos de sua organização", total: 0, pendente: 0, ativo: 0, icon: GitPullRequest, action: "Processos de Acesso" },
    { title: "Programas", desc: "Gerenciar programas e iniciativas de conformidade", total: 0, pendente: 0, ativo: 0, icon: Target, action: "Programas de Acesso" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Painel Executivo</h1>
        <p className="text-slate-500 text-sm mt-1">Visão geral do sistema de compliance e gestão da qualidade</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {topStats.map((stat, i) => (
           <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="text-sm font-semibold text-slate-700">{stat.title}</h3>
                 <stat.icon className="size-4 text-blue-500" />
              </div>
              <div className="mt-auto">
                 <p className="text-3xl font-bold text-slate-900 mb-1">{stat.total}</p>
                 <p className="text-xs text-slate-400">{stat.subtitle}</p>
              </div>
           </div>
        ))}
      </div>

      <div>
         <h2 className="text-lg font-bold text-slate-800 mb-4">Módulos do Sistema</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {modules.map((mod, i) => (
               <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                  <div className="p-6 pb-4 flex-1">
                     <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                        <mod.icon className="size-5 text-blue-600" />
                     </div>
                     <h3 className="text-base font-bold text-slate-900 mb-2">{mod.title}</h3>
                     <p className="text-xs text-slate-500 leading-relaxed mb-6 h-10">{mod.desc}</p>
                     
                     <div className="flex justify-between text-center px-2">
                        <div>
                           <p className="text-lg font-bold text-slate-800 leading-none">{mod.total}</p>
                           <p className="text-[10px] text-slate-400 font-medium mt-1">Total</p>
                        </div>
                        <div>
                           <p className="text-lg font-bold text-amber-500 leading-none">{mod.pendente}</p>
                           <p className="text-[10px] text-slate-400 font-medium mt-1">Pendente</p>
                        </div>
                        <div>
                           <p className="text-lg font-bold text-emerald-500 leading-none">{mod.ativo}</p>
                           <p className="text-[10px] text-slate-400 font-medium mt-1">Ativo</p>
                        </div>
                     </div>
                  </div>
                  <div className="p-4 pt-0">
                     <button className="w-full py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                        {mod.action} <ChevronRight className="size-4 text-slate-400" />
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};


const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de login
    setTimeout(() => {
       alert("Simulação: Login seria processado aqui");
       setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* Left side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24">
         <div className="w-full max-w-[420px]">
            <div className="flex items-center gap-2 mb-10">
               <div className="w-10 h-10 bg-blue-700 text-white flex items-center justify-center rounded border-2 border-blue-900">
                  <Shield className="size-6" />
               </div>
               <div>
                  <h1 className="text-blue-900 font-extrabold text-xl leading-none uppercase">TOKNOW</h1>
                  <span className="text-blue-700 font-bold text-sm tracking-widest uppercase">ADMIN</span>
               </div>
            </div>

            <div className="mb-8">
               <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
               <p className="text-slate-500 text-sm">Enter your credentials to access the system</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
               <form onSubmit={handleEmailLogin} className="space-y-5">
                  <div className="space-y-2">
                     <label className="text-sm font-medium text-slate-700 block">Email</label>
                     <div className="relative">
                        <input 
                           type="email" 
                           placeholder="your@email.com" 
                           className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-slate-900 transition-all placeholder:text-slate-400"
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                           required
                        />
                        <div className="absolute left-3.5 top-3 text-slate-400">
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                           </svg>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-slate-700 block">Password</label>
                        <a href="#" className="text-sm text-blue-600 font-medium hover:underline">Forgot Password?</a>
                     </div>
                     <div className="relative">
                        <input 
                           type="password" 
                           placeholder="••••••••" 
                           className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-slate-900 transition-all placeholder:text-slate-400"
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           required
                        />
                        <div className="absolute left-3.5 top-3 text-slate-400">
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                           </svg>
                        </div>
                     </div>
                  </div>

                  <button 
                     type="submit" 
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex justify-center items-center gap-2 mt-2"
                     disabled={loading}
                  >
                     {loading ? <Activity className="w-5 h-5 animate-spin" /> : <>Enter <ChevronRight className="w-4 h-4" /></>}
                  </button>
               </form>

               <div className="mt-6 text-center text-sm text-slate-500">
                  Don't have an account? <a href="#" className="text-blue-600 font-medium hover:underline">Create your account</a>
               </div>
            </div>

            <div className="text-center mt-12 text-xs text-slate-400 font-medium">
               © {new Date().getFullYear()} TOKNOW ADMIN, All rights reserved.
            </div>
         </div>
      </div>

      {/* Right side: Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#121b2f] flex-col justify-center px-16 xl:px-24 text-white">
         <h1 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight">Everything you need to manage compliance</h1>
         <p className="text-slate-300 text-lg mb-16 font-medium">Join hundreds of companies that already trust TOKNOW ADMIN</p>

         <div className="space-y-8">
            <div className="flex gap-4">
               <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-800/50 flex justify-center items-center shrink-0">
                  <Shield className="w-6 h-6 text-blue-400" />
               </div>
               <div>
                  <h3 className="font-bold text-white text-lg">Compliance Management</h3>
                  <p className="text-slate-400 text-sm mt-1">Keep your company in compliance with standards and regulations</p>
               </div>
            </div>
            
            <div className="flex gap-4">
               <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-800/50 flex justify-center items-center shrink-0">
                  <BarChart2 className="w-6 h-6 text-blue-400" />
               </div>
               <div>
                  <h3 className="font-bold text-white text-lg">Performance Indicators</h3>
                  <p className="text-slate-400 text-sm mt-1">Monitor and analyze KPIs in real-time with intuitive dashboards</p>
               </div>
            </div>

            <div className="flex gap-4">
               <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-800/50 flex justify-center items-center shrink-0">
                  <FileText className="w-6 h-6 text-blue-400" />
               </div>
               <div>
                  <h3 className="font-bold text-white text-lg">Document Management</h3>
                  <p className="text-slate-400 text-sm mt-1">Full control over documented information and processes</p>
               </div>
            </div>

            <div className="flex gap-4">
               <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-800/50 flex justify-center items-center shrink-0">
                  <Users className="w-6 h-6 text-blue-400" />
               </div>
               <div>
                  <h3 className="font-bold text-white text-lg">Team Collaboration</h3>
                  <p className="text-slate-400 text-sm mt-1">Optimized workflows for your team</p>
               </div>
            </div>
         </div>
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
      setUser(u);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Activity className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Se não estiver logado
  if (!user) {
    return <LoginPage />;
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 antialiased overflow-hidden">
        <Sidebar
          user={user}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <Header user={user} setIsSidebarOpen={setIsSidebarOpen} />
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-6 lg:p-8">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
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
