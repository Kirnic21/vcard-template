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

    $query_org = "INSERT INTO usuarios (id, nome, sobrenome, email, senha, contato, data , permissao) VALUES (:id, :nome, :sobrenome, :email, :senha, :contato, :data, :permissao)";
    $cad_org = $conexao -> prepare($query_org);
    
    $cad_org->bindParam(':id', $dados['usuarios']['id'],PDO::PARAM_INT);
    $cad_org->bindParam(':nome', $dados['usuarios']['nome'],PDO::PARAM_STR);
    $cad_org->bindParam(':sobrenome', $dados['usuarios']['sobrenome'],PDO::PARAM_STR);
    $cad_org->bindParam(':email', $dados['usuarios']['email'],PDO::PARAM_STR);
    $cad_org->bindParam(':senha', $dados['usuarios']['senha'],PDO::PARAM_STR);
    $cad_org->bindParam(':contato', $dados['usuarios']['contato'],PDO::PARAM_INT);
    $cad_org->bindParam(':data', $dados['usuarios']['data']);
    $cad_org->bindParam(':permissao', $dados['usuarios']['permissao'],PDO::PARAM_INT);
   
    $cad_org -> execute();

    if($cad_org -> rowCount()){
        $response = [
            "erro" => false,
            "messagem" => "Organizador cadastrado com sucesso"
        ];
    }else{
        $response = [
            "erro" => true,
            "messagem" => "Organizador não cadastrado com sucesso"
        ];
    }
}else{
    $response = [
        "erro" => true,
        "messagem" => "Organizador não cadastrado com sucesso!!!!!!"
    ];
}

http_response_code(200);
echo json_encode($response);