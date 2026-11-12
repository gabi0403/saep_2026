-- População de banco de dados

-- Criação do banco
CREATE DATABASE saep_db;

-- Tabelas

-- Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Tutores
CREATE TABLE IF NOT EXISTS tutores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(128) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    telefone VARCHAR(50) NOT NULL
);

-- Pets
CREATE TABLE IF NOT EXISTS pets (
    id SERIAL PRIMARY KEY,
    tutor_id INTEGER NOT NULL REFERENCES tutores(id) ON DELETE CASCADE,
    nome VARCHAR(128) NOT NULL,
    especie VARCHAR(128) NOT NULL
);

-- Agendamentos
CREATE TABLE IF NOT EXISTS agendamentos (
    id SERIAL PRIMARY KEY,
    tutor_id INTEGER NOT NULL REFERENCES tutores(id) ON DELETE CASCADE,
    pet_id INTEGER NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    data_agendamento DATE NOT NULL,
    servico VARCHAR(128) NOT NULL
);


-- População inicial (3 registros por tabela)

-- Usuários (senha padrão: 123456)
INSERT INTO usuarios (id, nome, email, senha) VALUES
(1, 'Dra. Adriana Silva', 'adriana@sisvet.com', '$2y$12$ghGYylJ1Owzc.BwZUACwguzMl3ab7XiwEAv6BdMW9CUb9scm2ZaPq'),
(2, 'Lucas Pereira', 'lucas@sisvet.com', '$2y$12$ghGYylJ1Owzc.BwZUACwguzMl3ab7XiwEAv6BdMW9CUb9scm2ZaPq'),
(3, 'Marina Rocha', 'gestao@sisvet.com', '$2y$12$ghGYylJ1Owzc.BwZUACwguzMl3ab7XiwEAv6BdMW9CUb9scm2ZaPq');

-- Tutores (CPFs em Base64 simples para exemplo: 111.222.333-44, 555.666.777-88, 999.888.777-66)
INSERT INTO tutores (id, nome, cpf, telefone) VALUES
(1, 'Carlos Silva', 'k159RXVywgumWKcfeErpCQ==', '(11) 98765-4321'),
(2, 'Beatriz Martins', 'k159RXVywgumWKcfeErpCQ==', '(11) 97654-3210'),
(3, 'Fernando Lima', 'k159RXVywgumWKcfeErpCQ==', '(19) 99123-4567');

-- Pets
INSERT INTO pets (id, tutor_id, nome, especie) VALUES
(1, 1, 'Nina', 'Canina'),
(2, 2, 'Chloe', 'Felina'),
(3, 3, 'Bolt', 'Canina');

-- Agendamentos
INSERT INTO agendamentos (id, tutor_id, pet_id, data_agendamento, servico) VALUES
(1, 1, 1, '2026-11-15', 'Consulta Geral'),
(2, 2, 2, '2026-11-20', 'Vacinação'),
(3, 3, 3, '2026-11-25', 'Exame de Sangue');

-- Ajuste das sequências de ID para os próximos cadastros
SELECT setval('usuarios_id_seq', (SELECT MAX(id) FROM usuarios));
SELECT setval('tutores_id_seq', (SELECT MAX(id) FROM tutores));
SELECT setval('pets_id_seq', (SELECT MAX(id) FROM pets));
SELECT setval('agendamentos_id_seq', (SELECT MAX(id) FROM agendamentos));