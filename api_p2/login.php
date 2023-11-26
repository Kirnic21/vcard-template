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
$dbname = "vcarduser";
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

    $query_login = "SELECT id, nome, sobrenome, email, senha, permissao FROM usuarios WHERE email = '$email' AND senha = '$senha'";
    
    $res = mysqli_query($conexao, $query_login);

    if ($res && mysqli_num_rows($res) > 0){

        $row = $res->fetch_assoc();
        unset($row['senha']);
        $result = "Login realizado com sucesso.";
        $success = true;

    } else {
        $result = "Email ou senha incorretos.";
        $success = false;
        $row = false;
    }
} else {
    $result = "Por favor, forneça um email e uma senha.";
    $success = false;
}

$response = array("result" => $result, "usuario" => $row, "success" => $success);
echo json_encode($response);