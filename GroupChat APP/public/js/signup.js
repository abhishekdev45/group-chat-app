const signUpForm = document.getElementById('signupForm');

async function signup(e) {
    e.preventDefault();
    try{
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        console.log(phone)
    
        const userData = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };
    
        const response = await axios.post('http://localhost:3000/user/sign-up', userData);
        if(response.status === 201){
            displayMessage('signup-error-container' , response.data.message , true)
        }
        
    }catch(err){
        console.log(err);
        displayMessage('signup-error-container', err.response.data.message, false);
        
    }
}

signUpForm.addEventListener('submit' , signup);



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