function createItem(product) {
  container = document.createElement("div")
  container.id = `prod_id${product.id}`
  container.className = "row mb-4 d-flex justify-content-between align-items-center cart-item"

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
    <button data-mdb-button-init="" data-mdb-ripple-init="" class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown();updateSummary()">
        <i class="fas fa-minus"></i>
    </button>

    <input id="form1" min="0" name="quantity" value="1" type="number" class="form-control form-control-sm" readonly>

    <button data-mdb-button-init="" data-mdb-ripple-init="" class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp();updateSummary()">
        <i class="fas fa-plus"></i>
    </button>`

    price = document.createElement("div")
    price.className = "col-md-3 col-lg-2 col-xl-2 offset-lg-1"
    price.innerHTML = `<h6 class="mb-0 price">${product.price}</h6>`


  container.appendChild(image)
  container.appendChild(item_title)
  container.appendChild(ammount_button)
  container.appendChild(price)

  return container
}

function createHTMLItem(product) {
  newElement = createItem(product)
  container = document.getElementById("prods-container")
  container.insertBefore(newElement,container.lastElementChild)
  separator = document.createElement("hr")
  separator.className = "my-4"
  container.insertBefore(separator,container.lastElementChild)
}

function generateItems() {
  let counter = 0
  ids_string = localStorage.getItem("ids")
  if (ids_string == null)
      return

  for (let id in JSON.parse(ids_string)) {
    // console.log(id)
    product = JSON.parse(localStorage.getItem(id))
    createHTMLItem(product)
    counter++
  }
}

function updateSummary() {
  let counter = 0
  let total = 0
  items = document.getElementsByClassName("cart-item")
  for (let item of items) {
    current_ammount = parseInt(item.querySelector("div input").value)
    counter += current_ammount
    total += current_ammount * parseInt(item.querySelector("div .price").innerHTML)
  }
  console.log(counter)
  console.log(items.length)

  document.getElementsByClassName("item-counter")[0].innerHTML = ("Items :" + items.length)
  document.getElementsByClassName("item-counter")[1].innerHTML = counter + " ítems"
  document.getElementById("total-price").innerHTML = total
}

function clearCart() {
  localStorage.clear()
}

function main() {
  generateItems()
  updateSummary()
}

main()
