# Requisitos de Infraestrutura

## Aplicação

- Sistema operacional de desenvolvimento: Windows 10/11.
- Node.js: versão compatível com o projeto, recomendada Node.js 20 LTS ou superior.
- npm: versão compatível com o Node.js instalado.
- Navegador: Chrome, Edge ou Firefox atualizado.

## Frontend

- Framework: Angular 22.1.
- Linguagem: TypeScript.
- Servidor de desenvolvimento: `ng serve`.
- URL padrão: `http://localhost:4200`.

## Backend

- Plataforma: Node.js.
- Framework: Express 5.
- Linguagem: TypeScript.
- Porta padrão: `3000`.
- URL padrão: `http://localhost:3000`.

## Banco de dados

- SGBD: PostgreSQL.
- Banco: `saep_agendamento_db`.
- Driver: `pg`.
- Porta padrão: `5432`.

## Execução

```powershell
cd backend
npm install
npm run dev
```

Em outro terminal:

```powershell
npm install
npm start
```

## Variáveis de ambiente do backend

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=SUA_SENHA
DB_NAME=saep_agendamento_db
```
