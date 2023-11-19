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

$query_adm = "DELETE FROM administradores WHERE id = :id LIMIT 1";
$delete_adm = $conexao -> prepare($query_adm);

$delete_adm -> bindParam(':id', $id, PDO::PARAM_INT);

if($delete_adm -> execute()){
    $response = [
        "erro" => false,
        "mensagem" => "Administrador apagado com sucesso!"
    ];
}else{
    $response = [
        "erro" => true,
        "mensagem" => "Erro: Administrador não apagado com sucesso!"
    ];
}



http_response_code(200);
echo json_encode($response);