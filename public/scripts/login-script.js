var emailField = document.getElementById('email');
var passwordField = document.getElementById('password');
var formLogin = document.getElementById('formLogin');

formLogin.addEventListener('submit', function(e){
  e.preventDefault();

  let email = emailField.value;
  let password = passwordField.value;
  
  fetch('/entrar',{
    method: 'POST',
    body: JSON.stringify({
      email,password
    }),
    headers: {
      'content-type': 'application/json'
    }
  }).then(data => {
    if(data.status !== 200 && data.status !== 201){
      throw new Error();
    }
    iziToast.success({
        title: 'Sucesso',
        message: 'Usuário logado com sucesso!',
        position: 'bottomLeft'
    });
    window.location.replace(data.url);
  }).catch(error => {
    iziToast.error({
        title: 'Erro',
        message: 'Erro ao logar, tente novamente!',
        position: 'bottomLeft'
    });
    cleanFields();
  })
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
});

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