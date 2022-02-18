const socket = io();

let Myname;

let textArea = document.querySelector('#textarea');
let message__area = document.querySelector('.message__area');

do{
     Myname =  prompt("please enter your name")
}while(!Myname)

textArea.addEventListener('keyup' , (e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
    
})

function sendMessage(message){
    
    let msg = {
        user : Myname ,
        message : message.trim()
    }
    // Append
    appendMessage(msg , 'outgoing');
    textArea.value = '';
    scrollToBottom();

    //SEND TO SERVER

    socket.emit('message' , msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div');
    let className = type ;

    mainDiv.classList.add(className , 'message') ;

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>`

        mainDiv.innerHTML = markup;
        message__area.appendChild(mainDiv);

}

function scrollToBottom(){
    message__area.scrollTop = message__area.scrollHeight;
}

//Recieve messages from server

socket.on('message' , (msg)=>{
    appendMessage(msg, 'incoming');
    scrollToBottom();
})