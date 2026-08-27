import express from 'express';
import cors from 'cors';
import { pool } from './database/connection';
import authRoutes from './routes/auth.routes';
import clientesRoutes from './routes/clientes.routes';
import quadrasRoutes from './routes/quadras.routes';
import agendamentosRoutes from './routes/agendamentos.routes';



const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', clientesRoutes);
app.use('/api', quadrasRoutes);
app.use('/api', agendamentosRoutes);

const PORT = 3000;

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API QuadraApp funcionando!'
  });
});

app.get('/teste-db', async (req, res) => {

  try {

    const resultado = await pool.query('SELECT NOW()');

    res.json({
      mensagem: 'Banco conectado com sucesso!',
      horario: resultado.rows[0].now
    });

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      mensagem: 'Erro ao conectar com o banco de dados.'
    });

  }

});

app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});