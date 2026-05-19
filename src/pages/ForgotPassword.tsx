import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, Send, CheckCircle, Activity, BarChart2, CreditCard, Users, Mail, Lock } from "lucide-react";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

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

          {!sent ? (
            <>
              <div className="mb-8">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-3"
                >
                  <ArrowLeft className="w-4 h-4" /> Voltar ao Login
                </button>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Recuperar Palavra-passe</h2>
                <p className="text-slate-500 text-sm">
                  Introduza o seu e-mail para receber um link de redefinição.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 block">E-mail</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="admin@toknow.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-slate-900 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!email.trim() || loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex justify-center items-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Activity className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Enviar Link <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl border border-emerald-200 p-8 shadow-sm text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">E-mail Enviado!</h2>
                <p className="text-slate-500 text-sm">
                  Se existir uma conta associada a <strong className="text-slate-800">{email}</strong>, receberá um link de
                  redefinição de palavra-passe em até 5 minutos.
                </p>
              </div>
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                Não recebeu? Reenviar
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <ArrowLeft className="w-4 h-4" /> Voltar ao Login
              </button>
            </div>
          )}

          <p className="text-center mt-8 text-xs text-slate-400 font-medium">
            © {new Date().getFullYear()} TOKNOW ADMIN. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Right side: Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#121b2f] flex-col justify-center px-16 xl:px-24 text-white">
        <h1 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight">
          Recupere o acesso à sua conta em segundos
        </h1>
        <p className="text-slate-300 text-lg mb-16 font-medium">
          Segurança e suporte para a plataforma TOKNOW Angola
        </p>

        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-800/50 flex justify-center items-center shrink-0">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Recuperação Segura</h3>
              <p className="text-slate-400 text-sm mt-1">Links com validade de 15 minutos com token encriptado.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-800/50 flex justify-center items-center shrink-0">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Suporte 24/7</h3>
              <p className="text-slate-400 text-sm mt-1">Equipa técnica disponível todos os dias para assistência.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-800/50 flex justify-center items-center shrink-0">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Autenticação Forte</h3>
              <p className="text-slate-400 text-sm mt-1">Suporte a 2FA e senhas com exigência mínima.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
