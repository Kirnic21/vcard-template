<?php

//Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
header("Acess-Control-Allow-Methods: GET,PUT,POST,DELETE");

// Incluindo a conexao
include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados){

    $query_evento = "UPDATE evento SET chave_convite= :chave_convite, nome_do_evento = :nome_do_evento, data = :data, informacoes = :informacoes, local = :local WHERE id = :id";
    $edit_evento = $conexao -> prepare($query_evento);

    $edit_evento -> bindParam(':id', $dados['id'], PDO::PARAM_INT); 
    $edit_evento -> bindParam(':chave_convite', $dados['chave_convite'], PDO::PARAM_INT); 
    $edit_evento -> bindParam(':nome_do_evento', $dados['nome_do_evento'], PDO::PARAM_STR); 
    $edit_evento -> bindParam(':data', $dados['data']);
    $edit_evento -> bindParam(':informacoes', $dados['informacoes'], PDO::PARAM_STR);
    $edit_evento -> bindParam(':local', $dados['local'], PDO::PARAM_STR);

    $edit_evento -> execute();

    if($edit_evento -> rowCount()){
        $response = [
            "erro" => False,
            "mensagem" => "Evento editado com sucesso!"
        ];
    }else{
        $response = [
            "erro" => True,
            "mensagem" => "Evento não editado com sucesso!"
        ];
    }
}else{
    $response = [
        "erro" => True,
        "mensagem" => "Evento não editado com sucesso!"
    ];
}
http_response_code(200);
echo json_encode($response);