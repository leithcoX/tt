
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

  cart_button = document.createElement("a")
  cart_button.className = "consultar-button"
  cart_button.href = "#"
  cart_button.innerHTML = "Agregar al carrito"

  card_body.appendChild(item_title)
  card_body.appendChild(cart_button)
  container.appendChild(image)
  container.appendChild(card_body)

  return container
}

function generateShopItems(items) {
  const menu = document.getElementById("products-menu")
  for (let i=0; i <4; i++){
    menu.appendChild(createItem(productExample))
  }

}

function main() {
  validateFormFields()
}

main()
