<?php

//Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Acess-Control-Allow-Methods: GET,PUT,POST,DELETE");

// Incluindo a conexao
include_once 'conexao.php';

$query_adm = "SELECT id, nome, sobrenome, email, senha FROM administradores ORDER BY id DESC";
$result_adm = $conexao -> prepare($query_adm);
$result_adm -> execute();

if(($result_adm) AND ($result_adm -> rowCount()!= 0)){

    $arrAdm = [];

    while($row_adm = $result_adm -> fetch(PDO::FETCH_ASSOC)){
        extract($row_adm);

        $lista_adms = [
            'id' => $id,
            'nome' => $nome,
            'sobrenome' => $sobrenome,
            'email' => $email,
            'senha' => $senha
        ];

        array_push($arrAdm, $lista_adms);
    }

    //Resposta com status 200
    http_response_code(200);

    //Retornar os eventos em formato json
    echo json_encode($arrAdm);
}