function validateField(condition,field){
  if(condition){
    field.classList.add('invalid');
    field.classList.remove('valid');
  }else{
    field.classList.remove('invalid');
    field.classList.add('valid');
  }
}

function resetStateField(field){
  field.value = '';
  field.classList.remove('invalid');
  field.classList.remove('valid');
}