
const loginForm = document.getElementById('loginForm');


async function login(e) {
    e.preventDefault();
    try{
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const loginDetails = {
        email: email,
        password: password
    };

    const response = await axios.post('http://localhost:3000/user/login', loginDetails)
        localStorage.setItem('token' , response.data.token)
        window.location.href = '/chat_page';

    }catch(err){
        displayMessage('login-error-container' , err.response.data.message , false)
    }
            
}

loginForm.addEventListener('submit' , login);



function displayMessage(containerId, message , success) {
    console.log(containerId)
    const errorContainer = document.getElementById(containerId);
    errorContainer.innerHTML='';
    const alertElement = document.createElement('div');
    if(success){
        alertElement.className ='alert alert-success alert-dismissible fade show';
    }else{
        alertElement.className = 'alert alert-danger alert-dismissible fade show';
    }
    
    alertElement.setAttribute('role', 'alert');
   
    alertElement.innerHTML = `
    <strong>${success ? 'Success:' : 'Error:' }</strong> ${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
`;

    
    
    errorContainer.appendChild(alertElement);
  
  }