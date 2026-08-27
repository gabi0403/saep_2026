import { Router } from 'express';
import { pool } from '../database/connection';

const router = Router();


// LISTAR CLIENTES
router.get('/clientes', async (req, res) => {

  try {

    const resultado = await pool.query(
      'SELECT id, nome, telefone, email FROM clientes ORDER BY id'
    );

    return res.status(200).json(resultado.rows);

  } catch (erro) {

    console.error(erro);

    return res.status(500).json({
      mensagem: 'Erro ao buscar clientes.'
    });

  }

});


// CADASTRAR CLIENTE
router.post('/clientes', async (req, res) => {

  try {

    const { nome, telefone, email } = req.body;

    if (!nome || !telefone || !email) {
      return res.status(400).json({
        mensagem: 'Nome, telefone e e-mail são obrigatórios.'
      });
    }

    const resultado = await pool.query(
      `
      INSERT INTO clientes (nome, telefone, email)
      VALUES ($1, $2, $3)
      RETURNING id, nome, telefone, email
      `,
      [nome, telefone, email]
    );

    return res.status(201).json(resultado.rows[0]);

  } catch (erro: any) {

    console.error(erro);

    // E-mail duplicado
    if (erro.code === '23505') {
      return res.status(409).json({
        mensagem: 'Já existe um cliente com este e-mail.'
      });
    }

    return res.status(500).json({
      mensagem: 'Erro ao cadastrar cliente.'
    });

  }

});


// ATUALIZAR CLIENTE
router.put('/clientes/:id', async (req, res) => {

  try {

    const id = Number(req.params.id);
    const { nome, telefone, email } = req.body;

    if (!nome || !telefone || !email) {
      return res.status(400).json({
        mensagem: 'Nome, telefone e e-mail são obrigatórios.'
      });
    }

    const resultado = await pool.query(
      `
      UPDATE clientes
      SET nome = $1,
          telefone = $2,
          email = $3
      WHERE id = $4
      RETURNING id, nome, telefone, email
      `,
      [nome, telefone, email, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: 'Cliente não encontrado.'
      });
    }

    return res.status(200).json(resultado.rows[0]);

  } catch (erro: any) {

    console.error(erro);

    if (erro.code === '23505') {
      return res.status(409).json({
        mensagem: 'Já existe um cliente com este e-mail.'
      });
    }

    return res.status(500).json({
      mensagem: 'Erro ao atualizar cliente.'
    });

  }

});


// EXCLUIR CLIENTE
router.delete('/clientes/:id', async (req, res) => {

  try {

    const id = Number(req.params.id);

    const resultado = await pool.query(
      `
      DELETE FROM clientes
      WHERE id = $1
      RETURNING id
      `,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: 'Cliente não encontrado.'
      });
    }

    return res.status(200).json({
      mensagem: 'Cliente excluído com sucesso.'
    });

  } catch (erro) {

    console.error(erro);

    return res.status(500).json({
      mensagem: 'Erro ao excluir cliente.'
    });

  }

});

export default router;