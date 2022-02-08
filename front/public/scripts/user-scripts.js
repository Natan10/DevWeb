function checkPromotionsTableUser(userId){
  const userPromotions = document.getElementsByClassName(`promotion-user-id_${userId}`);
  
  if(userPromotions.length > 0){
    while(userPromotions.length > 0){
      for(let tr of userPromotions) tr.remove();
    }
  }
}

// delete user 
async function deleteUser(userId){
  const aux = confirm(`Deseja deletar o usuário ${userId}?`);

  if(!aux){
    return;
  }

  fetch(`/user/${userId}`,{
    method: "DELETE",
  }).then((res) => {

    if(res.status === 200 || res.status === 204){
      document.getElementById(`user_${userId}`).remove();
      checkPromotionsTableUser(userId);
      iziToast.success({
        title: 'Sucesso',
        message: 'Usuário deletado com sucesso!',
        position: 'bottomLeft'
      });
    }else{
      res.json().then(data => {
        iziToast.info({
          title: 'Info',
          message: data.error,
          position: 'bottomLeft'
        });
      }).catch(_ => {
        throw new Error();
      });
    }
  })
  .catch(_ => {
    iziToast.error({
      title: 'Erro',
      message: 'Erro ao deletar usuário!',
      position: 'bottomLeft'
    });
  });
}