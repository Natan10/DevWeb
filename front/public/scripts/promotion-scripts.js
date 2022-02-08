const nameField = document.querySelector("#name");
const priceField = document.querySelector("#price");
const linkField = document.querySelector("#link");
const descriptionField = document.querySelector("#description");
const idField = document.querySelector("#id");

const registerForm = document.querySelector("#formRegisterPromotion");

// create promotion
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = nameField.value;
  let price = priceField.value;
  let link = linkField.value;
  let description = descriptionField.value;

  fetch("/new-promotion", {
    method: "POST",
    body: JSON.stringify({
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
        message: "Usuário cadastrado com sucesso!",
        position: "bottomLeft",
      });
      window.location.replace(data.url);
    })
    .catch((error) => {
      iziToast.error({
        title: "Erro",
        message: "Erro ao cadastrar, tente novamente!",
        position: "bottomLeft",
      });
    });
});

// delete promotion
async function deletePromotion(promotionId) {
  const aux = confirm(`Deseja deletar a promoção ${promotionId}?`);

  if(!aux){
    return;
  }
  fetch(`/promotion/${promotionId}`, {
    method: "DELETE",
  })
  .then((res) => {
    if (res.status === 200 || res.status === 204) {
      document.getElementById(`promotion_${promotionId}`).remove();
      iziToast.success({
        title: "Sucesso",
        message: "Promoção deletada com sucesso!",
        position: "bottomLeft",
      });
    } else {
      res
        .json()
        .then((data) => {
          iziToast.info({
            title: "Info",
            message: data.message,
            position: "bottomLeft",
          });
        })
        .catch((err) => {
          throw new Error();
        });
    }
  })
  .catch((_) => {
    iziToast.error({
      title: "Erro",
      message: "Erro ao deletar promoção!",
      position: "bottomLeft",
    });
  });
}
