<?php
$host = 'localhost';
$db   = 'saep_db';
$user = 'postgres';
$pass = 'postgres';

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro na conexão: " . $e->getMessage());
}

function criptografar($texto) {
    return openssl_encrypt($texto, 'AES-128-ECB', 'chave_secreta_saep');
}

function descriptografar($texto) {
    $res = openssl_decrypt($texto, 'AES-128-ECB', 'chave_secreta_saep');
    return $res !== false ? $res : $texto;
}