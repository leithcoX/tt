function updateSummary() {
  let total_price = 0
  let total_items = 0
  const ids = JSON.parse(localStorage.getItem("ids"))
  for (let id in ids) {
    const ammount = parseInt(ids[id])
    total_items += ammount
    total_price += JSON.parse(localStorage.getItem(id)).price * ammount
  }
  document.getElementById("total-price").textContent = "$" + total_price
  document.getElementById("total-items-ammount").textContent = "ITEMS " + total_items

}

function updateItem(event, id, must_add) {
  let ids = JSON.parse(localStorage.getItem("ids"))
  if (must_add) {
      ids[id]++
      updateCounter(1)
  } else {
      if (ids[id] === 0) return
      ids[id]--
      updateCounter(-1)
  }
  localStorage.setItem("ids", JSON.stringify(ids))
  event.target.parentNode.querySelector("input").setAttribute("value",ids[id])
  updateSummary()
}

function removeFromCart(id) {
  let ids = JSON.parse(localStorage.getItem("ids"))
  updateCounter(- ids[id])
  delete ids[id]
  localStorage.setItem("ids", JSON.stringify(ids))
  location.reload()
}

function createHTMLItem(product,ammount) {
  let item_container = document.createElement("article")
  item_container.innerHTML = `
    <a href="product.html?id=${product.id}">
      <img class="item-image" src="${product.image}" alt="${product.name}">
    </a>
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
  const ids_string = localStorage.getItem("ids")
  if (ids_string == null)
      return

  const ids = JSON.parse(ids_string)
  const separator = document.createElement("hr")
  outer_container = document.getElementById("cart-options")
  outer_container.before(separator)

  let counter = 0
  for (let id in ids) {
    let product = JSON.parse(localStorage.getItem(id))
    outer_container.before(createHTMLItem(product, ids[id]))
    counter++
    outer_container.before(separator.cloneNode())
  }
}

function clearCart() {
  localStorage.clear()
  localStorage.setItem("counter", 0)
  localStorage.setItem("ids", "{}")
}

function main() {
  if (localStorage.getItem("ids") == '{}') {
      document.getElementById("cart-menu").style.display = "none"
  } else {
      generateItems()
      updateSummary()
  }
}

main()
