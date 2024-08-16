const socket = io()
let username;
let textarea = document.getElementById('textarea');
let msgArea = document.querySelector('.msg-area');
do {
    username = prompt('Please enter your name');
} while (!username)
    
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})

const sendMessage = (message) => {
    let msg = {
        user: username,
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } 
    //append
    appendMessage(msg, 'outgoing');
    textarea.value = "";
    //send to server
    socket.emit('message', msg);

}

const appendMessage = (msg, type)=>{
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message')
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        <span class="timestamp">${msg.time}</span>
    `
    mainDiv.innerHTML = markup;
    msgArea.appendChild(mainDiv);
    scrollToBottom();
}

//Recieve message

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom();
})

function scrollToBottom() {
    msgArea.scrollTop = msgArea.scrollHeight;
}
