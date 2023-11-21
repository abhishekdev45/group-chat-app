const sendBtn = document.getElementById('send-button') ;  
        
document.addEventListener('DOMContentLoaded', function() {
    // Fetch users using Axios when the DOM has loaded
    axios.get('/user/getUsers')
        .then(function(response) {
            
            var chatContainer = document.getElementById('chat-container');
            response.data.forEach(function(user) {
                var listItem = document.createElement('li');
                listItem.textContent = user.name + 'joined'; 
                chatContainer.appendChild(listItem);
            });
        })
        .catch(function(error) {
            console.error('Error fetching users:', error);
        });
});

function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var chatContainer = document.getElementById('chat-container');

    var message = messageInput.value;

    var listItem = document.createElement('li');
    listItem.textContent = message;

    chatContainer.appendChild(listItem);

    messageInput.value = '';

    listItem.scrollIntoView();
}

sendBtn.addEventListener('click' , sendMessage);