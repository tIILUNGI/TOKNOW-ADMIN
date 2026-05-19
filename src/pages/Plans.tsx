import { CreditCard, Check, Euro } from "lucide-react";

export const Plans = () => {
  const plans = [
    {
      name: "Básico",
      price: "199",
      subscribers: 420,
      mrr: "83.580",
      features: ["Acesso a 5 módulos", "Suporte email", "5 utilizadores"],
      popular: false,
    },
    {
      name: "Pro",
      price: "499",
      subscribers: 315,
      mrr: "157.185",
      features: ["Acesso total", "Suporte prioritário 24/7", "Utilizadores ilimitados", "Integração API"],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      subscribers: 105,
      mrr: "Sob consulta",
      features: ["Deploy dedicado", "SLA garantido 99.9%", "Gestor de conta", "Desenvolvimento customizado"],
      popular: false,
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Planos e Subscrições</h1>
        <p className="text-slate-500 text-sm mt-1">Gira os pacotes e acompanhe as métricas financeiras</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div key={idx} className={\`relative bg-white rounded-2xl border p-6 flex flex-col \${plan.popular ? 'border-blue-500 shadow-md shadow-blue-500/10' : 'border-slate-200 shadow-sm'}\`}>
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                Mais Popular
              </span>
            )}
            
            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mt-2">
                {plan.price !== 'Custom' && <span className="text-slate-500 font-medium">€</span>}
                <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-slate-500 text-sm">/mês</span>}
              </div>
            </div>

            <div className="py-4 border-y border-slate-100 mb-6 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Assinantes Ativos</span>
                <span className="font-semibold text-slate-900">{plan.subscribers}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">MRR Gerado</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  {plan.price !== 'Custom' && <Euro className="w-3 h-3" />} {plan.mrr}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button className={\`w-full py-2.5 rounded-lg text-sm font-medium transition-colors \${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'}\`}>
              Editar Plano
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
