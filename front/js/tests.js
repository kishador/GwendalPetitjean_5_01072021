fetch("http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926")
  .then(function(response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function(data) {
    console.log(data);
 const template = 
 `<a href="./product.html?id=${data._id}">
    <article>
      <img src="${data.imageUrl}" alt="${data.altTxt}">
      <h3 id="productName">${data.name}</h3>
      <p class="productDescription">${data.description}</p>
    </article>
  </a> `
    const items = document.getElementById("items")
    items.innerHTML += template

  })
   
  .catch(function(err) {
    // Une erreur est survenue
  });
  for(let i = 0; i < data.colors.lenght; i++) {
    const color = data.colors[i]
    const templateColor = `<option value="${color}">${color}</option>`
    const colorChoice = document.getElementById("colors")
    colorChoice.innerHTML += templateColor
}