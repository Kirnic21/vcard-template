<?php

//Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Incluindo a conexao
include_once 'conexao.php';

 $query_eventos = "SELECT id, chave_convite, nome_do_evento, data, informacoes, local FROM evento ORDER BY id DESC";
 $result_eventos = $conexao -> prepare($query_eventos);
 $result_eventos -> execute();

 if(($result_eventos) AND ($result_eventos -> rowCount() != 0)){
    while($row_eventos = $result_eventos -> fetch(PDO::FETCH_ASSOC)){
        extract($row_eventos);
        
            $lista_eventos["records"][$id] = [
            'id' => $id,
            'chave_convite' => $chave_convite,
            'nome_do_evento' => $nome_do_evento,
            'data' => $data,
            'informacoes' => $informacoes,
            'local' => $local,
        ];
    } 

    //Responta com status 200
     http_response_code(200);

    //Retornar os eventos em formato json
    echo json_encode($lista_eventos); 
 }
 