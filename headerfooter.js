function generateHeader() {
  containerHeader = document.createElement("header")
  containerHeader.innerHTML = `
      <div id="location-header">ENCONTRANOS EN NUEVA POMPEYA Y BURZACO</div>
      <div id="menu-bar">
          <a href="index.html"><img src="img/logo.png" alt="logo" id="menu-logo"></a>
          <div id="menu-tools">
              <div id="menu-bar-container">

                  <input type="text" placeholder="Buscar..." id="search-bar">
                  <button type="submit" id="search-button">
                      <i class="nf nf-fa-search"></i>
                  </button>

                  <a id="cart-logo-container" href="cart.html">
                      <h6 id="cart-counter">${localStorage.getItem("counter")}</h6>
                      <i id="cart-icon" class="nf nf-md-cart_outline"></i>
                  </a>

                  <div id="hamburguer" onclick="updateNav()">
                      <span class="bar"></span>
                      <span class="bar"></span>
                      <span class="bar"></span>
                  </div>
              </div>
          </div>
      </div>
      <nav id="nav-bar">
          <ul id="nav-links" class="hidden">
              <li class="menu-item"><a href="#">Inicio</a></li>
              <li class="menu-item"><a href="#products-menu">Productos</a></li>
              <li class="menu-item"><a href="#form-section">Contacto</a></li>
              <!-- <li class="menu-item"><a href="#">Anillados</a></li> -->
              <!-- <li class="menu-item"><a href="#">Resmas</a></li> -->
          </ul>
      </nav>
  `
  return containerHeader
}

function generateFooter() {
  containerFooter = document.createElement("footer")
  containerFooter.innerHTML = `
      <a href="mailto:impresionycuadernos@gmail.com" target="_blank">impresionycuadernos@gmail.com</a>
      <a href="https://maps.app.goo.gl/95ZWX33JZeJM3ga67" target="_blank">Av Sáenz 772 Nueva Pompeya Capital
          Federal</a>
  `
  return containerFooter
}

function updateCounter(count) {
  const counter = parseInt(localStorage.getItem("counter")) + count
  localStorage.setItem("counter", counter)
  document.getElementById("cart-counter").innerText = counter
}

function updateNav() {
  const enlaces = document.getElementById("nav-links")
  enlaces.classList.toggle("hidden")
}

function main() {
  container = document.getElementById("page")
  container.insertBefore(generateHeader(), container.firstElementChild)
  container.insertBefore(generateFooter(), container.lastElementChild)
}

main()

