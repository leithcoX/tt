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
  document.getElementById("total-price").innerHTML = formatPrice(total)
}

function clearCart() {
  localStorage.clear()
}

function main() {
  generateItems()
  // updateSummary()
}

main()
