let productCartStorage = JSON.parse(localStorage.getItem("product"));
console.log(productCartStorage)

let structureCartProduct = []

const userCart = document.getElementById("cart__items")
if(productCartStorage === null || productCartStorage == 0){
  const cartEmpty = 
  `<div> Le panier est vide </div>`
  userCart.innerHTML = cartEmpty
}
else{ 
for (i = 0; i < productCartStorage.length; i++) {
    structureCartProduct = structureCartProduct + ` <article class="cart__item" data-id="${productCartStorage[i].productId}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${productCartStorage[i].productImg}" alt="${productCartStorage[i].productImgAlt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productCartStorage[i].productName}</h2>
        <p>${productCartStorage[i].productColor}</p>
        <p>${productCartStorage[i].productPrice} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p></p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productCartStorage[i].productQuantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
}
  if(i == productCartStorage.length){
    userCart.innerHTML = structureCartProduct;
  }
}
  /*
  else if (product.productId == product.productId && product.productColor == product.productColor){
      let priceFinal = product.productPrice + product.productPrice
    let quantityFinal = product.productQuantity + product.productQuantity
    const templateAlt = ` <article class="cart__item" data-id="${product.productId}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${product.productImg}" alt="${product.productImgAlt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.productName}</h2>
        <p>${product.productColor}</p>
        <p>${priceFinal} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p></p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantityFinal}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
  userCart.innerHTML = templateAlt;
  }*/

  /*cout total du panier et nombres d'articles*/

let priceTotalCalc = []
let quantityTotalCalc =[]
for (let m = 0; m < productCartStorage.length; m++){
    let productCartPrice = productCartStorage[m].productPrice
    let productCartQuantity = productCartStorage[m].productQuantity
    priceTotalCalc.push(productCartPrice)
    quantityTotalCalc.push(productCartQuantity)
}

const reducer = (accumulator, currentValue) => accumulator +currentValue

const priceTotal = priceTotalCalc.reduce(reducer)
document.getElementById("totalPrice").textContent = priceTotal

const quantityTotal = quantityTotalCalc.reduce(reducer)
document.getElementById("totalQuantity").textContent = quantityTotal

/*suppression des articles*/
const deleteBtn = document.querySelectorAll(".deleteItem")

for (let k = 0; k < deleteBtn.length; k++){
  deleteBtn[k].addEventListener("click" , (event) =>{
    event.preventDefault()
    let deleteProductId = productCartStorage[k].productId
    /*let deleteProductColor = productCartStorage[k].productColor*/
    
    productCartStorage = productCartStorage.filter((el) => el.productId !== deleteProductId /*&& el.productColor !== deleteProductColor*/)
    localStorage.setItem("product", JSON.stringify(productCartStorage))
    window.location.href = "cart.html"
  })
}
