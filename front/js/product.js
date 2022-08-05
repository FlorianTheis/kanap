const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');

function infosProduct() {
  fetch(`http://localhost:3000/api/products/${id}`) //Ajout de l'ID sur l'URL avec ${id}
    .then(function (res) {
      console.log(res);
      // récupération des données au format JSON avec vérification que la requete s'est bien passé (res.ok)
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (Produits) {
      console.log(Produits);
      imageHTML(Produits);
      lesCouleurs(Produits.colors);
    });
}

infosProduct(); // déclaration de la variable ligne7

let lesArticles = document.getElementsByClassName('item__img')[0]; // affichage du kanapé dans la page produit avec getElementsbyClassName

const imageHTML = function (Produits) {
  let imageBloc = document.createElement('img');
  imageBloc.setAttribute('src', Produits.imageUrl);
  imageBloc.setAttribute('alt', Produits.altTxt);
  lesArticles.appendChild(imageBloc); // imageBloc(l'image) rattaché à son parent la class (item__img) donc la variable lesArticles
  console.log(imageBloc);

  // déclaration des variables pour récuperer titre, prix, description
  let titre = document.querySelector('#title'); //variable qui va nous servir à récuperer le titre "#title pour l'id"
  let prix = document.querySelector('#price'); // pareil qu'au dessus
  let description = document.querySelector('#description'); // pareil

  titre.textContent = Produits.name; // récupérer le titre
  prix.textContent = Produits.price; // le prix
  description.textContent = Produits.description; // la description
};

// fonction afficher choix couleur

const lesCouleurs = function (colorsss) {
  let choiceCouleur = document.getElementById('colors'); // variable choiceCouleur (récupérer ID colors, le parent de l'élément option)
  for (let choix of colorsss) {
    let optionsCouleurs = document.createElement('option'); // création de la parti option (l'enfant)
    optionsCouleurs.textContent = `${choix}`;
    choiceCouleur.appendChild(optionsCouleurs); // rattaché option (optionsCouleurs) à son parent (l'id colors "choiceCouleur")
    console.log(optionsCouleurs);
  }
};

/************************ local storage *************************/

function cartSave(cart) {
  localStorage.setItem('cart', JSON.stringify(cart)); // prend un object pour le transformer en chaine de caractères
}

function getCart() {
  let cart = localStorage.getItem('cart');
  if (cart == null) {
    // if cart == null ça veut dire que le panier est vide
    return []; // pas de panier donc tableau vide en retour
  } else {
    return JSON.parse(cart); // le panier existe retour en parse (parse prend une chaine de caractère qu'il retransforme en objet)
  }
}

function addToCart(productChoice) {
  // fonction ajouté au panier
  let cart = getCart();
  for (let i in cart) {
    const ProPro = cart[i];
    if (
      ProPro.id === productChoice.id &&
      ProPro.color === productChoice.color
    ) {
      ProPro.quantity = productChoice.quantity + ProPro.quantity;
      cartSave(cart);
      alert('votre produit est ajouté');
      return;
    }
  }
  cart.push(productChoice);
  cartSave(cart);
  alert('votre produit est ajouté');
  return;
}

//

/******************************** Button "ajouté au panier", affichage des données COULEUR QUANTITE ID  ***************************************/

let buttonCart = document.getElementById('addToCart'); // recupération du bouton addToCart par son id (variable button cart)
buttonCart.addEventListener('click', () => {
  // quand on clique sur ajouté au panier, récupération des données (ID QUANTITE ET COLOR) avec la variable productChoice
  let productChoice = {
    // variable qui contient id, quantité et color a récupérer
    id: id,
    quantity: parseInt(quantity.value), // analyse en nombre et renvoie en entier dans la base de données (ls)
    color: colors.value,
  };
  // Condition de check si les fonctions de quantite et de couleur fonctionne bien.
  if (quantityVerif() && colorVerif()) {
    console.log('La commande à été passée !');
    addToCart(productChoice);
  }
  console.log(productChoice); //declaration de la fonction addToCart pour afficher le localStorage quand on va "ajouter au panier"
});

// Fonction pour verifier si la couleur est bien selectionne.

function colorVerif() {
  // Recuperer la valeur des couleurs saisie par l'utilisateur.
  let colorCheck = document.getElementById('colors').value;
  console.log(colorCheck);
  // Si la couleur contient plus de 0 caracteres donc si elle à bien été choisi.
  if (colorCheck > [0]) {
    console.log('Couleur ok');
    // Valider la commande.
    return true;
    // Sinon ne pas valider et afficher un message d'erreur.
  } else {
    alert('Veuillez séléctionner une couleur.');
  }
}

// fonction quantité, voir si elle a bien été selectionné
function quantityVerif() {
  // Recuperer la valeur de la quantite saisie par l'utilisateur.
  let quantityCheck = document.getElementById('quantity').value;
  console.log(quantityCheck);
  // Si la quantite saisie se trouve entre 1 et 100.
  if (quantityCheck > 0 && quantityCheck < 100) {
    console.log('Quantité ok');
    // Valider la commande.
    return true;
    // Sinon ne pas valider et afficher un message d'erreur.
  } else {
    alert('Veuillez choisir un nombre entre 1 et 100');
  }
}
