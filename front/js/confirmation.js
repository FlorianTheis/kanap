//-----------------Retour du Numero de Commande--------------------

let storage = localStorage.getItem("orderId");
for (let i = 0; i < storage.length; i++) {
    const element = storage[i];
    // console.log(storage);
    const orderNumber = document.getElementById('orderId')
function changeId (){
  orderNumber.innerHTML +=`<p>${storage}</p>`;
  localStorage.removeItem('orderId')
  localStorage.clear();
}
}
changeId()