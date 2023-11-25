<?php

//Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Acess-Control-Allow-Methods: GET,PUT,POST,DELETE");

// Incluindo a conexao
include_once 'conexao.php';

$query_vcard = "SELECT id, titulo, descritivo, categoria, urls, link_vcard, data, registros, visualizacoes, fk_expositores_id FROM vcard ORDER BY id DESC";
$result_vcard = $conexao -> prepare($query_vcard);
$result_vcard -> execute();

if(($result_vcard) AND ($result_vcard -> rowCount()!= 0)){

    $arrvcard = [];

    while($row_vcard = $result_vcard -> fetch(PDO::FETCH_ASSOC)){
        extract($row_vcard);

        $lista_vcards = [
            'id' => $id,
            'titulo' => $titulo,
            'descritivo' => $descritivo,
            'categoria' => $categoria,
            'urls' => $urls,
            'link_vcard' => $link_vcard,
            'data' => $data,
            'registros' => $registros,
            'visualizacoes' => $visualizacoes,
            'fk_expositores_id' => $fk_expositores_id
        ];

        array_push($arrvcard, $lista_vcards);
    }

    //Resposta com status 200
    http_response_code(200);

    //Retornar os eventos em formato json
    echo json_encode($arrvcard);
}