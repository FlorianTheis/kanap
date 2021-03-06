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
  description.textContent = Produits.description;
};

// fonction afficher choix couleur
// variable choiceCouleur (récupérer ID colors, le parent de l'élément option)
const lesCouleurs = function (colorsss) {
  let choiceCouleur = document.getElementById('colors');
  for (let choix of colorsss) {
    let optionsCouleurs = document.createElement('option'); // création de la parti option (l'enfant)
    optionsCouleurs.textContent = `${choix}`;
    choiceCouleur.appendChild(optionsCouleurs); // rattaché option (optionsCouleurs) à son parent (l'id colors "choiceCouleur")
    console.log(optionsCouleurs);
  }
};
