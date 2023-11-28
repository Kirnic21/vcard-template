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

    $query_exp = "INSERT INTO usuarios (id, nome, sobrenome, email, senha, contato, expo, data , permissao) VALUES (:id, :nome, :sobrenome, :email, :senha, :contato, :expo, :data, :permissao)";
    $cad_exp = $conexao -> prepare($query_exp);
    
    $cad_exp->bindParam(':id', $dados['usuarios']['id'],PDO::PARAM_INT);
    $cad_exp->bindParam(':nome', $dados['usuarios']['nome'],PDO::PARAM_STR);
    $cad_exp->bindParam(':sobrenome', $dados['usuarios']['sobrenome'],PDO::PARAM_STR);
    $cad_exp->bindParam(':email', $dados['usuarios']['email'],PDO::PARAM_STR);
    $cad_exp->bindParam(':senha', $dados['usuarios']['senha'],PDO::PARAM_STR);
    $cad_exp->bindParam(':contato', $dados['usuarios']['contato'],PDO::PARAM_INT);
    $cad_exp->bindParam(':expo', $dados['usuarios']['expo'],PDO::PARAM_STR);
    $cad_exp->bindParam(':data', $dados['usuarios']['data']);
    $cad_exp->bindParam(':permissao', $dados['usuarios']['permissao'],PDO::PARAM_INT);
   
    

    $cad_exp -> execute();

    if($cad_exp -> rowCount()){
        $response = [
            "erro" => false,
            "messagem" => "Expositor cadastrado com sucesso"
        ];
    }else{
        $response = [
            "erro" => true,
            "messagem" => "Expositor não cadastrado com sucesso"
        ];
    }
}else{
    $response = [
        "erro" => true,
        "messagem" => "Expositor não cadastrado com sucesso!!!!!!"
    ];
}

http_response_code(200);
echo json_encode($response);