let productLocalStorage = JSON.parse(localStorage.getItem('cart')); // On recupere ce qu'il y a dans le local storage.
console.log(productLocalStorage);

function getBasket() {
  // Recuperation de l'item cart.
  let productLocalStorage = localStorage.getItem('cart');
  // Creation d'un tableau si le panier est vide.
  if (productLocalStorage == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

function getKanaps() {
  fetch(`http://localhost:3000/api/products/`) // ajout de l'URL
    .then(function (res) {
      console.log(res);
      // récupération des données au format JSON avec vérification que la requete s'est bien passé (res.ok)
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (lesProduits) {
      console.log(lesProduits);
      getCart(lesProduits); // fonction elements du dom
      getTotalsProduct(lesProduits); // fonction du nombre total de produits dans le panier
      getTotalsPrice(lesProduits); // fonction du prix total dans le panier 
      modifQuantity(lesProduits); // fonction pour modifier la quantité d'un produit 
      deleteArticle(lesProduits); // fonction pour supprimer un produit
    });
}
getKanaps(); // appel de la fonction

//---------------------------------------------------------------- AJOUT DES ELEMENTS DU DOM -------------------------------------------------------------------------//

const getCart = function (lesProduits) {
  for (let product in productLocalStorage) {
    const currentProduct = lesProduits.find(
      // trouver le bon produit actuel
      (p) => p._id === productLocalStorage[product].id // condition p id === productLocalStorage[product].id
    );

    // creation de article
    let article = document.createElement('article'); // création article
    document.querySelector('#cart__items').appendChild(article); // article rattaché au parent (cart items (cart items étant l'id de la section))
    article.className = 'cart__item';
    article.setAttribute('data-id', productLocalStorage[product].id);

    // ajout de la div "cart__item__img"
    let productDiv = document.createElement('div'); // création de la div
    article.appendChild(productDiv); // productDiv rattaché au parent article
    productDiv.className = 'cart__item__img';

    // ajout de l'image
    let productIMG = document.createElement('img');
    productDiv.appendChild(productIMG);
    productIMG.src = currentProduct.imageUrl;
    productIMG.alt = currentProduct.altTxt;

    // ajout de la div cart__item__content
    let itemContent = document.createElement('div');
    article.appendChild(itemContent); // item content rattaché au parent article
    itemContent.className = 'cart__item__content';

    // ajout de la div cart__item__content__titlePrice
    let itemContentTitlePrice = document.createElement('div');
    itemContent.appendChild(itemContentTitlePrice); // item title price rattaché au parent itemContent (la div)
    itemContentTitlePrice.className = 'cart__item__content__titlePrice';

    // ajout du titre h2
    let title = document.createElement('h2');
    itemContentTitlePrice.appendChild(title); // titre h2 rattaché au parent itemContentTitlePrice (la div)
    title.textContent = currentProduct.name;

    // ajout de la couleur
    let productColor = document.createElement('p');
    title.appendChild(productColor); // couleur du produit rattaché au parent (titre h2)
    productColor.textContent = productLocalStorage[product].color;

    // ajout du prix
    let productPrice = document.createElement('p');
    itemContentTitlePrice.appendChild(productPrice); // prix du produit rattaché au parent itemContentTitlePrice (la div)
    productPrice.textContent = currentProduct.price + '€'; // produit actuel + le signe euro

    // ajout de la div cart__item__content__settings
    let itemContentSettings = document.createElement('div');
    itemContent.appendChild(itemContentSettings); // itemContentSettings rattaché au parent itemContent (la div)
    itemContentSettings.className = 'cart__item__content__settings';

    // ajout de la div cart__item__content__settings__quantity
    let itemContentSettingsQuantity = document.createElement('div');
    itemContentSettings.appendChild(itemContentSettingsQuantity); // item...quantity rattaché a la div parent itemContentSettings
    itemContentSettingsQuantity.className =
      'cart__item__content__settings__quantity';

    // ajout de "Qté"
    let productQte = document.createElement('p');
    itemContentSettingsQuantity.appendChild(productQte); // productQte rattaché au parent itemContentSettingsQuantity
    productQte.textContent = 'Quantité : ';

    // ajout de la quantité
    let productQuantity = document.createElement('input');
    itemContentSettingsQuantity.appendChild(productQuantity); // productQuantity (l'input) rattaché au parent ItemContentSettingsQuantity (la div)
    productQuantity.value = productLocalStorage[product].quantity; // la valeur
    productQuantity.className = 'itemQuantity';
    productQuantity.setAttribute('type', 'number');
    productQuantity.setAttribute('min', '1');
    productQuantity.setAttribute('max', '100');
    productQuantity.setAttribute('name', 'itemQuantity');

    // ajout de la div cart__item__content__settings__delete
    let itemContentSettingsDelete = document.createElement('div');
    itemContentSettings.appendChild(itemContentSettingsDelete); // rattaché a la div parent
    itemContentSettingsDelete.className =
      'cart__item__content__settings__delete';

    // ajout de la supression (le p)
    let productDelete = document.createElement('p');
    itemContentSettingsDelete.appendChild(productDelete); // product delete rattaché a la div parent
    productDelete.className = 'deleteItem';
    productDelete.textContent = 'Supprimer';
  }
};

//---------------------------------------------------------FONCTION TOTAL DES PRODUITS DANS LE PANIER-----------------------------------------------------------//

const getTotalsProduct = function (lesProduits) {
  //déclaration variable total quantité des produits
  let totalQuantity = 0;
  //boucle pour calcul de la quantité total (for let of)
  for (let totalNumber of productLocalStorage) {
    let productInCart = totalNumber.quantity;
    totalQuantity += productInCart;
  }
  // modification du dom
  document.getElementById('totalQuantity').textContent = totalQuantity;
};
getTotalsProduct(); // appel de la fonction total des produits

//-----------------------------------------------------------FONCTION TOTAL DU PRIX DANS LE PANIER--------------------------------------------------------------//

const getTotalsPrice = function (lesProduits) {
let totalPrice = 0;
//boucle pour calcul du prix total (for let of)
for (let totalProduct of productLocalStorage) {
  let productCart = totalProduct.price;
  totalPrice += productCart;
}
//modification du dom
document.getElementById('totalPrice').textContent = totalPrice;
};
getTotalsPrice(); // appel de la fonction

//------------------------------------------------------FONCTION POUR MODIFIER LA QUANTITE D'UN PRODUIT DU PANIER--------------------------------------------------//
const modifQuantity = function (lesProduits) {
  let itemModif = document.querySelectorAll('.itemQuantity');
  for (let j = 0; j < itemModif.length; j++) {
    itemModif[j].addEventListener('change', (event) => {
      event.preventDefault();
      //Je selectionne l'élément à modifier selon son Id et sa couleur
      let itemNew = productLocalStorage[j].quantity;
      let itemModifValue = itemModif[j].valueAsNumber;

      const result = productLocalStorage.filter(
        (element) => element.itemModifValue !== itemNew
      );

      result.quantity = itemModifValue;
      productLocalStorage[j].quantity = result.quantity;

      localStorage.setItem('cart', JSON.stringify(productLocalStorage));

      location.reload(); // rafraichir la page
      alert('votre panier est mis à jour.');
    }); //fin du addeventlistener
  }
};

//---------------------------------------------------FONCTION POUR SUPPRIMER UN PRODUIT DU PANIER-----------------------------------------------------------------//


const deleteArticle = function (lesProduits) {
  let deleteItem = document.querySelectorAll('.deleteItem');

  for (let k = 0; k < deleteItem.length; k++) {
    deleteItem[k].addEventListener('click', (event) => {
      event.preventDefault();

      //Je selectionne l'élément à modifier selon son Id et sa couleur
      let deleteId = productLocalStorage[k].id;
      let deleteColor = productLocalStorage[k].color;

      productLocalStorage = productLocalStorage.filter(
        (element) => element.id !== deleteId || element.color !== deleteColor
      );
      localStorage.setItem('cart', JSON.stringify(productLocalStorage));

      location.reload(); // rafraichir la page
      alert('Votre article a bien été supprimé du panier.');
    }); //fin du addEventListener
  }
};

//--------------------------------------------------------------