# TOKNOW Admin Dashboard

A **Plataforma de Gestão Administrativa do ecossistema To-Know** é um painel centralizado criado para gerir, monitorizar e avaliar todos os aspetos de Compliance, Avaliação de Risco, Subscrições e Entidades dentro da arquitetura corporativa do sistema To-Know.

**URL do Sistema:** [https://admin.toknow.ilungi.com](https://admin.toknow.ilungi.com)

## Visão Geral do Sistema

O TOKNOW-ADMIN atua como o cérebro central da plataforma. Através desta interface, os administradores de sistema podem:
- **Gestão de Utilizadores e Acessos:** Controlar papéis, permissões e status de todos os perfis ativos na plataforma.
- **Planos e Subscrições:** Criar, editar e analisar o fluxo de assinaturas (Básico, Pro, Enterprise), acompanhando as métricas financeiras (MRR) e as taxas de utilização.
- **Monitorização (System Health):** Acompanhar em tempo real os webhooks, cargas da base de dados e a latência das APIs.
- **Avaliações e Due Diligence:** Auditar o progresso dos módulos de Avaliação KYC/KYS que ocorrem na aplicação principal.

## Stack Tecnológico
- **Frontend:** React 19, Tailwind CSS 4, Framer Motion
- **Infraestrutura/Backend:** Firebase (Authentication, Firestore), Vite (Bundler)
- **Design System:** Glassmorphism e estética corporativa de alta performance.

## Executar Localmente

**Pré-requisitos:** Node.js v18 ou superior.

1. **Instalar dependências:**
   O projeto utiliza o Vite em conjunto com o `tsx` para servir o backend de desenvolvimento:
   ```bash
   npm install
   ```

2. **Configuração de Ambiente:**
   Crie ou modifique as variáveis de ambiente necessárias em `.env` se aplicável (ver o ficheiro `.env.example`).

3. **Iniciar o servidor local:**
   Este comando vai levantar tanto a UI de administração quanto o servidor node.
   ```bash
   npm run dev
   ```

## Autenticação

A tela de login requer credenciais com privilégios administrativos. O sistema dispõe de dupla camada de segurança ("Security Layer 02") e permite autenticação por e-mail corporativo ou integração SSO (Google Workspace).
