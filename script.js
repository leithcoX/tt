
function areFieldsComplete() {
    for (const input_field of document.getElementById("contact-form"))
        if (!input_field.value.trim())
            return false
    return true
}

function validateFormFields() {
    console.log("Los campos del formulario", (areFieldsComplete() ? "Sí" : "NO"), "están completos")
}

function updateProductInCart(product) {
  const ids_string = localStorage.getItem("ids")
  let ids = ids_string ? JSON.parse(ids_string) : {}
  if (!(product.id in ids)) {
    ids[product.id] = 0
    localStorage.setItem(product.id,JSON.stringify(product))
  }
  ids[product.id] += 1
  localStorage.setItem("ids", JSON.stringify(ids))
  updateCounter(1)
}


function createItem(product) {
  let container = document.createElement("div")
  container.className = "card"
  // container.id = `prodid${product.id}`

  let imageLink = document.createElement("a")
  imageLink.href = "product.html?id=" + product.id

  let image = document.createElement("img")
  image.src = product.image

  imageLink.appendChild(image)

  let card_body = document.createElement("div")
  card_body.className="card-body justify-content-between"

  let item_title = document.createElement("h5")
  item_title.className = "card-title gantari-font"
  item_title.innerHTML = product.name

  let price = document.createElement("h5")
  price.className = "card-text price-value"
  price.innerHTML = "$"+Number(product.price).toLocaleString("sp")
  

  let cart_button = document.createElement("button")
  cart_button.className = "btn btn-outline-primary"
  cart_button.type = "button"
  cart_button.innerHTML = "Agregar al carrito"
  cart_button.addEventListener("click",function (event) {
    updateProductInCart(product)
  })

  card_body.appendChild(item_title)
  card_body.appendChild(price)
  card_body.appendChild(cart_button)
  container.appendChild(imageLink)
  container.appendChild(card_body)

  return container
}

function getStaticShopItems() {
  return [
      {
        "name" : "Chambril 150 hojas blancas A4 180g",
        "image" : "./img/prods/pila_chambril.jpg",
        "price" : 1000,
      },
      {
        "name" : "Resma boreal A4 80g",
        "image" : "./img/prods/resmaboreal.jpg",
        "price" : 2000,
      },
      {
        "name" : "Resma tempo carta 75g",
        "image" : "./img/prods/resmatempo.jpg",
        "price" : 4000,
      },
      {
        "name" : "Chambril 150 hojas blancas A4 180g",
        "image" : "./img/prods/pila_chambril.jpg",
        "price" : 1000,
      },
      {
        "name" : "Resma boreal A4 80g",
        "image" : "./img/prods/resmaboreal.jpg",
        "price" : 2000,
      },
      {
        "name" : "Resma tempo carta 75g",
        "image" : "./img/prods/resmatempo.jpg",
        "price" : 4000,
      },
    ]
}

async function getShopItems(n) {
  try {
    // const response = await fetch('https://fakestoreapi.com/products?limit='+n)
    const response = await fetch('https://leithcox.pythonanywhere.com/get_products/'+n)
    const data = await response.json()
    productsList = []
    for (let product of data) {
      productsList.push(
        {
          "id": product[0],
          "name": product[1],
          "image": product[2],
          "price": product[3],
        }
      )
    }
    return productsList
  } catch (error) {
    console.log("Error:", error)
    return getStaticShopItems()
  }
}

async function generateShopItems(n) {
  const productList = await getShopItems(n)

  const menu = document.getElementById("products-menu")
  for (let product of productsList){
    menu.appendChild(createItem(product))
  }
}

function createReview() {
  let review = document.createElement("div")
  review.className = "review"

  let score = document.createElement("div")
  score.className = "score"

  let rate = Math.floor(Math.random() * 3) + 2
  for (let i=0; i<5; i++) {
    star = document.createElement("i")
    empty = i > rate ? "_o" : ""
    star.className = "nf nf-fa-star" + empty
    score.appendChild(star)
  }

  let reviewer_name = document.createElement("div")
  reviewer_name.className = "review-name"
  reviewer_name.innerHTML = "Nombre"

  let text = document.createElement("p")
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


function main() {
  validateFormFields()
  generateReviews(6)
  generateShopItems(5)
}

main()
