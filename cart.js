function updateSummary() {
  let total_price = 0
  let total_items = 0
  ids = JSON.parse(localStorage.getItem("ids"))
  for (let id in ids) {
    ammount = parseInt(ids[id])
    total_items += ammount
    total_price += JSON.parse(localStorage.getItem(id)).price * ammount
  }
  document.getElementById("total-price").textContent = "$" + total_price
  document.getElementById("total-items-ammount").textContent = "ITEMS " + total_items

}

function updateItem(event, id, must_add) {
  ids = JSON.parse(localStorage.getItem("ids"))
  if (must_add) {
    ids[id] += 1
  } else {
      if (ids[id] === 0)
        return
      ids[id] -= 1
  }
  localStorage.setItem("ids", JSON.stringify(ids))
  console.log(event.target.parentNode.querySelector("input").setAttribute("value",ids[id]))
  updateSummary()
}

function removeFromCart(id) {
  ids = JSON.parse(localStorage.getItem("ids"))
  delete ids[id]
  localStorage.setItem("ids", JSON.stringify(ids))
  location.reload()
}

function createHTMLItem(product,ammount) {
  item_container = document.createElement("article")
  item_container.innerHTML = `
    <img class="item-image" src="${product.img.src}" alt="${product.name}">
    <span class="item-title">${product.name}</span>
    <span class="ammount-container">
      <button onclick="updateItem(event,${product.id},false)">-</button>
      <input class="ammount-holder" type="number" value="${ammount}" disabled>
      <button onclick="updateItem(event,${product.id},true)">+</button>
    </span>
    <span>
      $
      <span>
        ${product.price}
      </span>
    </span>

    <button class="btn btn-danger" onclick="removeFromCart(${product.id})">
      <i class="nf nf-oct-trash"></i>
    </button>
  `
  return item_container
}

function generateItems() {
  let counter = 0
  ids_string = localStorage.getItem("ids")
  if (ids_string == null)
      return

  ids = JSON.parse(ids_string)
  separator = document.createElement("hr")
  outer_container = document.getElementById("cart-options")
  outer_container.before(separator)
  for (let id in ids) {
    product = JSON.parse(localStorage.getItem(id))
    outer_container.before(createHTMLItem(product, ids[id]))
    counter++
    outer_container.before(separator.cloneNode())
  }
}

function clearCart() {
  localStorage.clear()
}

function main() {
  generateItems()
  updateSummary()
}

main()
