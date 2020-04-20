function sendMsgAjax(msg){
    event.preventDefault();
    
    var formData = new FormData(); 
    formData.append('msg', msg);

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4 && ajax.status == 200){
            
            alert(ajax.responseText);
            
        }
    }
    
    ajax.open("POST", "php/chat.php", true);
    ajax.send(formData);
}

function sendMsgAjax(){
    $.ajax({
        url:"../php/chat.php",
        type:"POST",
        data: msg,
        contentType: "application/json",
        success:(response) => {
            if(response.redirect)
                window.location.href = response.redirect;
        },
        error:()=>{
            alert("Alguma coisa saiu errado");
        }
    })                      
}

export default { ajaxRequisicao, sendMsgAjax };