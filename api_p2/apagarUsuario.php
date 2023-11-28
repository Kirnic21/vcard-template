<?php

//Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Acess-Control-Allow-Methods: GET,PUT,POST,DELETE");

// Incluindo a conexao
include_once 'conexao2.php';

$id = filter_input(INPUT_GET, "id", FILTER_SANITIZE_NUMBER_INT);

$response = "";

$query_user = "DELETE FROM usuarios WHERE id = :id LIMIT 1";
$delete_user = $conexao -> prepare($query_user);

$delete_user -> bindParam(':id', $id, PDO::PARAM_INT);

if($delete_user -> execute()){
    $response = [
        "erro" => false,
        "mensagem" => "Usuário apagado com sucesso!"
    ];
}else{
    $response = [
        "erro" => true,
        "mensagem" => "Erro: Usuario não apagado com sucesso!"
    ];
}



http_response_code(200);
echo json_encode($response);