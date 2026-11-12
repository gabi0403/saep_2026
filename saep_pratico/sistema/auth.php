<?php
session_start();

// Verifica se tá logado
if (!isset($_SESSION['usuario_id'])) {
    header("Location: index.php");
    exit;
}

// expira em 15 minutos (900 segundos)
$tempo_limite = 900;

if (isset($_SESSION['ultimo_acesso']) && (time() - $_SESSION['ultimo_acesso'] > $tempo_limite)) {
    session_unset();
    session_destroy();
    header("Location: index.php?erro=expirado");
    exit;
}

// Atualiza o horário da última atividade
$_SESSION['ultimo_acesso'] = time();