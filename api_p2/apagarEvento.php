<?php

//Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Acess-Control-Allow-Methods: GET,PUT,POST,DELETE");

// Incluindo a conexao
include_once 'conexao.php';

$id = filter_input(INPUT_GET, "id", FILTER_SANITIZE_NUMBER_INT);

$response = "";

$query_evento = "DELETE FROM evento WHERE id = :id LIMIT 1";
$delete_evento = $conexao -> prepare($query_evento);

$delete_evento -> bindParam(':id', $id, PDO::PARAM_INT);

if($delete_evento -> execute()){
    $response = [
        "erro" => false,
        "mensagem" => "Produto apagado com sucesso!"
    ];
}else{
    $response = [
        "erro" => true,
        "mensagem" => "Erro: Produto não apagado com sucesso!"
    ];
}



http_response_code(200);
echo json_encode($response);