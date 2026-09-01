import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para tratamento de erros de conexão com BD
 * Retorna erro 503 (Service Unavailable) se BD está indisponível
 */
export function dbErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  
  // Erro de conexão com banco de dados
  if (err.message?.includes('connect') || 
      err.code === 'ECONNREFUSED' ||
      err.code === 'ENOTFOUND') {
    
    console.error('❌ Erro de conexão com BD:', err.message);
    
    return res.status(503).json({
      mensagem: 'Banco de dados indisponível. Tente novamente em alguns momentos.',
      erro: err.message
    });
  }

  // Erro de timeout
  if (err.code === 'ETIMEDOUT' || err.message?.includes('timeout')) {
    
    console.error('⏱️ Timeout na conexão com BD:', err.message);
    
    return res.status(504).json({
      mensagem: 'Timeout ao conectar com o banco de dados. Tente novamente.',
      erro: err.message
    });
  }

  // Erro genérico de BD
  if (err.message?.includes('pool')) {
    
    console.error('🔴 Erro do pool de conexões:', err.message);
    
    return res.status(503).json({
      mensagem: 'Erro de conexão com o banco de dados.',
      erro: err.message
    });
  }

  // Passa para o próximo middleware se não for erro de BD
  next(err);
}
