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
      <button class="btn btn-danger user_delete_btn" onclick="deleteUser(${user.id})">Deletar</button>
    </td>
    `;
}

function innerHTMLPromotions(promotion) {
  return `
    <td>${promotion.id}</td>
    <td>${promotion.nome}</td>
    <td>${promotion.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
    <td>${promotion.descricao}</td>
    <td>${convertData(promotion.createdAt)}</td>
    <td class="action" colspan="2">
      <button class="btn btn-primary">
        Editar
      </button>
      <button class="btn btn-danger">Deletar</button>
    </td>
    `;
}

function loadUsers() {
  fetch("/get-users")
    .then((response) => response.json())
    .then((data) => JSON.parse(data))
    .then((users) => {
      users.forEach((user) => {
        const tr = document.createElement("tr");
        tr.innerHTML = innerHTMLUser(user);
        userTable.appendChild(tr);
      });
    });
}

function loadPromotions() {
  fetch("/get-promotions")
    .then((response) => response.json())
    .then((data) => JSON.parse(data))
    .then((promotions) => {
      promotions.forEach((promotion) => {
        const tr = document.createElement("tr");
        tr.innerHTML = innerHTMLPromotions(promotion);
        promotionTable.appendChild(tr);
      });
    });
}

function convertData(data) {
  return data.slice(0, 10).split("-").reverse().join("/");
}


// TODO 
async function deleteUser(userId){
  fetch(`/delete-user/${userId}`,{
    method: "DELETE",
  }).then((response) => response.json())
  .then(data => console.log(data))
}

window.onload = () => {
  loadUsers();
  loadPromotions();
};
