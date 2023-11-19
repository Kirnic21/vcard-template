<?php

//Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Acess-Control-Allow-Methods: GET,PUT,POST,DELETE");

// Incluindo a conexao
include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados){

    $query_adm = "INSERT INTO administradores (id, nome, sobrenome, email, senha) VALUES (:id, :nome, :sobrenome, :email, :senha)";
    $cad_adm = $conexao -> prepare($query_adm);
    
    $cad_adm->bindParam(':id', $dados['administrador']['id'],PDO::PARAM_INT);
    $cad_adm->bindParam(':nome', $dados['administrador']['nome'],PDO::PARAM_STR);
    $cad_adm->bindParam(':sobrenome', $dados['administrador']['sobrenome'],PDO::PARAM_STR);
    $cad_adm->bindParam(':email', $dados['administrador']['email'],PDO::PARAM_STR);
    $cad_adm->bindParam(':senha', $dados['administrador']['senha'],PDO::PARAM_STR);
    

    $cad_adm -> execute();

    if($cad_adm -> rowCount()){
        $response = [
            "erro" => false,
            "messagem" => "Administrador cadastrado com sucesso"
        ];
    }else{
        $response = [
            "erro" => true,
            "messagem" => "Administrador não cadastrado com sucesso"
        ];
    }
}else{
    $response = [
        "erro" => true,
        "messagem" => "Administrador não cadastrado com sucesso"
    ];
}

http_response_code(200);
echo json_encode($response);