let productCartStorage = JSON.parse(localStorage.getItem("product"));

let structureCartProduct = []
let priceTotalCalc = []
let quantityTotalCalc =[]

const userCart = document.getElementById("cart__items")
if(productCartStorage === null || productCartStorage == 0){
  const cartEmpty = 
  `<div> Le panier est vide </div>`
  userCart.innerHTML = cartEmpty
  document.getElementById("totalPrice").textContent = "0"
  document.getElementById("totalQuantity").textContent = "0"
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
  const quantityInput = document.querySelector(".itemQuantity")

  let productCartPrice = productCartStorage[i].productPrice * productCartStorage[i].productQuantity
  let productCartQuantity = productCartStorage[i].productQuantity
  priceTotalCalc.push(productCartPrice)
  quantityTotalCalc.push(productCartQuantity)
  }
  if(i == productCartStorage.length){
    userCart.innerHTML = structureCartProduct;
  }

const reducer = (accumulator, currentValue) => accumulator + currentValue
const priceTotal = priceTotalCalc.reduce(reducer)
document.getElementById("totalPrice").textContent = priceTotal
const quantityTotal = quantityTotalCalc.reduce(reducer)
document.getElementById("totalQuantity").textContent = quantityTotal
}

/*suppression des articles*/
const deleteBtn = document.querySelectorAll(".deleteItem")

for (let k = 0; k < deleteBtn.length; k++){
  deleteBtn[k].addEventListener("click" , (event) =>{
    event.preventDefault()
    let deleteProduct = productCartStorage[k].productId && productCartStorage[k].productColor
     
    productCartStorage = productCartStorage.filter((el) => el.productId && el.productColor !== deleteProduct)
    localStorage.setItem("product", JSON.stringify(productCartStorage))
    window.location.href = "cart.html"
  })
}
/*changement quantité prix dynamique*/
for (k = 0; k < productCartStorage.length; k++){
  const quantityInput = document.querySelector(".itemQuantity")
  const product = productCartStorage[k]
quantityInput.addEventListener("change", updateValue)

function updateValue(e) {
console.log(quantityInput.value)
let productCartPrice = product.productPrice * quantityInput.value
let productCartQuantity = quantityInput.value
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const priceTotal = productCartPrice.reduce(reducer)
  document.getElementById("totalPrice").textContent = priceTotal
  const quantityTotal = quantityTotalCalc.reduce(reducer)
  document.getElementById("totalQuantity").textContent = quantityTotal
}
}
