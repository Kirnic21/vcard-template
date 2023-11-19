<?php

//Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Acess-Control-Allow-Methods: GET,PUT,POST,DELETE");

// Incluindo a conexao
include_once 'conexao.php';

$response_json = file_get_contents("php://input", "php://select");
$dados = json_decode($response_json, true);

if($dados){

    $query_org = "INSERT INTO organizadores (id, nome, sobrenome, email, senha, fk_administradores_id) VALUES (:id, :nome, :sobrenome, :email, :senha, :fk_administradores_id)";
    $cad_org = $conexao -> prepare($query_org);
    
    $cad_org->bindParam(':id', $dados['organizador']['id'],PDO::PARAM_INT);
    $cad_org->bindParam(':nome', $dados['organizador']['nome'],PDO::PARAM_STR);
    $cad_org->bindParam(':sobrenome', $dados['organizador']['sobrenome'],PDO::PARAM_STR);
    $cad_org->bindParam(':email', $dados['organizador']['email'],PDO::PARAM_STR);
    $cad_org->bindParam(':senha', $dados['organizador']['senha'],PDO::PARAM_STR);
    $cad_org->bindParam(':fk_administradores_id', $dados['organizador']['fk_administradores_id'],PDO::PARAM_INT);
   
    

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