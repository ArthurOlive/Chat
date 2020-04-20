var mensagens = []; //conterá varios objetos do tipo Msg
var contatos = [];
var conversa_set = null;
var user_id = 1;

function sendMsgAjax(msg){
    event.preventDefault();
    
    var formData = new FormData(); 
    formData.append('msg', msg);
    formData.append('cod_conversa', conversa_set.getCodConversa());

    var ajax = new XMLHttpRequest();
    
    ajax.open("POST", "php/chat.php", true);
    ajax.send(formData);

    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4 && ajax.status == 200){
            
            console.log(ajax.response);
        }
    }
}

class Msg{
    constructor(cod_msg, msg, horario, cod_conversa, id_usuario){
        this.cod_msg = cod_msg;
        this.msg = msg;
        this.hotario = horario;
        this.cod_conversa = cod_conversa;
        this.id_usuario = id_usuario;
    }

    getCodMsg(){
        return this.cod_msg;
    }

    getMsg(){
        return this.msg;
    }

    getDate(){
        return this.date
    }

    getHorario(){
        return this.horario;
    }

    getIdUsuario(){
        return this.id_usuario;
    }
}

class contato{
    constructor(cod_conversa, id_contato, nome, last_mensagem, horario){
        this.cod_conversa = cod_conversa;
        this.id_contato = id_contato;
        this.nome = nome;
        this.lastMensagem = last_mensagem;
        this.horario = horario;
        this.mensagens = [];
        this.qtdMsg = this.mensagens.length;
        this.render()
    }

    getMensagensBd(){
        event.preventDefault();
        var data;
    
        var ajax = new XMLHttpRequest();

        var mensagens = this.getMensagens()
        
        var formData = new FormData(); 
        formData.append("cod_conversa", this.cod_conversa);
        formData.append("user_session", user_id);
    
        ajax.open("GET", "php/chat.php?cod_conversa=" + this.cod_conversa + "&user_session=" + user_id, true);
        ajax.send();
    
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                
                var jsonResponser = ajax.response;
                
                data = JSON.parse(jsonResponser);
                //console.log(jsonResponser);
                //console.log(JSON.parse(jsonResponser));
    
                let count = Object.keys(data).length ;

                let empyt = 0;
                let container = document.getElementById("history_msg");
                if (container == null){
                    empyt = 1;
                }

                for (let i = 0; i < count; i++){
                    if (mensagens.find(msg => msg.cod_msg === data[i]['cod_msg'])){
                        if (empyt){
                            createElementMsg(data[i]['mensagem'], data[i]['horario'], data[i]['id_usuario']);
                        }                      
                    } else {
                        mensagens.push(new Msg(data[i]['cod_msg'], data[i]['mensagem'], data[i]['horario'], data[i]['cod_conversa'], data[i]['id_usuario']));
                        createElementMsg(data[i]['mensagem'], data[i]['horario'], data[i]['id_usuario']);
                    }
                }
            }
        }
        this.setMensagens(mensagens);
    
        console.log(mensagens);
        listarMsgs();
    }

    render(){
        createElementContato( this );
    }

    getCodConversa(){
        return this.cod_conversa;
    }

    getNome(){
        return this.nome;
    }

    setNome(nome){
        this.nome = nome;
    }

    getLastMensagem(){
        return this.lastMensagem;
    }

    setLastMensagem(last_mensagem){
        this.lastMensagem = last_Mensagem;
    }

    getMensagens(){
        return this.mensagens;
    }

    setMensagens(mensagens){
        this.mensagens = mensagens;
    }

    getHorario(){
        return this.horario;
    }

    setHorario(horario){
        this.horario = horario;
    }

    getQtdMsg(){
        return this.qtdMsg;
    }

    setQtdMsg(qtdMsg){
        this.qtdMsg = qtdMsg;
    }


}


function listarMsgs(){
    for(i = 0; i < mensagens.length; i ++){
        console.log(mensagens[i].msg + " - " + mensagens[i].date + "\n");
    }
}


function createMsg() {

    //manipulados:
    let inputText = document.getElementById("input");

    //implementar o ajax para enviar a parte da mensagem para o servidor.
    //let ajax = XMLHttpRequest();
    //ajax.open("POST", "");
    //ajax.send();

    now = new Date; //cria a data
    if (inputText.value != ""){
        let text = inputText.value;
        createElementMsg(text,  now.getHours() + ":" + now.getMinutes(), user_id);
        sendMsgAjax(inputText.value);
    } else {
        alert("Campo vazio");
    }
    inputText.value = ""
    listarMsgs();
}

async function recarregar(){
    //Aqui contera o inicio do char.
    event.preventDefault(); 
    var data;

    let ajax = new XMLHttpRequest();
    
    ajax.open("GET", "php/chat.php", true);
    
    ajax.send();

    ajax.onreadystatechange = await function(){
        if(ajax.readyState == 4 && ajax.status == 200){
            
            var jsonResponser = ajax.response;
            
            data = JSON.parse(jsonResponser);
            console.log(data);
            //console.log(jsonResponser);
            //console.log(JSON.parse(jsonResponser));



            let count = Object.keys(data).length ;
            console.log(count);

            for (let i = 0; i < count; i++){
                if (data[i]['mensagem'] != mensagens[i].getMsg() && data[i]['mensagem'] != mensagens[i].getDate()){
                    createElementMsg(data[i]['mensagem'], data[i]['horario'], "User", data[i]['id_usuario']);
                }
            }
        }
    }

    console.log(mensagens);
    listarMsgs();
}

