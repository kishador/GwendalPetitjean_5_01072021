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
      const quantity = document.querySelector(
        ".item__content__settings__quantity input"
      );
      const quantityString = quantity.value;
      const quantityValue = parseInt(quantityString)
      const priceValue = parseFloat(data.price)
      const colorsChoice = colorChoice.value;

      
      const addProductLocalStorage = () => {
        let productCart = {
          productName: data.name,
          productPrice: priceValue,
          productId: id,
          productColor: colorsChoice,
          productQuantity: quantityValue,
          productImg: data.imageUrl,
          productImgAlt: data.altTxt,
         }
        productCartStorage.push(productCart);
        localStorage.setItem("product", JSON.stringify(productCartStorage));
      };
      let productCartStorage = JSON.parse(localStorage.getItem("product"));
     
      if (productCartStorage) {
        for (let k = 0; k < productCartStorage.length; k++){
        const product = productCartStorage[k]
          
        const productCartColor = product.productColor
        const productCartId = product.productId
        const productCartQuantity = product.productQuantity
        
        if (id === productCartId && colorsChoice === productCartColor){
          product.productQuantity = quantityValue + productCartQuantity
          localStorage.setItem("product", JSON.stringify(productCartStorage));
          console.log(this)
        
        }
        else {
          addProductLocalStorage()
          console.log(productCartStorage)
        }
      }
      }
      
      else {
        productCartStorage = [];
        addProductLocalStorage();
      }
    })
  })
  .catch(function (err) {
    // Une erreur est survenue
  })