# Casos de Teste de Software

## CT01 - Login válido

- Pré-condição: usuário administrador cadastrado.
- Dados: `admin` / `admin123`.
- Resultado esperado: acesso ao dashboard.

## CT02 - Login inválido

- Dados: usuário ou senha incorretos.
- Resultado esperado: mensagem de credenciais inválidas e permanência na tela de login.

## CT03 - Cadastro de cliente válido

- Dados: nome, telefone e e-mail preenchidos.
- Resultado esperado: cliente criado, mensagem de sucesso e registro na tabela.

## CT04 - Cadastro de cliente incompleto

- Dados: deixar um campo obrigatório vazio.
- Resultado esperado: mensagem de validação e nenhuma requisição de cadastro válida.

## CT05 - E-mail de cliente duplicado

- Dados: e-mail já cadastrado.
- Resultado esperado: API HTTP 409 e mensagem de e-mail duplicado.

## CT06 - Pesquisa de cliente

- Dados: parte do nome ou e-mail.
- Resultado esperado: tabela exibe apenas clientes correspondentes.

## CT07 - Agendamento válido

- Dados: cliente existente, quadra existente, data e hora preenchidas.
- Resultado esperado: agendamento criado e exibido na listagem.

## CT08 - Agendamento sem recurso

- Dados: não selecionar quadra.
- Resultado esperado: mensagem de campos obrigatórios e agendamento não criado.

## CT09 - Double-booking

- Dados: mesma quadra, mesma data e mesma hora de um agendamento existente.
- Resultado esperado: API HTTP 409, alerta de conflito e nenhum novo registro.

## CT10 - Agendamentos diferentes

- Dados: mesma data e hora, mas quadras diferentes.
- Resultado esperado: dois agendamentos permitidos.

## CT11 - Dashboard

- Pré-condição: clientes, quadras e agendamentos cadastrados.
- Resultado esperado: totais reais e próximos agendamentos exibidos.

## CT12 - Exclusão

- Dados: cliente ou agendamento existente.
- Resultado esperado: registro removido após confirmação e listagem atualizada.

## CT13 - Saúde da API

- Requisição: `GET /health`.
- Resultado esperado: status `ok` e banco `conectado`.
