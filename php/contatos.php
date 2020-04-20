<?php  

    include_once './connect.php';

    $usuario_session = 1;
    
    function getAllContatos(){
        try{
            $pdo = getConnect();
            $query = $pdo->query(' SELECT * FROM conversa INNER JOIN usuario ON (conversa.id_contato = usuario.id) inner join msg on (msg.cod_conversa = conversa.cod_conversa) 
            WHERE conversa.id_usuario = 1 and msg.horario = (select max(msg.horario) from msg where msg.cod_conversa = conversa.cod_conversa);');
            
            $contatos = array();

            while ($line = $query->fetch(PDO::FETCH_ASSOC)) {
                $contatos[] = $line;
                

            }
            echo json_encode($contatos, JSON_FORCE_OBJECT);
            $pdo = null;
        } catch(PDOException $e) {
            echo 'Error: ' . $e->getMessage();
        }
    }   

    switch ($_SERVER['REQUEST_METHOD']){
        case 'GET' :
            getAllContatos();
            break;
    }
?>