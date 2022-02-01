const nameField = document.querySelector("#name");
const priceField = document.querySelector("#price");
const linkField = document.querySelector("#link");
const descriptionField = document.querySelector("#description");
const idField = document.querySelector("#id");

const editForm = document.querySelector("#formEditPromotion");

// Edit promotion

editForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let id = idField.value;
  let name = nameField.value;
  let price = priceField.value;
  let link = linkField.value;
  let description = descriptionField.value;

  fetch("/edit-promotion", {
    method: "POST",
    body: JSON.stringify({
      id,
      name,
      price,
      link,
      description,
    }),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((data) => {
      if (data.status !== 200 && data.status !== 201) {
        throw new Error();
      }
      iziToast.success({
        title: "Sucesso",
        message: "Usuário editado com sucesso!",
        position: "bottomLeft",
      });
      window.location.replace(data.url);
    })
    .catch((error) => {
      iziToast.error({
        title: "Erro",
        message: "Erro ao editar, tente novamente!",
        position: "bottomLeft",
      });
    });
});
