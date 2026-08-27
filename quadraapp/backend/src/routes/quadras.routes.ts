import { Router } from 'express';
import { pool } from '../database/connection';

const router = Router();

router.get('/quadras', async (req, res) => {

  try {

    const resultado = await pool.query(
      `
      SELECT id, nome, tipo, status
      FROM quadras
      ORDER BY id
      `
    );

    return res.status(200).json(resultado.rows);

  } catch (erro) {

    console.error(erro);

    return res.status(500).json({
      mensagem: 'Erro ao buscar quadras.'
    });

  }

});

export default router;