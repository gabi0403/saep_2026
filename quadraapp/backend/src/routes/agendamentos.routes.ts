import { Router } from 'express';
import { pool } from '../database/connection';

const router = Router();


// LISTAR AGENDAMENTOS
router.get('/agendamentos', async (req, res) => {

  try {

    const resultado = await pool.query(`
      SELECT
        a.id,
        a.data,
        a.hora,
        c.id AS cliente_id,
        c.nome AS cliente_nome,
        q.id AS quadra_id,
        q.nome AS quadra_nome,
        q.tipo AS quadra_tipo
      FROM agendamentos a
      INNER JOIN clientes c ON a.cliente_id = c.id
      INNER JOIN quadras q ON a.quadra_id = q.id
      ORDER BY a.data, a.hora
    `);

    return res.status(200).json(resultado.rows);

  } catch (erro) {

    console.error(erro);

    return res.status(500).json({
      mensagem: 'Erro ao buscar agendamentos.'
    });

  }

});


// CRIAR AGENDAMENTO
router.post('/agendamentos', async (req, res) => {

  try {

    const { cliente_id, quadra_id, data, hora } = req.body;

    if (!cliente_id || !quadra_id || !data || !hora) {
      return res.status(400).json({
        mensagem: 'Cliente, quadra, data e hora são obrigatórios.'
      });
    }

    const resultado = await pool.query(`
      INSERT INTO agendamentos
        (cliente_id, quadra_id, data, hora)
      VALUES
        ($1, $2, $3, $4)
      RETURNING id, cliente_id, quadra_id, data, hora
    `, [
      cliente_id,
      quadra_id,
      data,
      hora
    ]);

    return res.status(201).json({
      mensagem: 'Agendamento criado com sucesso.',
      agendamento: resultado.rows[0]
    });

  } catch (erro: any) {

    console.error(erro);

    // Cliente ou quadra inexistente
    if (erro.code === '23503') {
      return res.status(400).json({
        mensagem: 'Cliente ou quadra não encontrada.'
      });
    }

    // Conflito de data + hora + quadra
    if (erro.code === '23505') {
      return res.status(409).json({
        mensagem: 'Esta quadra já está agendada para esta data e horário.'
      });
    }

    return res.status(500).json({
      mensagem: 'Erro ao criar agendamento.'
    });

  }

});


// EXCLUIR AGENDAMENTO
router.delete('/agendamentos/:id', async (req, res) => {

  try {

    const id = Number(req.params.id);

    const resultado = await pool.query(`
      DELETE FROM agendamentos
      WHERE id = $1
      RETURNING id
    `, [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: 'Agendamento não encontrado.'
      });
    }

    return res.status(200).json({
      mensagem: 'Agendamento excluído com sucesso.'
    });

  } catch (erro) {

    console.error(erro);

    return res.status(500).json({
      mensagem: 'Erro ao excluir agendamento.'
    });

  }

});

export default router;