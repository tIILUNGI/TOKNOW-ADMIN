import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Bell, User, Settings, LogOut, FileText, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
  onLogout: () => void;
}

export const Header = ({ setIsSidebarOpen, onLogout }: HeaderProps) => {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [saved, setSaved] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowProfile(false);
    onLogout();
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="xl:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
        >
          <Activity className="size-5" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-slate-600 transition-colors hidden sm:block" title="Selecionar Entidade">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </button>
        <button className="text-slate-400 hover:text-slate-600 transition-colors hidden sm:block" title="Escolher Modelo">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        {/* Notificações */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="text-slate-400 hover:text-slate-600 transition-colors relative p-1"
          >
            <Bell className="size-5" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50"
              >
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="font-bold text-slate-800 text-sm">Notificações</h3>
                  <button className="text-xs text-blue-600 font-medium hover:underline">Marcar como lidas</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
                    <p className="text-sm font-medium text-slate-800">Nova subscrição ativada</p>
                    <p className="text-xs text-slate-500 mt-1">A entidade "TechCorp Lda" assinou o plano Pro.</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-medium">Há 5 minutos</p>
                  </div>
                  <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                    <p className="text-sm font-medium text-slate-800">Alerta de Servidor</p>
                    <p className="text-xs text-slate-500 mt-1">Pico de uso de CPU (68%) no worker-02.</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-medium">Há 2 horas</p>
                  </div>
                </div>
                <div className="p-3 border-t border-slate-100 text-center">
                  <button className="text-sm text-blue-600 font-medium hover:underline">Ver todas</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Perfil */}
        <div className="relative" ref={profileRef}>
          <div
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 pl-4 ml-2 border-l border-slate-200 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm group-hover:ring-2 group-hover:ring-blue-200 transition-all">
              AD
            </div>
            <div className="hidden sm:block text-sm">
              <p className="font-semibold text-slate-800 leading-none group-hover:text-blue-600 transition-colors">Administrador</p>
              <p className="text-xs text-slate-500 mt-0.5">Admin</p>
            </div>
          </div>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-4 w-56 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 py-1"
              >
                <div className="px-4 py-3 border-b border-slate-100 mb-1">
                  <p className="text-sm font-bold text-slate-800">admin@toknow.com</p>
                  <p className="text-xs text-slate-500">Administrador Global</p>
                </div>
                <button
                  onClick={() => { setShowProfile(false); navigate("/profile"); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2 transition-colors"
                >
                  <User className="w-4 h-4" /> O Meu Perfil
                </button>
                <button
                  onClick={() => { setShowProfile(false); navigate("/settings"); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2 transition-colors"
                >
                  <Settings className="w-4 h-4" /> Definições de Conta
                </button>
                <button
                  onClick={() => { setShowProfile(false); navigate("/billing"); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2 transition-colors mb-1"
                >
                  <CreditCard className="w-4 h-4" /> Faturação
                </button>
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button
                    onClick={handleLogoutClick}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Terminar Sessão
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium z-50"
          >
            Guardado com sucesso!
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
