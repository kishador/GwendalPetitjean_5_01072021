let productCartStorage = JSON.parse(localStorage.getItem("product"));
const userCart = document.getElementById("cart__items")
let priceTotalCalc = []
let quantityTotalCalc =[]

if(productCartStorage === null || productCartStorage == 0){
  const cartEmpty = 
  `<div> Le panier est vide </div>`
  userCart.innerHTML = cartEmpty
  document.getElementById("totalPrice").textContent = "0"
  document.getElementById("totalQuantity").textContent = "0"
}
else{ 
for (i = 0; i < productCartStorage.length; i++) { 
  const couch = productCartStorage[i]
  let totalItemPrice = couch.productPrice * couch.productQuantity
let newArticle = document.createElement("article")
newArticle.className = "cart__item";
newArticle.setAttribute(`data-id`, `${couch.productId}`)
newArticle.setAttribute(`data-color`, `${couch.productColor}`)

let newDivImg = document.createElement("div")
newDivImg.className = "cart__item__img";

let newImg = document.createElement("img")
newImg.setAttribute(`src`, `${couch.productImg}`)
newImg.setAttribute(`alt`, `${couch.productImgAlt}`)

let newDivItem = document.createElement("div")
newDivItem.className = "cart__item__content"

let newDivItemDescription = document.createElement("div")
newDivItemDescription.className = "cart__item__content__description"

let newDescriptionName = document.createElement("h2")
newDescriptionName.textContent = `${couch.productName}`

let newDescriptionColor = document.createElement("p")
newDescriptionColor.textContent = `${couch.productColor}`

let newDescriptionPrice = document.createElement("p")
newDescriptionPrice.textContent = `${totalItemPrice},00 €`

let newDivItemSettings = document.createElement("div")
newDivItemSettings.className = "cart__item__content__settings"

let newSettingsQuantity = document.createElement("div")
newSettingsQuantity.className = "cart__item__content__settings__quantity"

let newQuantityP = document.createElement("p")
newQuantityP.textContent = `Qté :`

let newQuantityInput = document.createElement("input")
newQuantityInput.className = "itemQuantity"
newQuantityInput.setAttribute(`type`, `number`)
newQuantityInput.setAttribute(`name`, `itemQuantity`)
newQuantityInput.setAttribute(`min`, `1`)
newQuantityInput.setAttribute(`max`, `100`)
newQuantityInput.setAttribute(`value`, `${couch.productQuantity}`)

let newSettingsDelete = document.createElement("div")
newSettingsDelete.className = "cart__item__content__settings__delete"

let newDeleteP = document.createElement("p")
newDeleteP.className = "deleteItem"
newDeleteP.textContent = "Supprimer"

newSettingsDelete.prepend(newDeleteP)
newSettingsQuantity.prepend(newQuantityP)
newSettingsQuantity.append(newQuantityInput)
newDivItemSettings.prepend(newSettingsQuantity)
newDivItemSettings.append(newSettingsDelete)
newDivItemDescription.prepend(newDescriptionName)
newDivItemDescription.append(newDescriptionColor)
newDivItemDescription.append(newDescriptionPrice)
newDivItem.prepend(newDivItemDescription)
newDivItem.append(newDivItemSettings)
newDivImg.prepend(newImg)
newArticle.prepend(newDivImg)
newArticle.append(newDivItem)
userCart.prepend(newArticle)

/* SUPPRESSION DES ARTICLES */
let deleteProduct = couch.productId + couch.productColor
function deleteP() {
  productCartStorage = productCartStorage.filter((el) => el.productId + el.productColor !== deleteProduct)
  localStorage.setItem("product", JSON.stringify(productCartStorage))
  window.location.href = "cart.html"
}
newDeleteP.addEventListener("click", deleteP, true)

priceTotalCalc.push(totalItemPrice)

quantityTotalCalc.push(newQuantityInput.value)

const reducer = (accumulator, currentValue) => accumulator + currentValue
const priceTotal = priceTotalCalc.reduce(reducer)
document.getElementById("totalPrice").textContent = priceTotal
const quantityTotal = quantityTotalCalc.reduce(reducer)
document.getElementById("totalQuantity").textContent = quantityTotal

let price = productCartStorage[i].productPrice
newQuantityInput.addEventListener("change", (e) =>{
  let inputValue = newQuantityInput.value
let totalItemPrice = price * inputValue
newDescriptionPrice.textContent = `${totalItemPrice},00 €`
})    
}
}
/* envoi du formulaire et tableau produit */
const order = document.getElementById("order")
function orderCart() {
  const firstNameForm = document.getElementById("firstName")
  const lastNameForm = document.getElementById("lastName")
  const addressForm = document.getElementById("address")
  const cityForm = document.getElementById("city")
  const emailForm = document.getElementById("email")
  const cartOrder = [] 
    let formulaire = {
      firstName: firstNameForm.value,
      lastName: lastNameForm.value,
      adress: addressForm.value,
      city: cityForm.value,
      email: emailForm.value
    }
    cartOrder.push(productCartStorage)
    cartOrder.push(formulaire)
  }


order.addEventListener("click", orderCart)


