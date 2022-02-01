const userTable = document.querySelector("#user-table tbody");
const promotionTable = document.querySelector("#promo-table tbody");

function innerHTMLUser(user) {
  return `
    <td class="id user_id">${user.id}</td>
    <td class="name">${user.nome}</td>
    <td class="label">${user.email}</td>
    <td class="info">${user.isAdmin ? "Gerente" : "Usuário"}</td>
    <td class="action" colspan="2">
      <button class="btn btn-primary">
        Editar
      </button>
      <button class="btn btn-danger user_delete_btn" onclick="deleteUser(${
        user.id
      })">Deletar</button>
    </td>
    `;
}

function innerHTMLPromotions(promotion) {
  return `
    <td>${promotion.id}</td>
    <td>${promotion.nome}</td>
    <td>${promotion.preco.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    })}</td>
    <td>${promotion.descricao}</td>
    <td>${convertData(promotion.createdAt)}</td>
    <td class="action" colspan="2">
      <a href="/edit-promotion?id=${promotion.id}">
        <button class="btn btn-primary">
          Editar
        </button>
      </a>
      <button class="btn btn-danger promotion_delete_btn" onclick="deletePromotion(${
        promotion.id
      })">Deletar</button>
    </td>
    `;
}

// Get users
function loadUsers() {
  fetch("/get-users")
    .then((response) => response.json())
    .then((data) => JSON.parse(data))
    .then((users) => {
      users.forEach((user) => {
        const tr = document.createElement("tr");
        tr.innerHTML = innerHTMLUser(user);
        tr.id = `user_${user.id}`;
        userTable.appendChild(tr);
      });
    });
}

// GET user promotions
function loadPromotions() {
  fetch("/user-promotions")
    .then((response) => response.json())
    .then((data) => JSON.parse(data))
    .then((promotions) => {
      promotions.forEach((promotion) => {
        const tr = document.createElement("tr");
        tr.innerHTML = innerHTMLPromotions(promotion);
        tr.id = `promotion_${promotion.id}`;
        tr.classList.add(`promotion-user-id_${promotion.userId}`);
        promotionTable.appendChild(tr);
      });
    });
}

function convertData(data) {
  return data.slice(0, 10).split("-").reverse().join("/");
}

window.onload = () => {
  loadUsers();
  loadPromotions();
};
