<?php 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
// Incluindo a conexao
include_once 'conexao.php';

//$id= 3;
$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);
$response = "";

$query_eventos = "SELECT id, chave_convite, nome_do_evento, data, informacoes, local FROM evento WHERE id = :id LIMIT 1";
$result_eventos =  $conexao -> prepare($query_eventos);
$result_eventos -> bindParam(':id', $id, PDO::PARAM_INT);
$result_eventos -> execute();

if(($result_eventos) AND ($result_eventos -> rowCount() != 0)){
    $row_evento = $result_eventos -> fetch(PDO::FETCH_ASSOC);
    extract($row_evento);
    $evento = [
        'id' => $id,
        'chave_convite' => $chave_convite,
        'nome_do_evento' => $nome_do_evento,
        'data' => $data,
        'informacoes' => $informacoes,
        'local' => $local
    ];
    $response = [
        "erro" => false,
        "evento" => $evento
    ];
}else{
    $response = [
        "erro" => true,
        "messagem" => "Produto não encontrado!"
    ];
}

http_response_code(200);
echo json_encode($response);