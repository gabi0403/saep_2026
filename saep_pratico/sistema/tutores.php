<?php
require_once 'auth.php';
require_once 'conexao.php';

// Excluir tutor
if (isset($_GET['excluir'])) {
    $stmt = $pdo->prepare("DELETE FROM tutores WHERE id = :id");
    $stmt->execute(['id' => $_GET['excluir']]);
    header("Location: tutores.php");
    exit;
}

// Cadastrar ou Editar tutor
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id       = $_POST['id'] ?? '';
    $nome     = $_POST['nome'];
    $cpf      = criptografar($_POST['cpf']); // Salva criptografado
    $telefone = $_POST['telefone'];

    if ($id) {
        $stmt = $pdo->prepare("UPDATE tutores SET nome = :nome, cpf = :cpf, telefone = :telefone WHERE id = :id");
        $stmt->execute(['nome' => $nome, 'cpf' => $cpf, 'telefone' => $telefone, 'id' => $id]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO tutores (nome, cpf, telefone) VALUES (:nome, :cpf, :telefone)");
        $stmt->execute(['nome' => $nome, 'cpf' => $cpf, 'telefone' => $telefone]);
    }
    header("Location: tutores.php");
    exit;
}

// Buscar dados para edição (se clicou em Editar)
$tutorEditar = null;
if (isset($_GET['editar'])) {
    $stmt = $pdo->prepare("SELECT * FROM tutores WHERE id = :id");
    $stmt->execute(['id' => $_GET['editar']]);
    $tutorEditar = $stmt->fetch(PDO::FETCH_ASSOC);
}

// Busca por termo ou listagem geral
$busca = $_GET['busca'] ?? '';
if ($busca !== '') {
    $stmt = $pdo->prepare("SELECT * FROM tutores WHERE nome ILIKE :busca ORDER BY id");
    $stmt->execute(['busca' => "%$busca%"]);
} else {
    $stmt = $pdo->query("SELECT * FROM tutores ORDER BY id");
}
$tutores = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Tutores - SisVet</title>
</head>
<body>
    <h2>Gerenciamento de Tutores</h2>
    <p><a href="home.php">Voltar ao Painel Principal</a></p>
    <hr>

    <h3><?= $tutorEditar ? 'Editar Tutor' : 'Cadastrar Novo Tutor' ?></h3>
    <form method="POST">
        <input type="hidden" name="id" value="<?= $tutorEditar['id'] ?? '' ?>">

        <label>Nome:</label><br>
        <input type="text" name="nome" value="<?= htmlspecialchars($tutorEditar['nome'] ?? '') ?>" required><br><br>

        <label>CPF:</label><br>
        <input type="text" name="cpf" value="<?= $tutorEditar ? htmlspecialchars(descriptografar($tutorEditar['cpf'])) : '' ?>" required><br><br>

        <label>Telefone:</label><br>
        <input type="text" name="telefone" value="<?= htmlspecialchars($tutorEditar['telefone'] ?? '') ?>" required><br><br>

        <button type="submit"><?= $tutorEditar ? 'Salvar Alterações' : 'Cadastrar' ?></button>
        <?php if ($tutorEditar): ?>
            <a href="tutores.php">Cancelar</a>
        <?php endif; ?>
    </form>

    <hr>
    <h3>Lista de Tutores</h3>

    <form method="GET">
        <input type="text" name="busca" placeholder="Buscar por nome..." value="<?= htmlspecialchars($busca) ?>">
        <button type="submit">Buscar</button>
        <?php if ($busca !== ''): ?>
            <a href="tutores.php">Limpar</a>
        <?php endif; ?>
    </form>
    <br>

    <table border="1" cellpadding="6">
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF (Descriptografado)</th>
            <th>Telefone</th>
            <th>Ações</th>
        </tr>
        <?php foreach ($tutores as $t): ?>
            <tr>
                <td><?= $t['id'] ?></td>
                <td><?= htmlspecialchars($t['nome']) ?></td>
                <td><?= htmlspecialchars(descriptografar($t['cpf'])) ?></td>
                <td><?= htmlspecialchars($t['telefone']) ?></td>
                <td>
                    <a href="tutores.php?editar=<?= $t['id'] ?>">Editar</a> |
                    <a href="tutores.php?excluir=<?= $t['id'] ?>" onclick="return confirm('Excluir este tutor?')">Excluir</a>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>