# 🔩 ProtoTech — Sistema de Vendas de Eletrônicos e Prototipagem

> Plataforma web corporativa full-stack para gestão de inventário de componentes eletrônicos, controle de vendas, gerenciamento de equipes e vitrine comercial para clientes.

---

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura do Sistema](#-arquitetura-do-sistema)
- [Banco de Dados](#-banco-de-dados)
- [Pré-requisitos](#-pré-requisitos)
- [Como Executar](#-como-executar)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Credenciais de Demo](#-credenciais-de-demo)
- [Estrutura de Pastas](#-estrutura-de-pastas)

---

## 📌 Sobre o Projeto

A **ProtoTech** é uma empresa fictícia especializada em prototipagem de hardware, firmware e IoT. Este sistema é uma aplicação web empresarial que atende dois perfis de usuário distintos:

- **Administrador** — acesso completo ao back-office: controle de estoque, vendas, funcionários, clientes e dashboard analítico.
- **Cliente** — acesso a uma vitrine comercial premium com catálogo de componentes eletrônicos, carrinho de compras, simulador de orçamento e área de perfil.

A interface foi construída com foco em design de alto nível, suportando **modo claro e escuro** com transições suaves, tipografia premium e micro-animações.

---

## ✨ Funcionalidades

### 🛡️ Área do Administrador

| Módulo | Descrição |
|---|---|
| **Dashboard** | KPIs em tempo real: receita, produtos vendidos, ticket médio e top produtos com gráficos interativos (Recharts) |
| **Produtos** | CRUD completo de componentes eletrônicos com SKU, categoria, preço de custo e venda |
| **Estoque** | Controle de quantidade em estoque com alertas automáticos de nível mínimo |
| **Vendas** | Registro e listagem de vendas com emissão de nota fiscal |
| **Clientes** | Cadastro e gerenciamento de clientes com CPF, e-mail e telefone |
| **Funcionários** | Gestão de funcionários com cargos e salários base |
| **Alertas** | Painel de alertas de estoque crítico gerados automaticamente por trigger MySQL |

### 🧑‍💻 Área do Cliente 

| Módulo | Descrição |
|---|---|
| **Home / Landing Page** | Seção Hero com CTA, Filosofia da empresa, grade de Serviços, Portfólio com lightbox, feed do Instagram e depoimentos |
| **Catálogo** | Listagem de componentes com filtros por categoria, busca e adição ao carrinho |
| **Carrinho** | Gerenciamento de itens selecionados com resumo de pedido |
| **Checkout** | Fluxo de finalização de compra com integração WhatsApp |
| **Simulador de Orçamento** | Calculadora interativa de projetos personalizados com estimativa em tempo real |
| **Perfil** | Área do usuário logado com dados da conta |

---

## 🛠️ Tecnologias Utilizadas

### Frontend

| Tecnologia | Versão | Uso |
|---|---|---|
| **React** | 19 | Biblioteca principal de UI |
| **Vite** | 8 | Bundler e servidor de desenvolvimento |
| **Lucide React** | 1.16 | Ícones SVG modernos |
| **Recharts** | 3.8 | Gráficos do dashboard administrativo |
| **Vanilla CSS** | — | Estilização com design tokens e animações |
| **Space Grotesk** | — | Tipografia premium via Google Fonts |
| **JetBrains Mono** | — | Tipografia monospace para dados técnicos |

### Backend

| Tecnologia | Versão | Uso |
|---|---|---|
| **Node.js** | LTS | Runtime do servidor |
| **Express** | 5 | Framework REST API |
| **MySQL2** | 3.22 | Driver de banco de dados com pool de conexões |

### Banco de Dados

| Tecnologia | Uso |
|---|---|
| **MySQL** | Banco relacional principal |
| **Stored Procedures** | Atualização automática de saldo de estoque (`sp_AtualizarSaldoEstoque`) |
| **Triggers** | Geração automática de alertas de estoque crítico (`trg_VerificarEstoqueMinimo`) |

### DevOps / Deploy

| Ferramenta | Uso |
|---|---|
| **GitHub Pages** | Hospedagem do frontend (via `gh-pages`) |
| **ESLint** | Qualidade e padronização de código |

---

## 🏗️ Arquitetura do Sistema

```
┌─────────────────────────────────────────────┐
│              NAVEGADOR (Browser)             │
│                                             │
│  ┌──────────┐   ┌────────────┐              │
│  │  Admin   │   │  Cliente   │              │
│  │  Area    │   │   Area     │              │
│  └────┬─────┘   └─────┬──────┘              │
│       │               │                     │
│       └───────┬────────┘                    │
│           App.jsx                           │
│        (session + theme)                    │
└───────────────┼─────────────────────────────┘
                │ HTTP (fetch / REST)
                ▼
┌───────────────────────────────────┐
│         Node.js + Express         │
│         (api/index.js :3000)      │
│                                   │
│  GET  /api/produtos               │
│  GET  /api/vendas                 │
│  GET  /api/clientes               │
│  GET  /api/funcionarios           │
│  GET  /api/alertas                │
│  GET  /api/dashboard/top-produtos │
│  POST /api/vendas                 │
│  PUT  /api/produtos/:id           │
│  DELETE ...                       │
└───────────────┬───────────────────┘
                │ mysql2 pool
                ▼
┌───────────────────────────────────┐
│         MySQL — prototech_db      │
│                                   │
│  Produto   Estoque   Venda        │
│  Cliente   Funcionario  Cargo     │
│  NotaFiscal  AlertaEstoque        │
│  Fornecedor  Administrador        │
└───────────────────────────────────┘
```

A sessão do usuário é gerenciada no cliente via **`localStorage`** com a chave `pt-session`, permitindo que recarregamentos de página não derrubem a autenticação. A preferência de tema (claro/escuro) é igualmente persistida via `pt-theme`.

---

## 🗄️ Banco de Dados

O banco `prototech_db` segue a **3ª Forma Normal (3FN)** e possui as seguintes tabelas principais:

- `Produto` + `Estoque` — catálogo e inventário
- `Cliente` + `Funcionario` + `Cargo` — gestão de pessoas
- `Venda` + `NotaFiscal` + `ItemNotaFiscal` — faturamento
- `AlertaEstoque` — alertas automáticos via trigger
- `Fornecedor` — cadastro de fornecedores
- `Administrador` + `Usuario` — controle de acesso

Para criar o banco, execute o script SQL disponível em:
```
Banco de dados prototech_db (Estrutura).txt
```

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [MySQL](https://www.mysql.com/) (versão 8.0+)
- [Git](https://git-scm.com/)

---

## 🚀 Como Executar

### 1. Clone o repositório

```bash
git clone https://github.com/svictorem/ProtoTech.git
cd ProtoTech
```

### 2. Configure o banco de dados

Abra seu cliente MySQL (MySQL Workbench, DBeaver, terminal etc.) e execute:

```sql
-- Execute o conteúdo do arquivo:
-- "Banco de dados prototech_db (Estrutura).txt"
```

Isso criará o banco `prototech_db` com todas as tabelas, procedures e triggers.

### 3. Configure e inicie a API (Backend)

```bash
# Entre na pasta da API
cd api

# Instale as dependências
npm install

# Inicie o servidor (porta 3000)
node index.js
```

> ⚠️ As credenciais padrão do MySQL estão definidas em `api/index.js`:
> - **Host:** `localhost`
> - **Usuário:** `root`
> - **Senha:** `12345`
> - **Porta:** `3306`
>
> Edite o arquivo se as suas credenciais forem diferentes.

### 4. Configure e inicie o Frontend

Abra um **novo terminal** na raiz do projeto:

```bash
# Volte para a raiz (se ainda estiver em /api)
cd ..

# Instale as dependências do frontend
npm install

# Inicie o servidor de desenvolvimento (porta padrão: 5173)
npm run dev
```

Acesse em: **http://localhost:5173**

### 5. (Opcional) Build de produção

```bash
npm run build      # Gera os arquivos otimizados em /dist
npm run preview    # Pré-visualiza o build localmente
```

### 6. (Opcional) Deploy no GitHub Pages

```bash
npm run deploy
```

---

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na **raiz do projeto** (frontend) com:

```env
VITE_API_URL=http://localhost:3000/api
```

> Se não existir o `.env`, o sistema usa `http://localhost:3000/api` como padrão.

---

## 🔑 Credenciais de Demo

| Perfil | E-mail | Senha |
|---|---|---|
| **Administrador** | `admin@prototech.com` | `admin123` |
| **Cliente** | qualquer e-mail válido | qualquer senha |

> A área do cliente não valida credenciais reais — qualquer e-mail e senha não vazios concedem acesso à vitrine.

---

## 📁 Estrutura de Pastas

```
ProtoTech/
├── api/                        # Backend Node.js + Express
│   ├── index.js                # Servidor REST API + pool MySQL
│   └── package.json
│
├── src/                        # Frontend React
│   ├── App.jsx                 # Raiz da aplicação (sessão, tema, roteamento)
│   ├── main.jsx                # Ponto de entrada React
│   ├── global.css              # Design tokens e variáveis CSS (dark/light)
│   ├── index.css               # Estilos base, glass, animações
│   │
│   ├── components/
│   │   ├── Login.jsx           # Tela de login (Admin / Cliente)
│   │   ├── Checkout.jsx        # Fluxo de checkout
│   │   ├── ToastSystem.jsx     # Sistema de notificações toast
│   │   │
│   │   ├── admin/              # Módulos da área administrativa
│   │   │   ├── AdminArea.jsx   # Layout e navegação admin
│   │   │   ├── Dashboard.jsx   # KPIs e gráficos
│   │   │   ├── Produtos.jsx    # CRUD de produtos
│   │   │   ├── Estoque.jsx     # Gestão de estoque
│   │   │   ├── Vendas.jsx      # Registro de vendas
│   │   │   ├── Clientes.jsx    # Gestão de clientes
│   │   │   ├── Funcionarios.jsx# Gestão de funcionários
│   │   │   └── Alertas.jsx     # Alertas de estoque
│   │   │
│   │   └── client/             # Módulos da área do cliente
│   │       ├── ClientArea.jsx  # Layout e navegação do cliente
│   │       ├── ClientHome.jsx  # Landing page premium
│   │       ├── Catalogo.jsx    # Catálogo de componentes
│   │       ├── Carrinho.jsx    # Carrinho de compras
│   │       └── Perfil.jsx      # Perfil do usuário
│   │
│   └── utils/
│       └── helpers.js          # Design tokens (T), API_URL, formatadores
│
├── package.json                # Dependências e scripts do frontend
├── vite.config.js              # Configuração do Vite
└── index.html                  # HTML raiz
```

---

## 👨‍💻 Desenvolvido por

**Victor Emanuel** — ProtoTech  
Sistema de Gestão Empresarial para Componentes Eletrônicos
