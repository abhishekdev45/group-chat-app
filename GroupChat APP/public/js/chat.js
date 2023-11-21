const sendBtn = document.getElementById('send-button') ;  
        
  


    document.addEventListener('DOMContentLoaded', () => {

        setInterval(async () => {
            const oldMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        
        
            const lastMessageId = oldMessages.length > 0 ? oldMessages[oldMessages.length - 1].id : 0;
        
            try {
                
                const response = await axios.get(`/message/getMessages?lastMessageid=${lastMessageId}`);
                const newMessages = response.data;
        
               
                const mergedMessages = [...oldMessages, ...newMessages];
        
            
                localStorage.setItem('chatMessages', JSON.stringify(mergedMessages));
        
                displayTextMessage(mergedMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
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