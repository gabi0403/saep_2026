import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  // Configurações de conexão
  max: 20,                          // Máximo de clientes no pool
  min: 2,                           // Mínimo de clientes mantidos
  idleTimeoutMillis: 30000,         // 30 segundos sem atividade
  connectionTimeoutMillis: 5000,    // 5 segundos para conectar
  statement_timeout: 30000,         // 30 segundos por query
});

// Event listeners para diagnosticar problemas
pool.on('error', (err: Error) => {
  console.error('Erro inesperado no pool de conexões:', err);
});

pool.on('connect', () => {
  console.log('Nova conexão estabelecida com o BD');
});

pool.on('remove', () => {
  console.log('Conexão removida do pool');
});

// Testa conexão ao iniciar
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erro ao conectar com o banco de dados:', err.message);
  } else {
    console.log('✅ Banco de dados conectado com sucesso');
  }
});