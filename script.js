
function areFieldsComplete() {
    for (const input_field of document.getElementById("contact-form")) {
        // console.log(input_field)
        if (!input_field.value.trim())
            return false
    }
    return true
}

function validateFormFields() {
    console.log("Los campos del forulario", (areFieldsComplete() ? "Sí" : "NO"), "están completos")
}

const productExample = {
  "name" : "Nombre de producto",
  "img" : {"src" : "./img/prods/resmatempo.jpg"},
}


function createItem(product) {

  container = document.createElement("div")
  container.className = "card"

  image = document.createElement("img")
  image.src = product.img.src

  card_body = document.createElement("div")
  card_body.className="card-body"

  item_title = document.createElement("h5")
  item_title.className = "gantari-font"
  item_title.innerHTML = product.name

  price = document.createElement("h5")
  // price.className = "gantari-font"
  price.innerHTML = product.price
  price.innerHTML = Math.floor(Math.random() * 5000) + 5000

  cart_button = document.createElement("a")
  cart_button.className = "consultar-button"
  cart_button.href = "#"
  cart_button.innerHTML = "Agregar al carrito"

  card_body.appendChild(item_title)
  card_body.appendChild(price)
  card_body.appendChild(cart_button)
  container.appendChild(image)
  container.appendChild(card_body)

  return container
}

function getShopItems() {
  return [
      {
        "name" : "Chambril 150 hojas blancas A4 180g",
        "img" : {"src" : "./img/prods/pila_chambril.jpg"},
        "price" : 1000,
      },
      {
        "name" : "Resma boreal A4 80g",
        "img" : {"src" : "./img/prods/resmaboreal.jpg"},
        "price" : 2000,
      },
      {
        "name" : "Resma tempo carta 75g",
        "img" : {"src" : "./img/prods/resmatempo.jpg"},
        "price" : 4000,
      },
    ]
}

function generateShopItems(productsList) {
  const menu = document.getElementById("products-menu")
  for (let product of productsList)
    menu.appendChild(createItem(product))
}

function createReview() {
  review = document.createElement("div")
  review.className = "review"

  score = document.createElement("div")
  score.className = "score"

  rate = Math.floor(Math.random() * 3) + 2
  for (let i=0; i<5; i++) {
    star = document.createElement("i")
    empty = i > rate ? "_o" : ""
    star.className = "nf nf-fa-star" + empty
    score.appendChild(star)
  }

  reviewer_name = document.createElement("div")
  reviewer_name.className = "review-name"
  reviewer_name.innerHTML = "Nombre"

  text = document.createElement("p")
  text.classreviewer_name = "review-text"
  text.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at metus eleifend, rhoncus dolor nec"

  review.appendChild(score)
  review.appendChild(reviewer_name)
  review.appendChild(text)

  return review
}

function generateReviews(ammount) {
  container = document.getElementById("reviews-container")
  for (let i=0; i < ammount; i++) container.appendChild(createReview())
}

function main() {
  validateFormFields()
  generateReviews(6)
  productList = getShopItems()
  generateShopItems(productList)
  generateShopItems(productList)
}
main()
