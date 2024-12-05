
function areFieldsComplete() {
    for (const input_field of document.getElementById("contact-form"))
        if (!input_field.value.trim())
            return false
    return true
}

function validateFormFields() {
    console.log("Los campos del forulario", (areFieldsComplete() ? "Sí" : "NO"), "están completos")
}

function addProductToCart(product) {
  console.log("Added",product)
  sessionStorage.setItem(product.id,JSON.stringify(product))
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
  cart_button.addEventListener("click",function (event) {
    addProductToCart(product)
  })

  card_body.appendChild(item_title)
  card_body.appendChild(price)
  card_body.appendChild(cart_button)
  container.appendChild(image)
  container.appendChild(card_body)

  return container
}

function getStaticShopItems() {
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

async function getShopItems(n) {
  try {
    const response = await fetch('https://fakestoreapi.com/products?limit='+n)
    const data = await response.json()
    productsList = []
    for (let product of data) {
      productsList.push(
        {
          "id": product.id,
          "name": product.title,
          "img": {"src": product.image},
          "price": product.price,
        }
      )
    }
    return productsList
  } catch (error) {
    console.log("Error:", error)
    return getStaticShopItems()
  }
}

function generateShopItems(productsList) {
  const menu = document.getElementById("products-menu")
  for (let product of productsList){
    menu.appendChild(createItem(product))
  }
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

function generateReviews(n) {
  container = document.getElementById("reviews-container")
  for (let i=0; i < n; i++) container.appendChild(createReview())
}

async function main() {
  validateFormFields()
  generateReviews(6)
  const productList = await getShopItems(10)
  generateShopItems(productList)
  // generateShopItems(productList)
  // generateShopItems
}

main()
