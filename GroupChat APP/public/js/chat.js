const sendBtn = document.getElementById('send-button') ;  
var chatContainer = document.getElementById('chat-container');        
var groupContainer = document.getElementById('group-container');
const createButton = document.getElementById('create-button'); 
const token = localStorage.getItem('token');

    document.addEventListener('DOMContentLoaded', async() => {


        displayUserGroups();
        // setInterval(async () => {
            const oldMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        
        
            const lastMessageId = oldMessages.length > 0 ? oldMessages[oldMessages.length - 1].id : 0;
        
            try {
                
                const response = await axios.get(`/message/getMessages?lastMessageId=${lastMessageId}`);
                const newMessages = response.data.messages;
        
                const mergedMessages = [...oldMessages, ...newMessages];
        
                localStorage.setItem('chatMessages', JSON.stringify(mergedMessages));
        
                displayTextMessage(mergedMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        //  } , 1000) 
     
       
    });
    
    const displayUserGroups = async () => {
        try {
            const response = await axios.get('/group/getUserGroups' ,{headers: {"Authorization" : token}}); // Assuming the API endpoint is /api/groups

            const userGroups = response.data.userGroups;

            // Clear existing groups
            groupContainer.innerHTML = '';

            // Display user groups
            if(userGroups){
                userGroups.forEach((group) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = group.name;
                    groupContainer.appendChild(listItem);
    
                    // Add a click event listener to each group item to fetch and display group messages
                    listItem.addEventListener('click', () => {
                        // Call a function to fetch and display group messages
                        fetchAndDisplayGroupMessages(group.id);
                    });
                });
            }
   
        } catch (error) {
            console.error('Error fetching user groups:', error);
        }
    };
    

    const createNewGroup = async () => {
        try {
            const groupName = prompt('Enter the group name:');

            if (groupName) {
                // Make a POST request to create a new group
                await axios.post('/group/createGroup', { groupName } , {headers: {"Authorization" : token}});

                // Display updated user groups
                displayUserGroups();
            }
        } catch (error) {
            console.error('Error creating a new group:', error);
        }
    };

    createButton.addEventListener('click', createNewGroup);

async function sendMessage() {
    try{
        var messageInput = document.getElementById('message-input');

        var message = messageInput.value;
        
        await axios.post('/message/postMessage' ,{text:message}, {headers: {"Authorization" : token}});
        
        
        messageInput.value = '';
    
    }catch(err){
        console.log(err);
    }

}

sendBtn.addEventListener('click' , sendMessage);

async function displayTextMessage(messages){
    try{
        chatContainer.innerHTML = '';
        messages.forEach((item) => {
            var listItem = document.createElement('li');
            listItem.textContent = `${item.User.name}-${item.text}`;
            chatContainer.appendChild(listItem);
            listItem.scrollIntoView();
        });
    }catch(err){
        console.error('Error fetching users:', err);
    }
    
}