function carregarContatos(){
    event.preventDefault(); 
    let ajax = new XMLHttpRequest();

    ajax.open("GET", "php/contatos.php", true);
    ajax.send();
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4 && ajax.status == 200){
            console.log(ajax);
            var jsonResponser = ajax.response;
            console.log(jsonResponser);

            data = JSON.parse(jsonResponser);
            console.log(data);
            
            let count = Object.keys(data).length ;
            for (let i = 0; i < count; i++){
                if (contatos.find(element => element.cod_conversa === data[i]['cod_conversa'])){
                    console.log("Ja está carregado o contato!!!");
                } else {
                    //Instancia o contato na lista de contato.
                    console.log(data[i]['login']);
                    contatos.push(new contato(data[i]['cod_conversa'], data[i]['id_contato'], data[i]['login'], data[i]['mensagem'],  data[i]['horario'].split(' ')[1]));
                }
                
            }
        }
    }
}

function createElementContato(contato_class){
    let contatos = document.getElementsByClassName('contatos-list');
    let contato = document.createElement("div");
    let contato_img = document.createElement("div");
    let img = document.createElement("img");
    let contato_att = document.createElement("div");
    let name_user = document.createElement("p");
    //conterá a ultima mensagem e a data 
    let list_msg_user = document.createElement("p");
    let date_msg_user = document.createElement("span");
    //
    let qtd_msg = document.createElement("div");
    let badge = document.createElement("span");
    
    let nome_usr = document.createTextNode(contato_class.getNome());
    let last_msg = document.createTextNode(contato_class.getLastMensagem());
    let date_msg = document.createTextNode(contato_class.getHorario());
    let qtd_msgs  = document.createTextNode(contato_class.getQtdMsg());

    badge.appendChild(qtd_msgs);
    qtd_msg.appendChild(badge);
    date_msg_user.appendChild(date_msg);
    list_msg_user.appendChild(last_msg);
    list_msg_user.appendChild(date_msg_user);
    name_user.appendChild(nome_usr);
    contato_att.appendChild(name_user);
    contato_att.appendChild(list_msg_user);
    contato_img.appendChild(img);
    
    img.src = "icons/default_img_user_dark.png";
    img.id = "img_user";
    badge.className = "badge badge-dark badge-pill";
    list_msg_user.className = "list_msg_user";
    date_msg_user.className = "date_msg_user";
    name_user.id = "name_user";
    contato_att.className = "contato-att";
    contato_img.className = "contato-img";
    contato.className = "contato";
    contato.id = contato_class.getCodConversa();
    contato.addEventListener('click', function(){
        contato_class.getMensagensBd();
        var contatos = document.getElementsByClassName("contato");
        document.getElementById("contato-username").innerHTML = contato_class.getNome();
        document.getElementById("barra_input").style.display = "";
        document.getElementById("header_chat").style.display = "";
        document.getElementById("input_block").style.background = "#E0E0E0";
        conversa_set = contato_class;

        for (var i = 0; i < contatos.length; i++) {
            var current = document.getElementsByClassName("active");
            if (current[0]){
                if (current[0].id != contato.id){
                    clearChat();
                } 
                current[0].className = current[0].className.replace(" active", "");
            }
            this.className += " active";
        }

    });

    contato.appendChild(contato_img);
    contato.appendChild(contato_att);
    contato.appendChild(qtd_msg);

    contatos[0].appendChild(contato);
}


function clearChat(){
    let container = document.getElementById("history_msg");

    if ( container != null ) {
        container.parentNode.removeChild(container);
    }
}

function createElementMsg(text, date, type){
        //recebe um node de mensagem e monta uma mensagem no historico
        let marcador = document.getElementsByClassName("marcador");
        let container = document.getElementById("history_msg");
        if (container == null){
            container = document.createElement("div");
            container.id = 'history_msg';
            container.className = "container mb-auto";
            marcador[0].appendChild(container);
        }
    
        //criação de elementos
        let msg         = document.createElement("div");
        let lineText    = document.createElement("div");
        let text_msg    = document.createElement("p");
        let date_msg    = document.createElement("span");
        let node        = document.createTextNode(text);
        let dateLine    = document.createElement("div");
        let date_now    = document.createTextNode(date);
        date_msg.appendChild(date_now);
    
        //set containers
        text_msg.appendChild(node);
        msg.appendChild(text_msg);
        lineText.appendChild(msg);
        dateLine.appendChild(date_msg);
        
        if(type == user_id){
            lineText.className = "row justify-content-end";
            dateLine.className = "row justify-content-end";
            msg.id = "msg";
        } else {
            lineText.className = "row justify-content-start";
            dateLine.className = "row justify-content-start";
            msg.id = "msg_user";
        }
        
        msg.className = "col-auto";
        date.className = "col-auto";

        //set ids para estilo
        text_msg.id = "text_msg";

        container.appendChild(lineText);
        container.appendChild(dateLine);
}
