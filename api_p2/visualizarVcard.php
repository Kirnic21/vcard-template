<?php 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
// Incluindo a conexao
include_once 'conexao2.php';

//$id= 3;
$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);
$response = "";

$query_vcard = "SELECT id, titulo, descritivo, categoria, urls, link_vcard, data, registros, visualizacoes FROM vcard WHERE id = :id LIMIT 1";
$result_vcard =  $conexao -> prepare($query_vcard);
$result_vcard -> bindParam(':id', $id, PDO::PARAM_INT);
$result_vcard -> execute();

if(($result_vcard) AND ($result_vcard -> rowCount() != 0)){
    $row_vcard = $result_vcard -> fetch(PDO::FETCH_ASSOC);
    extract($row_vcard);
    $vcard = [
        'id' => $id,
        'titulo' => $titulo,
        'descritivo' => $descritivo,
        'categoria' => $categoria,
        'urls' => $urls,
        'link_vcard' => $link_vcard,
        'data' => $data,
        'registros' => $registros,
        'visualizacoes' => $visualizacoes
    ];
    $response = [
        "erro" => false,
        "vcard" => $vcard
    ];
}else{
    $response = [
        "erro" => true,
        "messagem" => "Produto não encontrado!"
    ];
}

http_response_code(200);
echo json_encode($response);