<?php

//Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

// Incluindo a conexao
include_once 'conexao2.php';

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

    $query_user = "UPDATE usuarios SET nome = :nome, sobrenome = :sobrenome, email = :email, senha = :senha, contato = :contato, expo = :expo, interesses = :interesses WHERE id = :id";
    $edit_user = $conexao -> prepare($query_user);

    $edit_user -> bindParam(':nome', $dados['nome'], PDO::PARAM_STR); 
    $edit_user -> bindParam(':sobrenome', $dados['sobrenome'], PDO::PARAM_STR); 
    $edit_user -> bindParam(':email', $dados['email'], PDO::PARAM_STR); 
    $edit_user -> bindParam(':senha', $dados['senha'], PDO::PARAM_STR);
    $edit_user -> bindParam(':contato', $dados['contato'], PDO::PARAM_INT);
    $edit_user -> bindParam(':expo', $dados['expo'], PDO::PARAM_STR);
    $edit_user -> bindParam(':interesses', $dados['interesses'], PDO::PARAM_STR);
    $edit_user -> bindParam(':id', $dados['id'], PDO::PARAM_INT); 

    $edit_user -> execute();

    if($edit_user -> rowCount()){
        $response = [
            "erro" => False,
            "mensagem" => "Usuario editado com sucesso!"
        ];
    }else{
        $response = [
            "erro" => True,
            "mensagem" => "Usuario não editado com sucesso!"
        ];
    }
}else{
    $response = [
        "erro" => True,
        "mensagem" => "Usuário não editado com sucesso!"
    ];
} 
http_response_code(200);
echo json_encode($response);