<?php
require_once 'auth.php';
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Painel Principal - SisVet</title>
</head>
<body>
    <h2>Bem-vindo(a), <?= htmlspecialchars($_SESSION['usuario_nome']) ?>!</h2>
    <p><a href="logout.php">Sair do sistema</a></p>

    <hr>
    <h3>Menu de Funcionalidades</h3>
    <ul>
        <li><a href="tutores.php">Gerenciar Tutores</a></li>
        <li><a href="pets.php">Cadastrar Pets</a></li>
        <li><a href="agendamentos.php">Gerenciar Agendamentos</a></li>
    </ul>
</body>
</html>