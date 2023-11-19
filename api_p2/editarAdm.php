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

    $query_adm = "UPDATE administradores SET nome = :nome, sobrenome = :sobrenome, email = :email, senha = :senha WHERE id = :id";
    $edit_adm = $conexao -> prepare($query_adm);

    $edit_adm -> bindParam(':nome', $dados['nome'], PDO::PARAM_STR); 
    $edit_adm -> bindParam(':sobrenome', $dados['sobrenome'], PDO::PARAM_STR); 
    $edit_adm -> bindParam(':email', $dados['email'], PDO::PARAM_STR);
    $edit_adm -> bindParam(':senha', $dados['senha'], PDO::PARAM_STR);
    $edit_adm -> bindParam(':id', $dados['id'], PDO::PARAM_INT); 

    $edit_adm -> execute();

    if($edit_adm -> rowCount()){
        $response = [
            "erro" => False,
            "mensagem" => "Administrador editado com sucesso!"
        ];
    }else{
        $response = [
            "erro" => True,
            "mensagem" => "Administrador não editado com sucesso!"
        ];
    }
}else{
    $response = [
        "erro" => True,
        "mensagem" => "Administrador não editado com sucesso!"
    ];
} 
http_response_code(200);
echo json_encode($response);