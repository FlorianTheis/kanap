function elementsKanap() {
  fetch('http://localhost:3000/api/products') //adresse de l'API (requette http)
    .then(function (res) {
      // récupération des données au format JSON avec vérification que la requete s'est bien passé (res.ok)
      if (res.ok) {
        return res.json();
      }
    })

    .then(function (lesProduits) {
      // résulat JSON etant une promesse, récupération de sa vraie valeur dans cette fonction
      console.table(lesProduits);
      Kanap(lesProduits);
      // appel des différents produits pour l'affichage (fonction)
    })

    .catch(function (err) {
      // une erreur est survenue
    });
}

elementsKanap(); //déclaration de la fonction écrite plus haut

//recuperer données API avec fetch (AVEC LA METHODE VU DANS LE COURS)

function Kanap(lesProduits) {
  // fonction Kanap avec sa boucle for let of

  let lesArticles = document.getElementById('items');
  for (let elements of lesProduits) {
    // boucle for let of pour afficher les élements
    //appel de l'ID de la section (parent)

    // creation balise a pour afficher l'ID du produit respectif sur la page produit
    let newElement = document.createElement('a');
    newElement.href = `./product.html?id=${elements._id}`;

    lesArticles.appendChild(newElement); // a rattaché au parent (la section avec id items (voir ligne 27))

    let baliseArticle = document.createElement('article'); // creation balise Article avec img, description et le nom d'un kanapé (article étant leur parent)

    newElement.appendChild(baliseArticle); //article rattaché au lien a (son parent)

    // creation balise IMG avec sa SOURCE et son ALT

    let imageKanap = document.createElement('img');
    imageKanap.src = elements.imageUrl;
    imageKanap.alt = elements.altTxt;

    baliseArticle.appendChild(imageKanap); // img rattaché a son parent (article)

    // creation balise h3
    let h3 = document.createElement('h3');
    h3.className = 'productName'; // classe du h3
    h3.textContent = elements.name;

    baliseArticle.appendChild(h3); // h3 rattaché a article

    //creation balise p

    let p = document.createElement('p');
    p.className = 'productDescription'; // class de la balise p
    p.textContent = elements.description;

    baliseArticle.appendChild(p); // balise p ratachée à son parent qui est article
  }
}

// lesArticles (variable pour récuperer l'id de la section à afficher)
// elements (etiquette pour nommer les différents indice qui sont dans "lesProduits")
// lesProduits (là ou se trouvent les différents indice à récuperer, (function Kanap) )
// récuperer ID ${elements._id}

// le principe à était avec la fonction Kanap(lesproduits) de faire une boucle FOR LET OF , de récupérer l'ID de la section donc Items, créee les élements avec .createElement
// (lien a, balise article, image, titre h3 et description) et les appelé/rattaché a leur parent respectif avec appendChild (la balise article pour img, h3 et p)
// et pour le lien "a" le parent c'est l'id de la section items.
// et les produits sont bien affiché sur la page accueil
