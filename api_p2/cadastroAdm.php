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

    $query_adm = "INSERT INTO usuarios (id, nome, sobrenome, email, senha, contato, data , permissao) VALUES (:id, :nome, :sobrenome, :email, :senha, :contato, :data, :permissao)";
    $cad_adm = $conexao -> prepare($query_adm);
    
    $cad_adm->bindParam(':id', $dados['usuarios']['id'],PDO::PARAM_INT);
    $cad_adm->bindParam(':nome', $dados['usuarios']['nome'],PDO::PARAM_STR);
    $cad_adm->bindParam(':sobrenome', $dados['usuarios']['sobrenome'],PDO::PARAM_STR);
    $cad_adm->bindParam(':email', $dados['usuarios']['email'],PDO::PARAM_STR);
    $cad_adm->bindParam(':senha', $dados['usuarios']['senha'],PDO::PARAM_STR);
    $cad_adm->bindParam(':contato', $dados['usuarios']['contato'],PDO::PARAM_INT);
    $cad_adm->bindParam(':data', $dados['usuarios']['data']);
    $cad_adm->bindParam(':permissao', $dados['usuarios']['permissao'],PDO::PARAM_INT);
    

    $cad_adm -> execute();

    if($cad_adm -> rowCount()){
        $response = [
            "erro" => false,
            "messagem" => "Usuário cadastrado com sucesso"
        ];
        $sucess = true;
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