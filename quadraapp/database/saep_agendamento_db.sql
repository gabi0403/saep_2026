-- QuadraApp - banco do Complexo de Quadras Esportivas
-- Execute este arquivo com psql como usuario administrador do PostgreSQL.
-- Exemplo: psql -U postgres -f database/saep_agendamento_db.sql

SELECT 'CREATE DATABASE saep_agendamento_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'saep_agendamento_db')\gexec

\connect saep_agendamento_db

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    telefone VARCHAR(30) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS quadras (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    tipo VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Disponível'
);

CREATE TABLE IF NOT EXISTS agendamentos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    quadra_id INTEGER NOT NULL REFERENCES quadras(id) ON DELETE CASCADE,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    CONSTRAINT agendamento_unico_por_quadra
        UNIQUE (quadra_id, data, hora)
);

INSERT INTO usuarios (usuario, senha)
VALUES ('admin', 'admin123')
ON CONFLICT (usuario) DO NOTHING;

INSERT INTO quadras (nome, tipo, status)
VALUES
    ('Quadra 1', 'Tênis', 'Disponível'),
    ('Quadra 2', 'Beach Tennis', 'Disponível'),
    ('Quadra 3', 'Futebol Society', 'Disponível'),
    ('Quadra 4', 'Vôlei', 'Disponível'),
    ('Quadra 5', 'Basquete', 'Disponível')
ON CONFLICT (nome) DO NOTHING;

-- Dados opcionais para demonstrar o relacionamento e a listagem.
INSERT INTO clientes (nome, telefone, email)
VALUES ('Cliente Demonstração', '(19) 99999-0000', 'demo@quadraapp.local')
ON CONFLICT (email) DO NOTHING;
