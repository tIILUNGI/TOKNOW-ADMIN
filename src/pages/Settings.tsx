import { useState } from "react";
import { Settings as SettingsIcon, Shield, Bell, Globe, Lock, Save, Eye, EyeOff, Mail } from "lucide-react";

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("conta");
  const [form, setForm] = useState({
    email: "admin@toknow.com",
    language: "pt-AO",
    timezone: "Africa/Luanda",
    twoFactor: true,
    emailNotifs: true,
    pushNotifs: false,
  });
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [showOldPwd, setShowOldPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [saved, setSaved] = useState(false);

  const change = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const tabs = [
    { id: "conta", label: "Conta", icon: SettingsIcon },
    { id: "seguranca", label: "Segurança", icon: Shield },
    { id: "notificacoes", label: "Notificações", icon: Bell },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Definições de Conta</h1>
        <p className="text-slate-500 text-sm mt-1">Personalize a sua experiência e proteja a sua conta.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "conta" && (
            <div className="space-y-5">
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
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Idioma</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={form.language}
                    onChange={(e) => change("language", e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  >
                    <option value="pt-AO">Português (Angola)</option>
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Fuso Horário</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={form.timezone}
                    onChange={(e) => change("timezone", e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={save}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" /> Guardar
                </button>
              </div>
            </div>
          )}

          {activeTab === "seguranca" && (
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Palavra-passe Atual</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showOldPwd ? "text" : "password"}
                    value={oldPwd}
                    onChange={(e) => setOldPwd(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPwd(!showOldPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showOldPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Nova Palavra-passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showNewPwd ? "text" : "password"}
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPwd(!showNewPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 space-y-3 border border-slate-100">
                <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  Autenticação de Dois Factores (2FA)
                </h4>
                <p className="text-xs text-slate-500">
                  Adicione uma camada extra de segurança à sua conta.
                </p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => change("twoFactor", !form.twoFactor)}
                    className={`w-10 h-6 rounded-full p-0.5 transition-colors ${
                      form.twoFactor ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        form.twoFactor ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </div>
                  <span className="text-sm text-slate-700">
                    {form.twoFactor ? "Ativado" : "Desativado"}
                  </span>
                </label>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={save}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" /> Atualizar Segurança
                </button>
              </div>
            </div>
          )}

          {activeTab === "notificacoes" && (
            <div className="space-y-5">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-800">Notificações por E-mail</p>
                    <p className="text-xs text-slate-500 mt-0.5">Receba alertas e atualizações no seu e-mail.</p>
                  </div>
                  <label className="cursor-pointer">
                    <div
                      onClick={() => change("emailNotifs", !form.emailNotifs)}
                      className={`w-10 h-6 rounded-full p-0.5 transition-colors ${
                        form.emailNotifs ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          form.emailNotifs ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </label>
                </div>
                <div className="border-t border-slate-200" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-800">Notificações Push</p>
                    <p className="text-xs text-slate-500 mt-0.5">Alertas em tempo real no navegador.</p>
                  </div>
                  <label className="cursor-pointer">
                    <div
                      onClick={() => change("pushNotifs", !form.pushNotifs)}
                      className={`w-10 h-6 rounded-full p-0.5 transition-colors ${
                        form.pushNotifs ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          form.pushNotifs ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={save}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" /> Guardar Preferências
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {saved && (
        <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-300">
          Definições guardadas com sucesso!
        </div>
      )}
    </div>
  );
};
