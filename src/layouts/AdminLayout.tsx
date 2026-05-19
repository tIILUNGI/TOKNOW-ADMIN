import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

interface AdminLayoutProps {
  onLogout: () => void;
}

export const AdminLayout = ({ onLogout }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 antialiased overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onLogout={onLogout}
      />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header setIsSidebarOpen={setIsSidebarOpen} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
