<?php

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "vcard";
$port = "3306";

$conexao = new PDO("mysql:host=$host;port=$port;dbname=".$dbname, $user, $pass);

