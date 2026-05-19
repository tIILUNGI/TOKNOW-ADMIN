import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, CheckCircle, Activity, BarChart2, CreditCard, Users, User, Mail, Lock, Building2, MapPin } from "lucide-react";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const change = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canSubmit =
    step === 1
      ? form.name.trim() && form.email.trim() && form.company.trim()
      : form.password.length >= 6 && form.password === form.confirmPassword;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCreated(true);
    }, 1500);
  };

  if (created) {
    return (
      <div className="min-h-screen flex bg-white font-sans">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24">
          <div className="w-full max-w-[420px] text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Conta Criada!</h2>
              <p className="text-slate-500 text-sm">
                A conta de <strong className="text-slate-800">{form.email}</strong> foi registada com sucesso.
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Um e-mail de boas-vindas foi enviado com instruções para ativar a sua conta.
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors mt-4"
            >
              Ir para o Login
            </button>
          </div>
        </div>

        {/* Branding right */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#121b2f] flex-col justify-center px-16 xl:px-24 text-white">
          <h1 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight">Bem-vindo à TOKNOW Angola</h1>
          <p className="text-slate-300 text-lg mb-16 font-medium">O painel central para gestão, conformidade e auditoria corporativa.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left side: Form */}
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
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-3"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao Login
            </button>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Criar Conta</h2>
            <p className="text-slate-500 text-sm">
              Preencha os dados abaixo para registar uma nova conta na plataforma.
            </p>
          </div>

          {/* Progress steps */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`flex-1 h-1.5 rounded-full transition-colors ${step >= 1 ? "bg-blue-600" : "bg-slate-200"}`} />
            <div className={`flex-1 h-1.5 rounded-full transition-colors ${step >= 2 ? "bg-blue-600" : "bg-slate-200"}`} />
          </div>
          <p className="text-xs text-slate-500 mb-4">Passo {step} de 2: {step === 1 ? "Dados da Empresa" : "Segurança"}</p>

          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 && (
                <>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">Nome Completo</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="João Manuel"
                        value={form.name}
                        onChange={(e) => change("name", e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-slate-900 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">E-mail Corporativo</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="joao.manuel@empresa.ao"
                        value={form.email}
                        onChange={(e) => change("email", e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-slate-900 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">Empresa / Entidade</label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Nome da empresa"
                        value={form.company}
                        onChange={(e) => change("company", e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-slate-900 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">Localização (opcional)</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Luanda, Angola"
                        value={form.location}
                        onChange={(e) => change("location", e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-slate-900 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="text-sm text-slate-600 -mt-1">
                    Defina uma senha segura para acessar a plataforma.
                  </p>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">Palavra-passe</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        placeholder="Mínimo de 6 caracteres"
                        value={form.password}
                        onChange={(e) => change("password", e.target.value)}
                        required
                        minLength={6}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-slate-900 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">Confirmar Palavra-passe</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        placeholder="Repita a palavra-passe"
                        value={form.confirmPassword}
                        onChange={(e) => change("confirmPassword", e.target.value)}
                        required
                        minLength={6}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none ${
                          form.confirmPassword && form.password !== form.confirmPassword
                            ? "border-red-400 focus:ring-1 focus:ring-red-400"
                            : "border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        }`}
                      />
                    </div>
                    {form.confirmPassword && form.password !== form.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">As palavras-passe não coincidem.</p>
                    )}
                  </div>
                </>
              )}

              <div className="flex justify-between gap-3 pt-2">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Voltar
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!canSubmit || loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Activity className="w-5 h-5 animate-spin" />
                  ) : step === 1 ? (
                    <>
                      Continuar <ArrowLeft className="w-4 h-4 rotate-180" />
                    </>
                  ) : (
                    <>
                      Criar Conta <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <p className="text-center mt-6 text-sm text-slate-500">
            Já tem uma conta?{" "}
            <button onClick={() => navigate("/")} className="text-blue-600 font-medium hover:underline">
              Entrar
            </button>
          </p>
        </div>
      </div>

      {/* Right side: Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#121b2f] flex-col justify-center px-16 xl:px-24 text-white">
        {step === 1 ? (
          <>
            <h1 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight">
              Junte-se ao ecossistema TOKNOW
            </h1>
            <p className="text-slate-300 text-lg mb-16 font-medium">
              Crie a sua conta e comece a gerir a conformidade da sua entidade em Angola.
            </p>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-800/50 flex justify-center items-center shrink-0">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Segurança de Nível Bancário</h3>
                  <p className="text-slate-400 text-sm mt-1">Criptografia AES-256 e conformidade com regulamentos angolanos.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-800/50 flex justify-center items-center shrink-0">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Gestão de Equipas</h3>
                  <p className="text-slate-400 text-sm mt-1">Adicione colaboradores e defina papéis com controlo de acessos.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-800/50 flex justify-center items-center shrink-0">
                  <CreditCard className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Subscrição Flexível</h3>
                  <p className="text-slate-400 text-sm mt-1">Planos adaptados a cada escala — Básico, Pro ou Enterprise.</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight">Configure a sua segurança</h1>
            <p className="text-slate-300 text-lg mb-16 font-medium">Proteja a sua conta com uma palavra-passe forte e única.</p>
          </>
        )}
      </div>
    </div>
  );
};
