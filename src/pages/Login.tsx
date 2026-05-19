import { useState, FormEvent } from "react";
import { Shield, ChevronRight, Activity, BarChart2, CreditCard, Users } from "lucide-react";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Autenticação local simples
    setTimeout(() => {
      if (email && password) {
        onLoginSuccess();
      } else {
        setLoading(false);
      }
    }, 800);
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
            <div translate="no">
              <h1 className="text-blue-900 font-extrabold text-xl leading-none uppercase">
                TOKNOW
              </h1>
              <span className="text-blue-700 font-bold text-sm tracking-widest uppercase">
                ADMIN
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Bem-vindo de volta
            </h2>
            <p className="text-slate-500 text-sm">
              Insira as suas credenciais para aceder ao sistema
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <form onSubmit={handleEmailLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 block">
                  E-mail
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-slate-900 transition-all placeholder:text-slate-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="absolute left-3.5 top-3 text-slate-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-700 block">
                    Palavra-passe
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-600 font-medium hover:underline"
                  >
                    Esqueceu a palavra-passe?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-slate-900 transition-all placeholder:text-slate-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="absolute left-3.5 top-3 text-slate-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex justify-center items-center gap-2 mt-2"
                disabled={loading}
              >
                {loading ? (
                  <Activity className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Entrar <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              Não tem uma conta? <a href="#" className="text-blue-600 font-medium hover:underline">Criar conta</a>
            </div>
          </div>

          <div className="text-center mt-12 text-xs text-slate-400 font-medium">
            © {new Date().getFullYear()} TOKNOW ADMIN. Todos os direitos
            reservados.
          </div>
        </div>
      </div>

      {/* Right side: Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#121b2f] flex-col justify-center px-16 xl:px-24 text-white">
        <h1 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight">
          Tudo o que precisa para gerir o ecossistema To-Know
        </h1>
        <p className="text-slate-300 text-lg mb-16 font-medium">
          O painel central de administração e monitorização de conformidade
          corporativa
        </p>

        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-800/50 flex justify-center items-center shrink-0">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">
                Gestão de Conformidade
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Mantenha o ecossistema atualizado com as normas e regulamentos.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-800/50 flex justify-center items-center shrink-0">
              <BarChart2 className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">
                Indicadores de Desempenho
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Monitorize KPIs em tempo real com painéis intuitivos e
                dinâmicos.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-800/50 flex justify-center items-center shrink-0">
              <CreditCard className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">
                Gestão de Subscrições
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Controlo total sobre planos, faturação e acesso das entidades.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-800/50 flex justify-center items-center shrink-0">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">
                Auditorias e Avaliações
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Acompanhe e analise o progresso das avaliações KYC e 360º.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
