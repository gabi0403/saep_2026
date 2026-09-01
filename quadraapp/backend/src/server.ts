import express from 'express';
import cors from 'cors';
import { pool } from './database/connection';
import { dbErrorHandler } from './middleware/dbErrorHandler';
import authRoutes from './routes/auth.routes';
import clientesRoutes from './routes/clientes.routes';
import quadrasRoutes from './routes/quadras.routes';
import agendamentosRoutes from './routes/agendamentos.routes';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT NOW()');
    res.json({
      status: 'ok',
      database: 'conectado',
      timestamp: resultado.rows[0].now,
      uptime: process.uptime()
    });
  } catch (erro: any) {
    res.status(503).json({
      status: 'erro',
      database: 'desconectado',
      erro: erro.message
    });
  }
});

// Endpoint raiz
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API QuadraApp funcionando!',
    versao: '1.0.0',
    endpoints: {
      health: '/health',
      teste_db: '/teste-db',
      auth: '/api/login',
      clientes: '/api/clientes',
      quadras: '/api/quadras',
      agendamentos: '/api/agendamentos'
    }
  });
});

// Teste de conexão com BD
app.get('/teste-db', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT NOW()');

    res.json({
      mensagem: 'Banco conectado com sucesso!',
      horario: resultado.rows[0].now,
      poolClientes: pool.totalCount,
      poolIdle: pool.idleCount
    });

  } catch (erro: any) {
    console.error('❌ Erro ao testar BD:', erro.message);

    res.status(503).json({
      mensagem: 'Erro ao conectar com o banco de dados.',
      erro: erro.message,
      dica: 'Verifique se o PostgreSQL está rodando e as credenciais estão corretas'
    });
  }
});

// Rotas da API
app.use('/api', authRoutes);
app.use('/api', clientesRoutes);
app.use('/api', quadrasRoutes);
app.use('/api', agendamentosRoutes);

// Middleware de tratamento de erros
app.use(dbErrorHandler);

// Rota 404
app.use((req, res) => {
  res.status(404).json({
    mensagem: 'Rota não encontrada',
    path: req.path,
    metodo: req.method
  });
});

app.listen(PORT, () => {
  console.log(`
🚀 Servidor QuadraApp rodando!
📍 http://localhost:${PORT}
🏥 Health check: http://localhost:${PORT}/health
🧪 Teste BD: http://localhost:${PORT}/teste-db
  `);
});