const sendBtn = document.getElementById('send-button') ;  
        
document.addEventListener('DOMContentLoaded', function() {
    // Fetch users using Axios when the DOM has loaded
    
    setInterval(async () => {
           displayTextMessage()
        } , 1000)     
});

async function sendMessage() {
    try{
        var messageInput = document.getElementById('message-input');
        
        const token = localStorage.getItem('token');

        var message = messageInput.value;
        
        await axios.post('/message/postMessage' ,{text:message}, {headers: {"Authorization" : token}});
        
        displayTextMessage();
        
        messageInput.value = '';
    
    }catch(err){
        console.log(err);
    }

}

sendBtn.addEventListener('click' , sendMessage);

async function displayTextMessage(){
    try{
        const response = await axios.get('/message/getMessages')
        var chatContainer = document.getElementById('chat-container');
        chatContainer.innerHTML = '';
        response.data.messages.forEach((item) => {
            var listItem = document.createElement('li');
            listItem.textContent = `${item.User.name}-${item.text}`;
            chatContainer.appendChild(listItem);
            listItem.scrollIntoView();
        });
    }catch(err){
        console.error('Error fetching users:', err);
    }
    
}