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

    $query_org = "UPDATE organizadores SET nome = :nome, sobrenome = :sobrenome, email = :email, senha = :senha WHERE id = :id";
    $edit_org = $conexao -> prepare($query_org);

    $edit_org -> bindParam(':nome', $dados['nome'], PDO::PARAM_STR); 
    $edit_org -> bindParam(':sobrenome', $dados['sobrenome'], PDO::PARAM_STR); 
    $edit_org -> bindParam(':email', $dados['email'], PDO::PARAM_STR);
    $edit_org -> bindParam(':senha', $dados['senha'], PDO::PARAM_STR);
    $edit_org -> bindParam(':id', $dados['id'], PDO::PARAM_INT); 

    $edit_org -> execute();

    if($edit_org -> rowCount()){
        $response = [
            "erro" => False,
            "mensagem" => "Organizador editado com sucesso!"
        ];
    }else{
        $response = [
            "erro" => True,
            "mensagem" => "Organizador não editado com sucesso!"
        ];
    }
}else{
    $response = [
        "erro" => True,
        "mensagem" => "Organizador não editado com sucesso!"
    ];
} 
http_response_code(200);
echo json_encode($response);