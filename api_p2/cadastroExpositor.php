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

    $query_exp = "INSERT INTO expositores (id, nome, e_mail, senha, tema, contato, data, fk_evento_id) VALUES (:id, :nome, :e_mail, :senha, :tema, :contato, :data, :fk_evento_id)";
    $cad_exp = $conexao -> prepare($query_exp);
    
    $cad_exp->bindParam(':id', $dados['expositor']['id'],PDO::PARAM_INT);
    $cad_exp->bindParam(':nome', $dados['expositor']['nome'],PDO::PARAM_STR);
    $cad_exp->bindParam(':e_mail', $dados['expositor']['e_mail'],PDO::PARAM_STR);
    $cad_exp->bindParam(':senha', $dados['expositor']['senha'],PDO::PARAM_STR);
    $cad_exp->bindParam(':tema', $dados['expositor']['tema'],PDO::PARAM_STR);
    $cad_exp->bindParam(':contato', $dados['expositor']['contato'], PDO::PARAM_INT);
    $cad_exp->bindParam(':data', $dados['expositor']['data']);
    $cad_exp->bindParam(':fk_evento_id', $dados['expositor']['fk_evento_id'],PDO::PARAM_INT);
   
    

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