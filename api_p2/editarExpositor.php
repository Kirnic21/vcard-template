<?php

//Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

// Incluindo a conexao
include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

/*
$response = [
    "erro" => false,
    "mensagem" => "Acessou",
    "dados" => $dados
];
*/
if($dados){

    $query_exp = "UPDATE expositores SET nome = :nome, e_mail = :e_mail, senha = :senha, tema = :tema, contato = :contato, data = :data, fk_evento_id = :fk_evento_id WHERE id = :id";
    $edit_exp = $conexao -> prepare($query_exp);

    $edit_exp -> bindParam(':nome', $dados['nome'], PDO::PARAM_STR); 
    $edit_exp -> bindParam(':e_mail', $dados['e_mail'], PDO::PARAM_STR); 
    $edit_exp -> bindParam(':senha', $dados['senha'], PDO::PARAM_STR);
    $edit_exp -> bindParam(':tema', $dados['tema'], PDO::PARAM_STR);
    $edit_exp -> bindParam(':contato', $dados['contato'], PDO::PARAM_INT);
    $edit_exp -> bindParam(':data', $dados['data']);
    $edit_exp -> bindParam(':fk_evento_id', $dados['fk_evento_id'], PDO::PARAM_INT); 
    $edit_exp -> bindParam(':id', $dados['id'], PDO::PARAM_INT); 

    $edit_exp -> execute();

    if($edit_exp -> rowCount()){
        $response = [
            "erro" => False,
            "mensagem" => "Expositor editado com sucesso!"
        ];
    }else{
        $response = [
            "erro" => True,
            "mensagem" => "Expositor não editado com sucesso!"
        ];
    }
}else{
    $response = [
        "erro" => True,
        "mensagem" => "Expositor não editado com sucesso!"
    ];
} 
http_response_code(200);
echo json_encode($response);