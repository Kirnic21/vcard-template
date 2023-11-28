<?php

//Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Acess-Control-Allow-Methods: GET,PUT,POST,DELETE");

// Incluindo a conexao
include_once 'conexao2.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados){

    $query_vcard = "INSERT INTO vcard (id, titulo, descritivo, categoria, urls, link_vcard, data, fk_usuarios_id, fk_evento_id) VALUES (:id, :titulo, :descritivo, :categoria, :urls, :link_vcard, :data, :fk_usuarios_id, :fk_evento_id)";
    $cad_vcard = $conexao -> prepare($query_vcard);
    
    $cad_vcard->bindParam(':id', $dados['vcard']['id'],PDO::PARAM_INT);
    $cad_vcard->bindParam(':titulo', $dados['vcard']['titulo'],PDO::PARAM_STR);
    $cad_vcard->bindParam(':descritivo', $dados['vcard']['descritivo'],PDO::PARAM_STR);
    $cad_vcard->bindParam(':categoria', $dados['vcard']['categoria'],PDO::PARAM_STR);
    $cad_vcard->bindParam(':urls', $dados['vcard']['urls'],PDO::PARAM_STR);
    $cad_vcard->bindParam(':link_vcard', $dados['vcard']['link_vcard'], PDO::PARAM_STR);
    $cad_vcard->bindParam(':data', $dados['vcard']['data']);
    $cad_vcard->bindParam(':fk_usuarios_id', $dados['vcard']['fk_usuarios_id'],PDO::PARAM_INT);
    $cad_vcard->bindParam(':fk_evento_id', $dados['vcard']['fk_evento_id'],PDO::PARAM_INT);
   
    

    $cad_vcard -> execute();

    if($cad_vcard -> rowCount()){
        $response = [
            "erro" => false,
            "messagem" => "VCard cadastrado com sucesso"
        ];
    }else{
        $response = [
            "erro" => true,
            "messagem" => "VCard não cadastrado com sucesso"
        ];
    }
}else{
    $response = [
        "erro" => true,
        "messagem" => "VCard não cadastrado com sucesso!!!!!!"
    ];
}

http_response_code(200);
echo json_encode($response);