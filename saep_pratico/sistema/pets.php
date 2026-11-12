<?php
require_once 'auth.php';
require_once 'conexao.php';

$mensagem = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tutor_id = $_POST['tutor_id'];
    $nome     = $_POST['nome'];
    $especie  = $_POST['especie'];

    $stmt = $pdo->prepare("INSERT INTO pets (tutor_id, nome, especie) VALUES (:tutor_id, :nome, :especie)");
    $stmt->execute([
        'tutor_id' => $tutor_id,
        'nome'     => $nome,
        'especie'  => $especie
    ]);
    $mensagem = "Pet cadastrado com sucesso!";
}

$tutores = $pdo->query("SELECT id, nome FROM tutores ORDER BY nome")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Pets - SisVet</title>
</head>
<body>
    <h2>Cadastro de Pets</h2>
    <p><a href="home.php">Voltar ao Painel Principal</a></p>
    <hr>

    <?php if ($mensagem): ?>
        <p style="color: green;"><?= $mensagem ?></p>
    <?php endif; ?>

    <form method="POST">
        <label>Tutor Responsável:</label><br>
        <select name="tutor_id" required>
            <option value="">Selecione um tutor...</option>
            <?php foreach ($tutores as $t): ?>
                <option value="<?= $t['id'] ?>"><?= htmlspecialchars($t['nome']) ?></option>
            <?php endforeach; ?>
        </select><br><br>

        <label>Nome do Pet:</label><br>
        <input type="text" name="nome" required><br><br>

        <label>Espécie:</label><br>
        <input type="text" name="especie" placeholder="Ex: Canina, Felina" required><br><br>

        <button type="submit">Cadastrar Pet</button>
    </form>
</body>
</html>