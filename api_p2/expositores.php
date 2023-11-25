<?php

//Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
header("Acess-Control-Allow-Methods: GET,PUT,POST,DELETE");

// Incluindo a conexao
include_once 'conexao.php';

$query_exp = "SELECT id, nome, email, senha, tema, contato, data FROM expositores ORDER BY id DESC";
$result_exp = $conexao -> prepare($query_exp);
$result_exp -> execute();

if(($result_exp) AND ($result_exp -> rowCount()!= 0)){

    $arrExp = [];

    while($row_exp = $result_exp -> fetch(PDO::FETCH_ASSOC)){
        extract($row_exp);

        $lista_exps = [
            'id' => $id,
            'nome' => $nome,
            'email' => $email,
            'senha' => $senha,
            'tema' => $tema,
            'contato' => $contato,
            'data' => $data
        ];

        array_push($arrExp, $lista_exps);
    }

    //Resposta com status 200
    http_response_code(200);

    //Retornar os eventos em formato json
    echo json_encode($arrExp);
}