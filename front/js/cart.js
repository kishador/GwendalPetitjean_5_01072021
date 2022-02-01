let productCartStorage = JSON.parse(localStorage.getItem("product"));
const userCart = document.getElementById("cart__items");
const priceTotalCalc = [];
const quantityTotalCalc = [];

if (location.href.match(/confirmation/)) {
  confirmationId()
  /* si page de confirmation affiche le numéro de commande*/
  function confirmationId(){
    const str = window.location.href;
    const url = new URL(str);
    const id = url.searchParams.get("id");
    document.getElementById("orderId").textContent = `${id}`;
  }
} else {
  if (productCartStorage === null || productCartStorage == 0) {
    cartEmpty()
  } else {
    (async function () {
      const quantityTotalCalc = [];
      for (let i = 0; i < productCartStorage.length; i++) {
        quantityTotalCalc.push(productCartStorage[i].productQuantity);
        let couch = productCartStorage[i];

        let article = await getProduct(couch);
        printItems(couch, article);
      }
      priceQuantityTotal(quantityTotalCalc, priceTotalCalc);
      quantityDyn();
    })();
  }
 /* pannier vide*/
  function cartEmpty(){
    const cartEmpty = `<div> Le panier est vide </div>`;
    userCart.innerHTML = cartEmpty;
    document.getElementById("totalPrice").textContent = "0";
    document.getElementById("totalQuantity").textContent = "0";
  }
/* récupération données de l'API*/
function getProduct(couch) {
  return fetch(`http://localhost:3000/api/products/${couch.productId}`)
    .then((jsondata) => jsondata.json())
    .then((data) => {
      return data;
    })
    .catch(function (error) {
      alert(error);
    });
}
/* on crée et on injecte le html avec les données du fetch et localstorage */
function printItems(couch, article) {
  const newArticle = document.createElement("article");
  newArticle.className = "cart__item";
  newArticle.setAttribute(`data-id`, `${couch.productId}`);
  newArticle.setAttribute(`data-color`, `${couch.productColor}`);
  const newDivImg = document.createElement("div");
  newDivImg.className = "cart__item__img";

  const newImg = document.createElement("img");
  newImg.setAttribute(`src`, `${article.imageUrl}`);
  newImg.setAttribute(`alt`, `${article.altTxt}`);

  const newDivItem = document.createElement("div");
  newDivItem.className = "cart__item__content";

  const newDivItemDescription = document.createElement("div");
  newDivItemDescription.className = "cart__item__content__description";

  const newDescriptionName = document.createElement("h2");
  newDescriptionName.textContent = `${article.name}`;

  const newDescriptionColor = document.createElement("p");
  newDescriptionColor.textContent = `${couch.productColor}`;

  const newDescriptionPrice = document.createElement("p");
  newDescriptionPrice.className = "priceCalc";
  const totalItemPrice = article.price * couch.productQuantity;
  newDescriptionPrice.innerText = `${totalItemPrice},00 €`;
  priceTotalCalc.push(totalItemPrice);

  const newDivItemSettings = document.createElement("div");
  newDivItemSettings.className = "cart__item__content__settings";

  const newSettingsQuantity = document.createElement("div");
  newSettingsQuantity.className = "cart__item__content__settings__quantity";

  const newQuantityP = document.createElement("p");
  newQuantityP.textContent = `Qté :`;

  const newQuantityInput = document.createElement("input");
  newQuantityInput.className = "itemQuantity";
  newQuantityInput.setAttribute(`type`, `number`);
  newQuantityInput.setAttribute(`name`, `itemQuantity`);
  newQuantityInput.setAttribute(`min`, `1`);
  newQuantityInput.setAttribute(`max`, `100`);
  newQuantityInput.setAttribute(`value`, `${couch.productQuantity}`);

  const newSettingsDelete = document.createElement("div");
  newSettingsDelete.className = "cart__item__content__settings__delete";

  const newDeleteP = document.createElement("p");
  newDeleteP.className = "deleteItem";
  newDeleteP.textContent = "Supprimer";

  newSettingsDelete.prepend(newDeleteP);
  newSettingsQuantity.prepend(newQuantityP);
  newSettingsQuantity.append(newQuantityInput);
  newDivItemSettings.prepend(newSettingsQuantity);
  newDivItemSettings.append(newSettingsDelete);
  newDivItemDescription.prepend(newDescriptionName);
  newDivItemDescription.append(newDescriptionColor);
  newDivItemDescription.append(newDescriptionPrice);
  newDivItem.prepend(newDivItemDescription);
  newDivItem.append(newDivItemSettings);
  newDivImg.prepend(newImg);
  newArticle.prepend(newDivImg);
  newArticle.append(newDivItem);
  userCart.prepend(newArticle);

  deleteProd(couch, newDeleteP);

  onePriceDyn(article, newDescriptionPrice);
}
  /* suppression des articles */
  function deleteProd(couch, newDeleteP) {
    const deleteProduct = couch.productId + couch.productColor;
    function deleteP() {
      productCartStorage = productCartStorage.filter(
        (el) => el.productId + el.productColor !== deleteProduct
      );
      localStorage.setItem("product", JSON.stringify(productCartStorage));
      window.location.href = "cart.html";
    }
    newDeleteP.addEventListener("click", deleteP, true);
  }
/* calcul quantité et prix dynamiquement*/
function quantityDyn() {
  const newQuantityInput = document.querySelectorAll("#cart__items input");
  for (item of newQuantityInput) {
    item.addEventListener("change", (e) => {
      const priceCalc = document.getElementsByClassName("priceCalc");
      const quantityTotalCalc = [];
      const priceTotalCalc = [];
      for (item of newQuantityInput) {
        const quantityValue = parseInt(item.value);
        quantityTotalCalc.push(quantityValue);
      }
      for (item of priceCalc) {
        let valueItem = item.textContent;
        valueItem = valueItem.replace(",00 €", "");
        const priceValue = parseInt(valueItem);
        priceTotalCalc.push(priceValue);
      }

      priceQuantityTotal(quantityTotalCalc, priceTotalCalc);
    });
  }
}
/* calcul prix total d'un produit dynamiquement*/
function onePriceDyn(article, newDescriptionPrice) {
  const newQuantityInput = document.querySelector(".itemQuantity");
  const price = article.price;
  newQuantityInput.addEventListener("change", (e) => {
    const totalItemPrice = price * newQuantityInput.value;
    newDescriptionPrice.textContent = `${totalItemPrice},00 €`;
  });
}

  /*fonction pour les calculs totaux*/
  function priceQuantityTotal(quantityTotalCalc, priceTotalCalc) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const quantityTotal = quantityTotalCalc.reduce(reducer);

    document.getElementById("totalQuantity").textContent = quantityTotal;
    const priceTotal = priceTotalCalc.reduce(reducer);
    document.getElementById("totalPrice").textContent = priceTotal;
  }

  /*validation du formulaire et envoi en POST*/
  const order = document.getElementById("order");
  
  function validMail(contact){
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    return regexMail.test(contact.email)
  }
  function validName(contact){
    const regexName = /^[a-z ,.'-]+$/i;
    return regexName.test(contact.firstName, contact.lastName)
  }
  function validCity(contact){
    const regexCity = /^[a-z ,.'-]+$/i;
    return regexCity.test(contact.city)
  }
  function validAddress(contact){
    const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
    return regexAddress.test(contact.address)
  }

  /* suppression des messages d'erreur au focus d'un input */
  const formInput = document.querySelectorAll("form input");
  for (item of formInput) {
    item.addEventListener("focus", (event) => {
      mailError.textContent = "";
      lastNameError.textContent = "";
      firstNameError.textContent = "";
      cityError.textContent = "";
      addressError.textContent = "";
    });
  }
  const mailError = document.getElementById("emailErrorMsg");
  const lastNameError = document.getElementById("lastNameErrorMsg");
  const firstNameError = document.getElementById("firstNameErrorMsg");
  const cityError = document.getElementById("cityErrorMsg");
  const addressError = document.getElementById("addressErrorMsg");

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
      validMail(contact) &
      validName(contact) &
      validCity(contact) &
      validAddress(contact)  
    ) {
      event.preventDefault();
      /*on efface les produits et le localStorage*/

      if (productCartStorage) {
        let products = [];
        for (couch of productCartStorage) {
          products.push(couch.productId);
        }
        localStorage.clear("product");

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
            document.location.href = `confirmation.html?id=${data.orderId}`;
          })
          .catch((erreur) => console.log("erreur : " + erreur));
      }
    } else if (!validMail(contact)) {
    /* message d'erreur si formulaire mal rempli*/
      event.preventDefault();
      mailError.textContent = "Veuillez saisir une adresse mail valide.";
    } else if (!validName(contact)) {
      event.preventDefault();
      firstNameError.textContent = "Veuillez saisir un prénom valide.";
      lastNameError.textContent = "Veuillez saisir un nom valide.";
    } else if (!validCity(contact)) {
      event.preventDefault();
      cityError.textContent = "Veuillez saisir une ville valide.";
    } else if (!validAddress(contact)) {
      event.preventDefault();
      addressError.textContent = "Veuillez saisir une adresse valide.";
    }
  });
}