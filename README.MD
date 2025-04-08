# 🏋️ Meu Primeiro CRUD

Este é o **meu primeiro projeto CRUD completo**, desenvolvido com foco em praticar os conceitos de back-end, segurança e arquitetura de software. O sistema permite que o **usuário gerencie seus treinos e vincule exercícios a cada um deles**, de forma simples e intuitiva.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **EJS** (template engine)
- **MongoDB**
- **JavaScript**
- **Webpack**
- **Bootstrap**

---

## 🛡️ Segurança e Boas Práticas

O projeto conta com diversas dependências voltadas à segurança:

- `csurf` — Proteção contra ataques CSRF  
- `helmet` — Cabeçalhos HTTP seguros  
- `bcrypt` — Hash de senhas para proteção dos dados dos usuários

---

## 🏗️ Arquitetura

O projeto segue a arquitetura **MVC (Model-View-Controller)**, separando as responsabilidades em:

- `Models/` — Comunicação com o banco de dados (MongoDB)
- `Views/` — Templates EJS renderizados no lado do servidor
- `Controllers/` — Lógica de controle das rotas e regras de negócio
- `Middlewares/` — Funções intermediárias executadas entre a requisição e o controller

---

## 🎯 Objetivo do Projeto

O objetivo principal é permitir que o **usuário gerencie seus treinos** com as seguintes funcionalidades:

- Criar, editar e deletar **treinos**
- Adicionar e gerenciar **exercícios vinculados** a cada treino
- Interface amigável e responsiva com **Bootstrap**
- Aplicação protegida com boas práticas de segurança