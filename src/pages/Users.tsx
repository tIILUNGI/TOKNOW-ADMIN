import { Users as UsersIcon, Search, Filter, MoreVertical, Plus } from "lucide-react";

export const Users = () => {
  const usersList = [
    { id: 1, name: "Ana Silva", email: "ana.silva@empresa.pt", role: "Administrador", status: "Ativo" },
    { id: 2, name: "Carlos Ferreira", email: "carlos.f@empresa.pt", role: "Gestor", status: "Ativo" },
    { id: 3, name: "Mariana Costa", email: "mariana.c@empresa.pt", role: "Utilizador", status: "Pendente" },
    { id: 4, name: "João Pedro", email: "joao.p@empresa.pt", role: "Utilizador", status: "Inativo" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Utilizadores e Acessos</h1>
          <p className="text-slate-500 text-sm mt-1">Gerencie os perfis e permissões da plataforma</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Novo Utilizador
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Pesquisar utilizador..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors w-full sm:w-auto">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Nome e E-mail</th>
                <th className="px-6 py-4">Papel (Role)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {usersList.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        {user.name.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{user.name}</p>
                        <p className="text-slate-500 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={\`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium \${
                      user.status === 'Ativo' ? 'bg-emerald-50 text-emerald-700' : 
                      user.status === 'Pendente' ? 'bg-amber-50 text-amber-700' : 
                      'bg-slate-100 text-slate-600'
                    }\`}>
                      <span className={\`w-1.5 h-1.5 rounded-full \${
                        user.status === 'Ativo' ? 'bg-emerald-500' : 
                        user.status === 'Pendente' ? 'bg-amber-500' : 
                        'bg-slate-400'
                      }\`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
