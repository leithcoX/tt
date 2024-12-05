
function printCart() {
    ids = localStorage.getItem("ids")
    if (ids == null) {
        console.log("No hay nada")
        return
    }

    ids = JSON.parse(ids)
    console.log(ids)
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


function listItems() {
    ids_string = localStorage.getItem("ids")
    if (ids_string == null) {
        console.log("No hay nada")
        return
    }
    for (let id of JSON.parse(ids_string)) {

        product = JSON.parse(localStorage.getItem(id))
        // console.log(id,product)
        newElement = createItem(product)
        document.getElementById("products-container").appendChild(newElement)
    }
}

printCart()
listItems()
