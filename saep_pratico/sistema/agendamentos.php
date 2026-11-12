<?php
require_once 'auth.php';
require_once 'conexao.php';

// Atualizar data do agendamento
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'], $_POST['data_agendamento'])) {
    $stmt = $pdo->prepare("UPDATE agendamentos SET data_agendamento = :data WHERE id = :id");
    $stmt->execute([
        'data' => $_POST['data_agendamento'],
        'id'   => $_POST['id']
    ]);
    header("Location: agendamentos.php");
    exit;
}

// Listar agendamentos ordenados por data trazendo dados do tutor e do pet
$sql = "SELECT 
            a.id,
            a.data_agendamento,
            a.servico,
            t.nome AS tutor_nome,
            t.cpf AS tutor_cpf,
            t.telefone AS tutor_telefone,
            p.nome AS pet_nome,
            p.especie AS pet_especie
        FROM agendamentos a
        JOIN tutores t ON a.tutor_id = t.id
        JOIN pets p ON a.pet_id = p.id
        ORDER BY a.data_agendamento ASC";

$agendamentos = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Agendamentos - SisVet</title>
</head>
<body>
    <h2>Gerenciamento de Agendamentos</h2>
    <p><a href="home.php">Voltar ao Painel Principal</a></p>
    <hr>

    <table border="1" cellpadding="6">
        <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Serviço</th>
            <th>Tutor (Nome / CPF / Telefone)</th>
            <th>Pet (Nome / Espécie)</th>
            <th>Atualizar Data</th>
        </tr>
        <?php foreach ($agendamentos as $a): ?>
            <tr>
                <td><?= $a['id'] ?></td>
                <td><?= date('d/m/Y', strtotime($a['data_agendamento'])) ?></td>
                <td><?= htmlspecialchars($a['servico']) ?></td>
                <td>
                    <?= htmlspecialchars($a['tutor_nome']) ?> |
                    <?= htmlspecialchars(descriptografar($a['tutor_cpf'])) ?> |
                    <?= htmlspecialchars($a['tutor_telefone']) ?>
                </td>
                <td>
                    <?= htmlspecialchars($a['pet_nome']) ?> (<?= htmlspecialchars($a['pet_especie']) ?>)
                </td>
                <td>
                    <form method="POST" style="margin: 0;">
                        <input type="hidden" name="id" value="<?= $a['id'] ?>">
                        <input type="date" name="data_agendamento" value="<?= $a['data_agendamento'] ?>" required>
                        <button type="submit">Salvar</button>
                    </form>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>