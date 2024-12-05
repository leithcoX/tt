
function printCart() {
    ids = localStorage.getItem("ids")
    if (ids == null) {
        console.log("No hay nada")
        return
    }

    ids = JSON.parse(ids)
    console.log(ids)
}
printCart()
