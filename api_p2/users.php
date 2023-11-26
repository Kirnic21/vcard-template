<?php

//Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
header("Acess-Control-Allow-Methods: GET,PUT,POST,DELETE");

// Incluindo a conexao
include_once 'conexao2.php';

$query_user = "SELECT id, nome, sobrenome, email, senha, contato, expo, interesses, data, permissao FROM usuarios ORDER BY id DESC";
$result_user = $conexao -> prepare($query_user);
$result_user -> execute();

if(($result_user) AND ($result_user -> rowCount()!= 0)){

    $arruser = [];

    while($row_user = $result_user -> fetch(PDO::FETCH_ASSOC)){
        extract($row_user);

        $lista_users = [
            'id' => $id,
            'nome' => $nome,
            'sobrenome' => $sobrenome,
            'email' => $email,
             'senha' => $senha, 
            'contato' => $contato,
            'expo' => $expo,
            'interesses' => $interesses,
            'data' => $data,
            'permissao' => $permissao,
        ];

        array_push($arruser, $lista_users);
    }

    //Resposta com status 200
    http_response_code(200);

    //Retornar os eventos em formato json
    echo json_encode($arruser);
}