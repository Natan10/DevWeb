// delete promotion
async function deletePromotion(promotionId){
  fetch(`/promotion/${promotionId}`,{
    method: "DELETE",
  }).then((res) => {
    if(res.status === 200 || res.status === 204){
      document.getElementById(`promotion_${promotionId}`).remove();
      iziToast.success({
        title: 'Sucesso',
        message: 'Promoção deletada com sucesso!',
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
  .catch(_ => {
    iziToast.error({
      title: 'Erro',
      message: 'Erro ao deletar promoção!',
      position: 'bottomLeft'
    });
  });
}