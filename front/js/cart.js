/*on recupere les produits du localStorage*/
let productCartStorage = JSON.parse(localStorage.getItem("product"));
const userCart = document.getElementById("cart__items")
const priceTotalCalc = []
const quantityTotalCalc =[]

/* si page de confirmation affiche le numéro de commande*/
if (location.href.match(/confirmation/)) {
  const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
  document.getElementById("orderId").textContent = `${id}`
 
}
else {
  /* pannier vide*/
if(productCartStorage === null || productCartStorage == 0){
  const cartEmpty = 
  `<div> Le panier est vide </div>`
  userCart.innerHTML = cartEmpty
  document.getElementById("totalPrice").textContent = "0"
  document.getElementById("totalQuantity").textContent = "0"
}
else{ 
  /*création et affichage de tous les produits*/
for (i = 0; i < productCartStorage.length; i++) { 
  const couch = productCartStorage[i]
  const totalItemPrice = couch.productPrice * couch.productQuantity
const newArticle = document.createElement("article")
newArticle.className = "cart__item";
newArticle.setAttribute(`data-id`, `${couch.productId}`)
newArticle.setAttribute(`data-color`, `${couch.productColor}`)
const newDivImg = document.createElement("div")
newDivImg.className = "cart__item__img";

const newImg = document.createElement("img")
newImg.setAttribute(`src`, `${couch.productImg}`)
newImg.setAttribute(`alt`, `${couch.productImgAlt}`)

const newDivItem = document.createElement("div")
newDivItem.className = "cart__item__content"

const newDivItemDescription = document.createElement("div")
newDivItemDescription.className = "cart__item__content__description"

const newDescriptionName = document.createElement("h2")
newDescriptionName.textContent = `${couch.productName}`

const newDescriptionColor = document.createElement("p")
newDescriptionColor.textContent = `${couch.productColor}`

const newDescriptionPrice = document.createElement("p")
newDescriptionPrice.className = "priceCalc"
newDescriptionPrice.textContent = `${totalItemPrice},00 €`

const newDivItemSettings = document.createElement("div")
newDivItemSettings.className = "cart__item__content__settings"

const newSettingsQuantity = document.createElement("div")
newSettingsQuantity.className = "cart__item__content__settings__quantity"

const newQuantityP = document.createElement("p")
newQuantityP.textContent = `Qté :`

const newQuantityInput = document.createElement("input")
newQuantityInput.className = "itemQuantity"
newQuantityInput.setAttribute(`type`, `number`)
newQuantityInput.setAttribute(`name`, `itemQuantity`)
newQuantityInput.setAttribute(`min`, `1`)
newQuantityInput.setAttribute(`max`, `100`)
newQuantityInput.setAttribute(`value`, `${couch.productQuantity}`)

const newSettingsDelete = document.createElement("div")
newSettingsDelete.className = "cart__item__content__settings__delete"

const newDeleteP = document.createElement("p")
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

/* suppression des articles */
const deleteProduct = couch.productId + couch.productColor
function deleteP() {
  productCartStorage = productCartStorage.filter((el) => el.productId + el.productColor !== deleteProduct)
  localStorage.setItem("product", JSON.stringify(productCartStorage))
  window.location.href = "cart.html"
}
newDeleteP.addEventListener("click", deleteP, true)

/* envoi des valeurs pour calcul du prix total et quantité totale*/
const quantityValue = parseInt(newQuantityInput.value)
priceTotalCalc.push(totalItemPrice)
quantityTotalCalc.push(quantityValue)

/* calcul prix total d'un produit dynamiquement*/
const price = productCartStorage[i].productPrice
newQuantityInput.addEventListener("change", (e) =>{
  const inputValue = newQuantityInput.value
const totalItemPrice = price * inputValue
newDescriptionPrice.textContent = `${totalItemPrice},00 €`

})    
}
priceQuantityTotal(priceTotalCalc, quantityTotalCalc)

/*calcul du prix total et quantité totale dynamiquement*/
const priceCalc = document.getElementsByClassName("priceCalc")
const newQuantityInput = document.getElementsByClassName("itemQuantity")

for (item of newQuantityInput) {
item.addEventListener("change", (e) =>{
  const priceTotalCalc = []
  const quantityTotalCalc = []
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
  priceQuantityTotal(priceTotalCalc, quantityTotalCalc)
})
}
}

/*fonction pour les calculs totaux*/
function priceQuantityTotal(priceTotalCalc, quantityTotalCalc) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue
const priceTotal = priceTotalCalc.reduce(reducer)
document.getElementById("totalPrice").textContent = priceTotal
const quantityTotal = quantityTotalCalc.reduce(reducer)
document.getElementById("totalQuantity").textContent = quantityTotal
}


    /*validation du formulaire et envoi en POST*/
    const order = document.getElementById("order");
    const regexName = /^[a-z ,.'-]+$/i
    const regexCity = /^[a-z ,.'-]+$/i
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

    /* suppression des messages d'erreur au focus d'un input */
const formInput = document.querySelectorAll("form input")
for (item of formInput){
item.addEventListener("focus", (event) => {
  mailError.textContent ="" 
  lastNameError.textContent =""
  firstNameError.textContent =""
  cityError.textContent =""
  addressError.textContent =""
})
}
    const mailError = document.getElementById("emailErrorMsg")
    const lastNameError = document.getElementById("lastNameErrorMsg")
    const firstNameError = document.getElementById("firstNameErrorMsg")
    const cityError = document.getElementById("cityErrorMsg")
    const addressError = document.getElementById("addressErrorMsg")

    order.addEventListener("click", (event) => {
        /* on prépare les infos pour l'envoi en POST*/
        let contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        };
        /* on valide que le formulaire soit correctement rempli*/
        if (
            (regexMail.test(contact.email) == true) &
            (regexName.test(contact.firstName) == true) &
            (regexName.test(contact.lastName) == true) &
            (regexCity.test(contact.city) == true) &
            (regexAddress.test(contact.address) == true) 
           
        ) {
            event.preventDefault();
            /*on efface les produits et le localStorage*/

            if (productCartStorage){
            let products = [];
            for (couch of productCartStorage) {
                products.push(couch.productId);
            }
            localStorage.clear("product")
          

            /* on envoie en POST*/
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
              }
          }
          /* message d'erreur si formulaire mal rempli*/
          else if(regexMail.test(contact.email) == false){
            event.preventDefault();
            mailError.textContent ="Veuillez saisir une adresse mail valide." 
          }
          else if(regexName.test(contact.firstName) == false){
            event.preventDefault();
            firstNameError.textContent ="Veuillez saisir un prénom valide." 
          }
          else if(regexName.test(contact.lastName) == false){
            event.preventDefault();
            lastNameError.textContent ="Veuillez saisir un nom valide." 
          }
          else if(regexCity.test(contact.city) == false){
            event.preventDefault();
            cityError.textContent ="Veuillez saisir une ville valide." 
          }
          else if(regexAddress.test(contact.address) == false){
            event.preventDefault();
            addressError.textContent ="Veuillez saisir une adresse valide." 
          }
      })
    }

