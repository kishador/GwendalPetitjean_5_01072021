let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");

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

    let ancientTemplate = document.querySelector("#colors option");
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

      let productCart = {
        productName: data.name,
        productPrice: priceValue,
        productId: id,
        productColor: colorsChoice,
        productQuantity: quantityValue,
        productImg: data.imageUrl,
        productImgAlt: data.altTxt,
      };
      const addProductLocalStorage = () => {
        productCartStorage.push(productCart);
        localStorage.setItem("product", JSON.stringify(productCartStorage));
      };
      let productCartStorage = JSON.parse(localStorage.getItem("product"));
      for (let k = 0; k < productCartStorage.length; k++){
        let productCartId = productCartStorage[k].productId
        let productCartColor = productCartStorage[k].productColor
        let productCartPrice = productCartStorage[k].productPrice
        let productCartQuantity = productCartStorage[k].productQuantity
        console.log(productCartQuantity)
        console.log(productCartColor)
        console.log(productCartPrice)
        console.log(productCartId)
      }
      if (productCartStorage) {
        addProductLocalStorage();
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

 /*
      
      if ((el) => el.productId == productCartId && el.productColor == productCartColor) {
       const productTotalPrice = ((el) => el.productPrice + productCartPrice)
       const productTotalQuantity = ((el) => el.productQuantity + productCartQuantity)
       productCart[1].push(productTotalPrice)
       productCart[4].push(productTotalQuantity)
       localStorage.setItem("product", JSON.stringify(productCartStorage))
      }*/