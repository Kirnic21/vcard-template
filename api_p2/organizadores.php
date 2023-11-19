<?php

//Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Acess-Control-Allow-Methods: GET,PUT,POST,DELETE");

// Incluindo a conexao
include_once 'conexao.php';

$query_org = "SELECT id, nome, sobrenome, email, senha, fk_administradores_id FROM organizadores ORDER BY id DESC";
$result_org = $conexao -> prepare($query_org);
$result_org -> execute();

if(($result_org) AND ($result_org -> rowCount()!= 0)){

    $arrOrg = [];

    while($row_org = $result_org -> fetch(PDO::FETCH_ASSOC)){
        extract($row_org);

        $lista_orgs = [
            'id' => $id,
            'nome' => $nome,
            'sobrenome' => $sobrenome,
            'email' => $email,
            'senha' => $senha,
            'fk_administradores_id' => $fk_administradores_id
        ];

        array_push($arrOrg, $lista_orgs);
    }

    //Resposta com status 200
    http_response_code(200);

    //Retornar os eventos em formato json
    echo json_encode($arrOrg);
}