// delete user 
async function deleteUser(userId){
  fetch(`/user/${userId}`,{
    method: "DELETE",
  }).then((res) => {
    if(res.status === 200 || res.status === 204){
      document.getElementById(`user_${userId}`).remove();
      iziToast.success({
        title: 'Sucesso',
        message: 'Usuário deletado com sucesso!',
        position: 'bottomLeft'
      });
    }else{
      res.json().then(data => {
        iziToast.info({
          title: 'Info',
          message: data.message,
          position: 'bottomLeft'
        });
      }).catch(err => {
        throw new Error();
      });
    }
  })
  .catch(err => {
    iziToast.error({
      title: 'Erro',
      message: 'Erro ao deletar usuário!',
      position: 'bottomLeft'
    });
  });
}