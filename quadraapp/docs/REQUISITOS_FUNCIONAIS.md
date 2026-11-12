# Requisitos Funcionais

## Sistema

QuadraApp - Sistema de agendamento white-label para complexo de quadras esportivas.

## RF01 - Autenticar administrador

O sistema deve permitir que o administrador informe usuário e senha. Credenciais inválidas devem gerar mensagem de erro na tela.

## RF02 - Cadastrar cliente

O administrador deve cadastrar cliente informando nome, telefone e e-mail. Os campos obrigatórios devem ser validados antes do envio.

## RF03 - Listar e pesquisar clientes

O sistema deve consultar os clientes pela API e permitir filtrar a listagem por nome ou e-mail.

## RF04 - Alterar cliente

O administrador deve editar os dados de um cliente existente.

## RF05 - Excluir cliente

O administrador deve excluir um cliente mediante confirmação.

## RF06 - Listar quadras

O sistema deve carregar da API as quadras disponíveis, incluindo nome, tipo e status.

## RF07 - Criar agendamento

O administrador deve criar um agendamento selecionando cliente, quadra, data e horário.

## RF08 - Validar conflito de horário

O sistema não deve permitir duas locações para a mesma quadra na mesma data e horário. A API deve retornar HTTP 409 e a interface deve informar o conflito.

## RF09 - Consultar histórico de agendamentos

O sistema deve listar os agendamentos registrando identificador, cliente, quadra, tipo de quadra, data e horário.

## RF10 - Excluir agendamento

O administrador deve poder cancelar/remover um agendamento existente.

## RF11 - Consultar indicadores

A interface principal deve exibir totais de clientes, quadras e agendamentos, além dos próximos agendamentos.

## RF12 - Encerrar sessão

O administrador deve poder sair do sistema e retornar à tela de login.

## Regras de negócio

- RN01: uma quadra não pode ter mais de uma locação no mesmo dia e horário.
- RN02: cliente e quadra devem existir antes da criação do agendamento.
- RN03: e-mail de cliente deve ser único.
- RN04: o recurso obrigatório do tema é a quadra esportiva.
