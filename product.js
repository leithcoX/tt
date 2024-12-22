async function getProductInfo(id) {
  try {
    const response = await fetch('https://leithcox.pythonanywhere.com/get/'+id)
    const data = await response.json()

    return {
      "id": data[0],
      "name": data[1],
      // "referencia": data[2],
      "image": data[3],
      // "descuento": data[4],
      // "stock": data[5],
      // "valoracion": data[6],
      // "fecha": data[7],
      "price": data[8]
    }
  } catch (error) {
    console.log("Error:", error)
    // return getStaticShopItems()
  }
}

function addProductToCart(product) {
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

async function updateProductPage() {
  let productId = new URLSearchParams(window.location.search).get('id')
  let product = await getProductInfo(productId)
  let container = document.getElementById("product-container")
  container.innerHTML = `
      <div id="prod_image">
        <img src="${product.image}" alt="">
      </div>
      <div id="prod" class="d-flex flex-column justify-content-around">
        <div>
          <h1>${product.name}</h1>
          <h1 class="price"> ${product.price} </h1>
          <a href="https://leithcox.pythonanywhere.com/product/${product.id}" >Ver en la página original</a>
        </div>
        <div id="buy-buttons">
          <button class="btn btn-secondary">Agregar al carrito</button>
          <button class="btn btn-primary">Comprar</button>
        </div>
      </div>
      <div id="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu dui id nunc fringilla aliquam vitae
        facilisis est. Ut vel mauris eu leo commodo facilisis. Maecenas condimentum elit vitae purus volutpat, vitae
        consequat quam luctus. Sed tincidunt blandit libero, et faucibus elit congue ut. Pellentesque pulvinar vulputate
        diam. Sed tempor elementum metus ut auctor. Suspendisse potenti. Fusce vel sem urna. Proin sagittis purus a
        mauris pharetra scelerisque. Ut venenatis eget massa sit amet suscipit. In fermentum odio dolor, at fermentum ex
        elementum eu.
      </div>
  `
    container.querySelector("#buy-buttons .btn-secondary").addEventListener("click",function (event) {
      addProductToCart(product)
    })
}

function main() {
  updateProductPage()
}

main()
