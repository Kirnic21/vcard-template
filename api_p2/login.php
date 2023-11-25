<?php

// Cabecalhos obrigatórios
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET,POST");

// Incluindo a conexao
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "vcard";
$port = "3306";

$conexao = new mysqli($host, $user, $pass, $dbname, $port);
if(mysqli_connect_error()){
    echo mysqli_connect_error();
    exit();
}

$response_json = file_get_contents('php://input');
$dados = json_decode($response_json, true); 

$email = isset($dados['email']) ? $dados['email'] : "";
$senha = isset($dados['senha']) ? $dados['senha'] : "";

if ($email != "" && $senha != "") {

    $query_login = "SELECT 'administradores' as tipo, email, senha FROM administradores WHERE email ='$email' AND senha = '$senha'
    UNION
    SELECT 'organizadores' as tipo, email, senha FROM organizadores WHERE email ='$email' AND senha = '$senha'
    UNION
    SELECT 'expositores' as tipo, email, senha FROM expositores WHERE email ='$email' AND senha = '$senha'
    UNION
    SELECT 'visitantes' as tipo, email, senha FROM visitantes WHERE email ='$email' AND senha = '$senha'
";
    $res = mysqli_query($conexao, $query_login);

    if ($res && mysqli_num_rows($res) > 0){
        $result = "Login realizado com sucesso.";
    } else {
        $result = "Email ou senha incorretos.";
    }
} else {
    $result = "Por favor, forneça um email e uma senha.";
}

$response = array("result" => $result);
echo json_encode($response);