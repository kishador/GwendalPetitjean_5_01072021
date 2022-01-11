/*récupération de l'id dans l'url*/
const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");

/* on requete l'API pour le produit avec l'id*/
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    /* on crée et injecte le produit et ses caractéristiques dans le html*/
    const templateImg = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    const imageDiv = document.querySelector(".item__img");
    imageDiv.innerHTML = templateImg;

    document.getElementById("title").textContent = data.name;

    document.getElementById("price").textContent = data.price;

    document.getElementById("description").textContent = data.description;

    const colorChoice = document.getElementById("colors");

    const ancientTemplate = document.querySelector("#colors option");
    colorChoice.removeChild(ancientTemplate);

    for (let i = 0; i < data.colors.length; i++) {
      const color = data.colors[i];
      const templateColor = `<option value="${color}">${color}</option>`;
      colorChoice.innerHTML += templateColor;
    }
    
    //panier//
    
    const btnAddCart = document.getElementById("addToCart");
    btnAddCart.addEventListener("click", (Event) => {
      Event.preventDefault();
     /* on crée un objet produit*/
      const quantityString = quantity.value;
      const quantityValue = parseInt(quantityString)
      const priceValue = parseFloat(data.price)
      const colorsChoice = colorChoice.value;
      let productCartStorage = JSON.parse(localStorage.getItem("product"))
        const objectProduct = {
          productName: data.name,
          productPrice: priceValue,
          productId: id,
          productColor: colorsChoice,
          productQuantity: quantityValue,
          productImg: data.imageUrl,
          productImgAlt: data.altTxt,
        }
        if (productCartStorage) {
            let alreadyPresent = false;
            let indexModification;
            for (products of productCartStorage) {
              /* on sauvegarde l'index du produit si doublon*/
                switch (products.productId + products.productColor) {
                    case objectProduct.productId + objectProduct.productColor:
                        alreadyPresent = true;
                        indexModification = productCartStorage.indexOf(products)
                        
                      
                }
            }
            /*si produit en doublon modifie la quantité uniquement*/
            if (alreadyPresent) {
                productCartStorage[indexModification].productQuantity =
                     productCartStorage[indexModification].productQuantity + objectProduct.productQuantity;
                localStorage.setItem("product", JSON.stringify(productCartStorage));
            /* si tableau créé et nouveau produit l'ajoute au localStorage*/
            } else if (quantityValue >= 1){
                productCartStorage.push(objectProduct);
                localStorage.setItem("product", JSON.stringify(productCartStorage));
            }
          }
          /* on crée le tableau de produit si il n 'y a rien dans le localStorage et ajoute le produit*/
          else if (quantityValue >= 1){
            productCartStorage = [];
            productCartStorage.push(objectProduct);
            localStorage.setItem("product", JSON.stringify(productCartStorage)); 
          }
        
    })
  })
  .catch(function (err) {
   
  })
  