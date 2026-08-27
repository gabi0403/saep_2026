import { Router } from 'express';
import { pool } from '../database/connection';

const router = Router();

router.post('/login', async (req, res) => {

  try {

    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(400).json({
        mensagem: 'Usuário e senha são obrigatórios.'
      });
    }

    const resultado = await pool.query(
      `
      SELECT id, usuario
      FROM usuarios
      WHERE usuario = $1 AND senha = $2
      `,
      [usuario, senha]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({
        mensagem: 'Usuário ou senha inválidos.'
      });
    }

    const usuarioEncontrado = resultado.rows[0];

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso.',
      usuario: usuarioEncontrado
    });

  } catch (erro) {

    console.error(erro);

    return res.status(500).json({
      mensagem: 'Erro interno do servidor.'
    });

  }

});

export default router;