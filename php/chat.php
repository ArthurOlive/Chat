<?php 
    include_once './connect.php';
    
    $usuario_session = 1;
    

    function saveMsg(){

        try{
            $pdo = getConnect();
            $stmt = $pdo->prepare('INSERT INTO msg ( mensagem, cod_conversa) VALUES (:msg, :cod_conversa) ');
            $stmt->execute(array(
                ':msg' => $_POST['msg'],
                ':cod_conversa' => $_POST['cod_conversa']
            ));
            
            echo $stmt->rowCount();
            $pdo = null;
        } catch(PDOException $e) {
            echo 'Error: ' . $e->getMessage();
        }
    }

    function getAllMsg(){
        try{

            $pdo = getConnect();
            $query = $pdo->query("SELECT * FROM msg INNER JOIN conversa ON ( conversa.cod_conversa = msg.cod_conversa) WHERE conversa.id_usuario = {$_GET['user_session']} and conversa.cod_conversa = {$_GET['cod_conversa']};");
            
            $data = array();

            while ($line = $query->fetch(PDO::FETCH_ASSOC)) {
                $data[] = $line;
                

            }
            echo json_encode($data, JSON_FORCE_OBJECT);
            $pdo = null;
        } catch(PDOException $e) {
            echo 'Error: ' . $e->getMessage();
        }
    }

    switch ($_SERVER['REQUEST_METHOD']){
        case 'POST':     
            saveMsg();
            break;
        case 'GET' :
            getAllMsg();
            break;
    }

?>
