import { useState } from "react";
import { User, Mail, Phone, Building2, MapPin, Calendar, Camera, Save } from "lucide-react";

export const Profile = () => {
  const [form, setForm] = useState({
    name: "Administrador Global",
    email: "admin@toknow.com",
    phone: "+244 911 000 000",
    company: "TOKNOW Angola",
    location: "Luanda, Angola",
    role: "Administrador Global",
  });

  const change = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">O Meu Perfil</h1>
      <p className="text-slate-500 text-sm">Gerencie as suas informações pessoais e profissionais.</p>

      {/* Avatar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl">
            AD
          </div>
          <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-400 transition-colors shadow-sm">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">{form.name}</h2>
          <p className="text-sm text-slate-500">{form.role}</p>
          <p className="text-xs text-slate-400 mt-1">Membro desde Jan 2024</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
        <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">Informações Pessoais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => change("name", e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => change("email", e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">Telefone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => change("phone", e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">Função</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={form.role}
                onChange={(e) => change("role", e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">Empresa</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={form.company}
                onChange={(e) => change("company", e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">Localização</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={form.location}
                onChange={(e) => change("location", e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Save className="w-4 h-4" /> Guardar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};
