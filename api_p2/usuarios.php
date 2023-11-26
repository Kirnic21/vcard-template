<?php 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
// Incluindo a conexao
include_once 'conexao2.php';

//$id= 3;
$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);
$response = "";

$query_user = "SELECT id, nome, sobrenome, email, contato, expo, interesses, data, permissao FROM usuarios WHERE id = :id LIMIT 1";
$result_user =  $conexao -> prepare($query_user);
$result_user -> bindParam(':id', $id, PDO::PARAM_INT);
$result_user -> execute();

if(($result_user) AND ($result_user -> rowCount() != 0)){
    $row_user = $result_user -> fetch(PDO::FETCH_ASSOC);
    extract($row_user);
    $user = [
        'id' => $id,
        'nome' => $nome,
        'sobrenome' => $sobrenome,
        'email' => $email,
        'contato' => $contato,
        'expo' => $expo,
        'interesses' => $interesses,
        'data' => $data,
        'permissao' => $permissao,
    ];
    $response = [
        "erro" => false,
        "user" => $user
    ];
}else{
    $response = [
        "erro" => true,
        "messagem" => "Usuário não encontrado!"
    ];
}

http_response_code(200);
echo json_encode($response);