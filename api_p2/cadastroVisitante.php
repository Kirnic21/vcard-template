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

    $query_visitante = "INSERT INTO visitantes (id, nome, email, contato, interesses, senha, permissao) VALUES (:id, :nome, :email, :contato, :interesses, :senha, :permissao)";
    $cad_visitante = $conexao -> prepare($query_visitante);
    
    $cad_visitante->bindParam(':id', $dados['visitantes']['id'],PDO::PARAM_INT);
    $cad_visitante->bindParam(':nome', $dados['visitantes']['nome'],PDO::PARAM_STR);
    $cad_visitante->bindParam(':email', $dados['visitantes']['email'],PDO::PARAM_STR);
    $cad_visitante->bindParam(':contato', $dados['visitantes']['contato'],PDO::PARAM_INT);
    $cad_visitante->bindParam(':interesses', $dados['visitantes']['interesses']);
    $cad_visitante->bindParam(':senha', $dados['visitantes']['senha'],PDO::PARAM_STR);
    $cad_visitante->bindParam(':permissao', $dados['visitantes']['permissao'],PDO::PARAM_INT);
    

    $cad_visitante -> execute();

    if($cad_visitante -> rowCount()){
        $response = [
            "erro" => false,
            "messagem" => "Usuário cadastrado com sucesso"
        ];
    }else{
        $response = [
            "erro" => true,
            "messagem" => "Usuário não cadastrado com sucesso"
        ];
    }
}else{
    $response = [
        "erro" => true,
        "messagem" => "Usuário não cadastrado com sucesso"
    ];
}

http_response_code(200);
echo json_encode($response);