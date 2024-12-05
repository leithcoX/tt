
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
  container.className = "row mb-4 d-flex justify-content-between align-items-center"

  image = document.createElement("div")
  image.className = "col-md-2 col-lg-2 col-xl-2"
  image.innerHTML = `<img src="${product.img.src}" class="img-fluid rounded-3 product-img" alt="Cotton T-shirt">`

  item_title = document.createElement("div")
  item_title.className = "col-md-3 col-lg-3 col-xl-3"
  item_title.innerHTML = `<h6 class="text-muted">${product.name}</h6>`
    // <h6 class="mb-0">${product.name}</h6`

  ammount_button = document.createElement("div")
  ammount_button.className = "col-md-3 col-lg-3 col-xl-2 d-flex"
  ammount_button.innerHTML = `
    <button data-mdb-button-init="" data-mdb-ripple-init="" class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
        <i class="fas fa-minus"></i>
    </button>

    <input id="form1" min="0" name="quantity" value="1" type="number" class="form-control form-control-sm">

    <button data-mdb-button-init="" data-mdb-ripple-init="" class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
        <i class="fas fa-plus"></i>
    </button>`

    price = document.createElement("div")
    price.className = "col-md-3 col-lg-2 col-xl-2 offset-lg-1"
    price.innerHTML = `<h6 class="mb-0">$ ${product.price}</h6>`


  container.appendChild(image)
  container.appendChild(item_title)
  container.appendChild(ammount_button)
  container.appendChild(price)

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
        container = document.getElementById("prods-container")
        container.insertBefore(newElement,container.lastElementChild)
        separator = document.createElement("hr")
    separator.className = "my-4"
        container.insertBefore(separator,container.lastElementChild)
        
    }
}

printCart()
listItems()
