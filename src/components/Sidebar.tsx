import {
  Shield,
  LayoutDashboard,
  Users,
  CreditCard,
  Activity,
  FileCheck,
  LogOut,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NavLink } from "react-router-dom";
import { cn } from "../lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onLogout: () => void;
}

export const Sidebar = ({ isOpen, setIsOpen, onLogout }: SidebarProps) => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Painel Executivo", path: "/" },
    { icon: Users, label: "Utilizadores e Acessos", path: "/users" },
    { icon: CreditCard, label: "Subscrições de Clientes", path: "/billing" },
    { icon: Layers, label: "Planos de Subscrição", path: "/plans" },
    { icon: Activity, label: "Monitorização", path: "/health" },
    { icon: FileCheck, label: "Avaliações e Due Diligence", path: "/evaluations" },
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
            <span
              className="font-bold text-slate-800 tracking-tight leading-none uppercase"
              translate="no"
            >
              TOKNOW <br />
              <span className="text-[10px] text-slate-500">ADMIN</span>
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
            onClick={onLogout}
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
