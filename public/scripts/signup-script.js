var nomeField = document.getElementById('name');
var emailField = document.getElementById('email');
var passwordField = document.getElementById('password');
var form = document.getElementById('formSignUp');

form.addEventListener('submit', function(e){
  e.preventDefault();

  let nome = nomeField.value;
  let email = emailField.value;
  let password = passwordField.value;

  fetch('/cadastrar',{
    method: 'POST',
    body: JSON.stringify({
      nome,email,password
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(data => {
    if(data.status !== 200 && data.status !== 201){
      throw new Error();
    }
    iziToast.success({
        title: 'Sucesso',
        message: 'Usuário criado com sucesso!',
        position: 'bottomLeft'
    });

    setTimeout(() => {
      if(data.redirected){
          window.location.replace(data.url);
      }
    },2000)
  })
  .catch(error => {
    iziToast.error({
        title: 'Erro',
        message: 'Erro ao cadastrar usuário, tentar novamente!',
        position: 'bottomLeft'
    });
    cleanFields();
  })
})

nomeField.addEventListener('input',function(){
  let nome = nomeField.value.toString();
  if(nome.length === 0){
    nameField.classList.remove('invalid');
    nameField.classList.remove('valid');
    return;
  }
  validateField(nome.length <= 3,nomeField);
})

emailField.addEventListener('input',function(){
  var re = /\S+@\S+\.\S+/;
  let email = emailField.value.toString();
  if(email.length === 0){
    emailField.classList.remove('invalid');
    emailField.classList.remove('valid');
    return;
  }
  validateField(!re.test(email),emailField)
})

passwordField.addEventListener('input', function(){
  let password = passwordField.value.toString();
  if(password.length === 0){
    passwordField.classList.remove('invalid');
    passwordField.classList.remove('valid');
    return;
  }

  validateField(password.length <= 5, passwordField);
},false);


function cleanFields(){
  resetStateField(nomeField);
   resetStateField(emailField);
   resetStateField(passwordField);
}
