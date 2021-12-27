let productCartStorage = JSON.parse(localStorage.getItem("product"));
const userCart = document.getElementById("cart__items")
let priceTotalCalc = []
let quantityTotalCalc =[]


if (location.href.match(/confirmation/)) {
  const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
  document.getElementById("orderId").textContent = `${id}`
 
}
else {
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
newDescriptionPrice.className = "priceCalc"
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

const quantityValue = parseInt(newQuantityInput.value)
priceTotalCalc.push(totalItemPrice)
quantityTotalCalc.push(quantityValue)



let price = productCartStorage[i].productPrice
newQuantityInput.addEventListener("change", (e) =>{
  let inputValue = newQuantityInput.value
let totalItemPrice = price * inputValue
newDescriptionPrice.textContent = `${totalItemPrice},00 €`

})    
}
function priceQuantityTotal() {
  const reducer = (accumulator, currentValue) => accumulator + currentValue
const priceTotal = priceTotalCalc.reduce(reducer)
document.getElementById("totalPrice").textContent = priceTotal
const quantityTotal = quantityTotalCalc.reduce(reducer)
document.getElementById("totalQuantity").textContent = quantityTotal
}
priceQuantityTotal()

let priceCalc = document.getElementsByClassName("priceCalc")
let newQuantityInput = document.getElementsByClassName("itemQuantity")
for (item of newQuantityInput) {
item.addEventListener("change", (e) =>{
  let priceTotalCalc = []
  let quantityTotalCalc = []
  for (item of newQuantityInput) {
    const quantityValue = parseInt(item.value)
    quantityTotalCalc.push(quantityValue)
  }
  for (item of priceCalc) {
  let valueItem = item.textContent
  valueItem = valueItem.replace(",00 €", "")
  const priceValue = parseInt(valueItem)
  priceTotalCalc.push(priceValue)
  }
const reducer = (accumulator, currentValue) => accumulator + currentValue
const priceTotal = priceTotalCalc.reduce(reducer)
document.getElementById("totalPrice").textContent = priceTotal
const quantityTotal = quantityTotalCalc.reduce(reducer)
document.getElementById("totalQuantity").textContent = quantityTotal
})
}
}



    //validation du formulaire et envoie en POST
    const order = document.getElementById("order");
    const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

    order.addEventListener("click", (event) => {
        // on prépare les infos pour l'envoie en POST
        let contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        };
        // on valide que le formulaire soit correctement rempli
        if (
            (regexMail.test(contact.email) == true) &
            (regexName.test(contact.firstName) == true) &
            (regexName.test(contact.lastName) == true) &
            (regexCity.test(contact.city) == true) &
            (regexAddress.test(contact.address) == true) 
           
        ) {
            event.preventDefault();
            

            let products = [];
            for (couch of productCartStorage) {
                products.push(couch.productId);
                console.log(products)
            }
            localStorage.clear("product")

            // on envoie en POST
            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contact, products }),
            })
                .then((response) => response.json())
                .then((data) => {
                    document.location.href = `confirmation.html?id=${data.orderId}`


                })
                .catch((erreur) => console.log("erreur : " + erreur));
          } else {
            alert(
                "Veuillez remplir le formulaire afin de valider votre commande."
            );
        }
      })
    }

