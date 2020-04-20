<?php

    
    function getConnect(){
        try {
            $username = 'root';
            $password = '';
            $pdo = new PDO('mysql:host=localhost;dbname=chat_app', $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch(PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return null;
        }
    }

?>