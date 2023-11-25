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

    $query_vcard = "UPDATE vcard SET titulo = :titulo, descritivo = :descritivo, categoria = :categoria, urls = :urls, data = :data WHERE id = :id";
    $edit_vcard = $conexao -> prepare($query_vcard);

    $edit_vcard -> bindParam(':titulo', $dados['titulo'], PDO::PARAM_STR); 
    $edit_vcard -> bindParam(':descritivo', $dados['descritivo'], PDO::PARAM_STR); 
    $edit_vcard -> bindParam(':categoria', $dados['categoria'], PDO::PARAM_STR);
    $edit_vcard -> bindParam(':urls', $dados['urls'], PDO::PARAM_STR);
    $edit_vcard -> bindParam(':data', $dados['data']);
    $edit_vcard -> bindParam(':id', $dados['id'], PDO::PARAM_INT); 

    $edit_vcard -> execute();

    if($edit_vcard -> rowCount()){
        $response = [
            "erro" => False,
            "mensagem" => "Vcard editado com sucesso!"
        ];
    }else{
        $response = [
            "erro" => True,
            "mensagem" => "Vcard não editado com sucesso!"
        ];
    }
}else{
    $response = [
        "erro" => True,
        "mensagem" => "Vcard não editado com sucesso!"
    ];
} 
http_response_code(200);
echo json_encode($response);