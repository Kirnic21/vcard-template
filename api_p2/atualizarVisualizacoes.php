<?php

//Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Acess-Control-Allow-Methods: GET,PUT,POST,DELETE");

// Incluindo a conexao
include_once 'conexao2.php';

if(isset($_GET['id'])){
    $idVcard = $_GET['id'];

    $query_views = "UPDATE vcard SET visualizacoes = visualizacoes + 1 WHERE id = $idVcard";

    if ($conexao->query($query_views) === TRUE) {
        echo "Visualizações incrementadas para o vCard com ID $idVcard";
    } else {
        echo "Erro ao atualizar visualizações: ";
    }
} else {
    echo "ID do vCard não fornecido";
}
