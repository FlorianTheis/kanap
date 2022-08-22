let productLocalStorage = JSON.parse(localStorage.getItem('cart')); // On recupere ce qu'il y a dans le local storage.
console.log(productLocalStorage);

function getBasket(selectKanaps) {
  // Recuperation de l'item cart.
  let productLocalStorage = localStorage.getItem('cart');
  // Creation d'un tableau si le panier est vide.

  if (productLocalStorage == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

async function getKanaps() {
  const selectKanaps = await Promise.all(
    productLocalStorage.map((kanap) =>
      fetch(`http://localhost:3000/api/products/${kanap.id}`).then(function (
        res
      ) {
        //récupération des données au format JSON après vérification que la requête s'est bien passée (res.ok)
        if (res.ok) {
          return res.json();
        }
      })
    )
  ); // ajout de l'url
  let allProducts = []; // tableau avec toutes les infos

  for (let p of productLocalStorage) {
    const kanaps = selectKanaps.find((k) => k._id === p.id);

    allProducts.push({
      ...kanaps,
      ...p,
    });
  }
  console.log('allProducts', allProducts);
  getCart(selectKanaps); // fonction élément du dom
  getTotalsProduct(selectKanaps); // fonction du nombre total de produits dans le panier
  getTotalsPrice(allProducts); // fonction du prix total dans le panier
  modifQuantiy(selectKanaps); // fonction pour modifier la quantité d'un produits
  deleteArtcle(selectKanaps); // fonction pour supprimer un produit
}
getKanaps(); // appel de la fonction

//---------------------------------------------------------------- AJOUT DES ELEMENTS DU DOM -------------------------------------------------------------------------//

const getCart = function (selectKanaps) {
  for (let product in selectKanaps) {
    const currentProduct = selectKanaps.find(
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

function getTotalsProduct(selectKanaps) {
  //déclaration variable total quantité des produits
  let totalQuantity = 0;
  //boucle pour calcul de la quantité total (for let of)
  for (let totalNumber of productLocalStorage) {
    let productInCart = totalNumber.quantity;
    totalQuantity += productInCart;
  }
  // modification du dom
  document.getElementById('totalQuantity').textContent = totalQuantity;
  getTotalsPrice(selectKanaps);
}
// appel de la fonction total des produits

//-----------------------------------------------------------FONCTION TOTAL DU PRIX DANS LE PANIER--------------------------------------------------------------//

function getTotalsPrice(selectKanaps) {
  let totalPrice = 0;
  //boucle pour calcul du prix total (for let of)
  for (let totalProduct of selectKanaps) {
    console.log('totalProduct', totalProduct);

    totalPrice += totalProduct.price * totalProduct.quantity;
  }
  // kanaps._id dans all product
  //modification du dom
  document.getElementById('totalPrice').textContent = totalPrice;
}

//------------------------------------------------------FONCTION POUR MODIFIER LA QUANTITE D'UN PRODUIT DU PANIER--------------------------------------------------//
function modifQuantiy(selectKanaps) {
  let itemModif = document.querySelectorAll('.itemQuantity');
  for (let j = 0; j < itemModif.length; j++) {
    itemModif[j].addEventListener('change', (event) => {
      event.preventDefault();
      if (itemModif[j].value <= 0) {
        
        alert ("Veuillez saisir une quantité minimale d'un article par produit")
        itemModif[j].value = result;
        location.reload();
      }
      if (itemModif[j].value > 100) {
        alert("veuillez choisir une quantité maximale de 100 articles par produit")
        itemModif[j].value = 101;
      }
      else {
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
      };
      
    }); //fin du addeventlistener
  }
}

//---------------------------------------------------FONCTION POUR SUPPRIMER UN PRODUIT DU PANIER-----------------------------------------------------------------//

function deleteArtcle(selectKanaps) {
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
}

//-------------------------------------------------------------- FORMULAIRE -------------------------------------------------------------------------------------------//

let submit = document.getElementById('order'); // commander

let inputFirstName = document.getElementById('firstName'); // prenoms
let inputLastName = document.getElementById('lastName'); // noms
let inputAddress = document.getElementById('address'); // adresse
let inputCity = document.getElementById('city'); // ville
let inputMail = document.getElementById('email'); // adresse mail

// -------------------REGEX-------------------------------------//

let testNumber = /^[a-zA-Z-\s]{3,}#*$/; // s valide les espace blancs (utilisé pour noms et prénom) et 3 minimum
let testAddress = /^[a-zA-Z-0-9\s]{3,50}#*$/; // pour l'adresse 3 et 50 caractères autorisé et chiffre autorisés
let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/; // pour le mail entre 2 et 4 caratères autorisés apres le point ".com", le @ doit etre inscrit
// \w est l'équivalent de [a-zA-Z0-9] ($ est la fin de la séquence et ^ début de séquence)

// testNumber pour prénom / nom / city
// testAddress pour l'adresse du client
// regexMail pour l'adresse Mail du client

function verificationChamps(e) {
  let verification = true;
  if (!testNumber.test(inputFirstName.value) || inputFirstName.value == '') {
    // si le champ est mal renseigné , renvoyez "le champ ne doit pas contenir..." sinon
    document.getElementById('firstNameErrorMsg').innerHTML =
      'le champ ne doit pas contenir de chiffre et doit être renseigné avec minimum 3 caractères.';
    document.getElementById('firstNameErrorMsg').style.color = 'red';
    e.preventDefault();
    verification = verification && false;
  } else {
    //  si il est bien renseigné , vérification ok renvoyé true
    document.getElementById('firstNameErrorMsg').innerHTML = '';
    verification = verification && true;
  }
  if (!testNumber.test(inputLastName.value) || inputLastName.value == '') {
    document.getElementById('lastNameErrorMsg').innerHTML =
      'le champ ne doit pas contenir de chiffre et doit etre renseigné avec minimum 3 caractères.';
    document.getElementById('lastNameErrorMsg').style.color = 'red';
    e.preventDefault();
    verification = verification && false;
  } else {
    document.getElementById('lastNameErrorMsg').innerHTML = '';
    verification = verification && true;
  }
  if (!testAddress.test(inputAddress.value) || inputAddress.value == '') {
    document.getElementById('addressErrorMsg').innerHTML =
      'le champ doit contnir une adresse valide avec au minimum 3 caractères. ';
    document.getElementById('addressErrorMsg').style.color = 'red';
    e.preventDefault();
    verification = verification && false;
  } else {
    document.getElementById('addressErrorMsg').innerHTML = '';
    verification = verification && true;
  }
  if (!testNumber.test(inputCity.value) || inputCity.value == '') {
    document.getElementById('cityErrorMsg').innerHTML =
      'le champ ne doit pas contenir de chiffre et être renseigner avec minimum 3 caractères.';
    document.getElementById('cityErrorMsg').style.color = 'red';
    e.preventDefault();
    verification = verification && false;
  } else {
    document.getElementById('cityErrorMsg').innerHTML = '';
    verification = verification && true;
  }
  if (!regexMail.test(inputMail.value) || inputMail.value == '') {
    document.getElementById('emailErrorMsg').innerHTML =
      'le champ doit contenir mail valide (exemple machin@machin.com)';
    document.getElementById('emailErrorMsg').style.color = 'red';
    e.preventDefault();
    verification = verification && false;
  } else {
    document.getElementById('emailErrorMsg').innerHTML = '';
    verification = verification && true;
  }
  retourneForm(e, verification); // déclaration de la fonction qui comporte le body (firstName...)
}

submit.addEventListener('click', (e) => verificationChamps(e));

//---------------POST_Order---------------

let formData = document.querySelector('form').elements; // on recupère les elements form
for (let i = 0; i < formData.length; i++) {
  // on incrémente
  const element = formData[i];
}
let storage = productLocalStorage;

// if storage est vide (=0) alors la commande ne se valide pas sinon si produit présent dans le panier la commande se valide (si le formulaire est bien rempli)
function postOrder(body) {
  if (storage.length === 0) {
    alert('votre panier est vide, veuillez ajoutez un article');
  } else {
    fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.orderId);
        localStorage.setItem('orderId', data.orderId);
        document.location.href = 'confirmation.html';
      });
  }
}

function retourneForm(e, verification) {
  console.log(verification);
  if (!verification) {
    e.preventDefault();
  } else {
    const body = {
      contact: {
        firstName: formData[0].value,
        lastName: formData[1].value,
        address: formData[2].value,
        city: formData[3].value,
        email: formData[4].value,
      },
      products: recupeId(storage),
    };
    postOrder(body); // déclaration de la fonction qui contient le POST et le FETCH
  }
}
function recupeId(storage) {
  let idTableau = [];
  for (let i = 0; i < storage.length; i++) {
    idTableau.push(storage[i].id);
  }
  console.log(idTableau);
  return idTableau;
}
