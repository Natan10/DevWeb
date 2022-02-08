let nomeField = document.getElementById("nome");
let emailField = document.getElementById("email");
let passwordField = document.getElementById("password");
let idField = document.querySelector("#id");
let form = document.getElementById("formEditUser");
var isAdminField = document.getElementById("isAdmin");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let nome = nomeField.value;
  let email = emailField.value;
  let password = passwordField.value;
  let id = idField.value;
  let isAdminValue = isAdminField.checked;

  console.log(isAdminField);

  console.log(nome, email, password, id, isAdminValue);

  fetch("/user", {
    method: "PATCH",
    body: JSON.stringify({
      nome,
      email,
      password,
      id,
      isAdminValue,
    }),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((data) => {
      if (data.status !== 200 && data.status !== 204) {
        throw new Error();
      }
      iziToast.success({
        title: "Sucesso",
        message: "Dados atualizados com sucesso!",
        position: "bottomLeft",
      });
    })
    .catch((error) => {
      iziToast.error({
        title: "Erro",
        message: "Erro ao atualizar dados!",
        position: "bottomLeft",
      });
    });
});
