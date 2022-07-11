function id (){
    let urlData = new URL 
    fetch(`http://localhost:3000/api/products/${id}`) //Ajout de l'ID sur l'URL avec ${id}
      .then(function (res) {
        console.log(res);
        // récupération des données au format JSON avec vérification que la requete s'est bien passé (res.ok)
        if (res.ok) {
          return res.json();
        }
      })}

      id();