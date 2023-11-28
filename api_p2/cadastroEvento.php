<?php

//Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Acess-Control-Allow-Methods: GET,PUT,POST,DELETE");

// Incluindo a conexao
include_once 'conexao2.php';

$response_json = file_get_contents("php://input", "php://select");
$dados = json_decode($response_json, true);


if($dados){

    $query_evento = "INSERT INTO evento (id, chave_convite, nome_do_evento, data, informacoes, local, fk_usuarios_id) VALUES (:id, :chave_convite, :nome_do_evento, :data, :informacoes, :local, :fk_usuarios_id)";
    $cad_evento = $conexao -> prepare($query_evento);
    
    $cad_evento->bindParam(':id', $dados['eventos']['id'],PDO::PARAM_STR);
    $cad_evento->bindParam(':chave_convite', $dados['eventos']['chave_convite'],PDO::PARAM_STR);
    $cad_evento->bindParam(':nome_do_evento', $dados['eventos']['nome_do_evento'],PDO::PARAM_STR);
    $cad_evento->bindParam(':data', $dados['eventos']['data']);
    $cad_evento->bindParam(':informacoes', $dados['eventos']['informacoes'],PDO::PARAM_STR);
    $cad_evento->bindParam(':local', $dados['eventos']['local'],PDO::PARAM_STR);
    $cad_evento->bindParam(':fk_usuarios_id', $dados['eventos']['fk_usuarios_id'],PDO::PARAM_STR);
    

    $cad_evento -> execute();

    if($cad_evento -> rowCount()){
        $response = [
            "erro" => false,
            "messagem" => "Evento cadastrado com sucesso"
        ];
    }else{
        $response = [
            "erro" => true,
            "messagem" => "Evento não cadastrado com sucesso"
        ];
    }
}else{
    $response = [
        "erro" => true,
        "messagem" => "Evento não cadastrado com sucesso"
    ];
}

http_response_code(200);
echo json_encode($response);