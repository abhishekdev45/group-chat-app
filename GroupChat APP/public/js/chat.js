const sendBtn = document.getElementById('send-button') ;  
        
document.addEventListener('DOMContentLoaded', async function() {
    // Fetch users using Axios when the DOM has loaded
    try{
       const response = await axios.get('/message/getMessages')
       response.data.messages.forEach((item) => {
        console.log(item)
        displayTextMessage(item);
      });
    }catch(err){
        console.error('Error fetching users:', err);
    }



});

async function sendMessage() {
    try{
        var messageInput = document.getElementById('message-input');
        
        const token = localStorage.getItem('token');

        var message = messageInput.value;
        
        const response = await axios.post('/message/postMessage' ,{text:message}, {headers: {"Authorization" : token}});
        
        displayTextMessage({text:response.data.message.text, User : {name:response.data.name.name}});
        
        messageInput.value = '';
    
    }catch(err){
        console.log(err);
    }

}

sendBtn.addEventListener('click' , sendMessage);

function displayTextMessage(message){
    var chatContainer = document.getElementById('chat-container');
    var listItem = document.createElement('li');
    listItem.textContent = `${message.User.name}-${message.text}`;
    chatContainer.appendChild(listItem);
    listItem.scrollIntoView();
}