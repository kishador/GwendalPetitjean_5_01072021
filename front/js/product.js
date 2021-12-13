const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");


fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
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
     
      const quantityString = quantity.value;
      const quantityValue = parseInt(quantityString)
      const priceValue = parseFloat(data.price)
      const colorsChoice = colorChoice.value;
      let productCartStorage = JSON.parse(localStorage.getItem("product"))
        let objectProduct = {
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
                switch (products.productId + products.productColor) {
                    case objectProduct.productId + objectProduct.productColor:
                        alreadyPresent = true;
                        indexModification = productCartStorage.indexOf(products)
                        
                      
                }
            }

            if (alreadyPresent) {
                productCartStorage[indexModification].productQuantity =
                     +productCartStorage[indexModification].productQuantity + +objectProduct.productQuantity;
                localStorage.setItem("product", JSON.stringify(productCartStorage));

            } else {
                productCartStorage.push(objectProduct);
                localStorage.setItem("product", JSON.stringify(productCartStorage));
            }
          }
          else {
            productCartStorage = [];
            productCartStorage.push(objectProduct);
            localStorage.setItem("product", JSON.stringify(productCartStorage));
            
          }
        
    })
  })
  .catch(function (err) {
    // Une erreur est survenue
  })
  