class ProductoController {
    constructor () {
        this.listaProductos = []
    }

    //lo convierto  a metodo, se levantan productos del DOM

    levantar () {
    
        let obtenerListaJSON = localStorage.getItem("listaProductos")

        if(obtenerListaJSON){
            this.listaProductos = JSON.parse(obtenerListaJSON)
            
        }
        
    }

    mostrarenDOM(contenedor_productos) {
        //limpio contenedor
        contenedor_productos.innerHTML = ""

        this.listaProductos.forEach ( producto => {
            contenedor_productos.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <img src="${producto.img}" class="card-img-top" alt="${producto.alt}">
                    <div class="card-body">
                        <h5 class="card-title"> ${producto.nombre}</h5>
                        <p class="card-text">$ ${producto.precio}</p>
                        <a href="#" class="btn btn-primary" id="michiproducto${producto.id}">Añadir al carrito</a>
                    </div>
                </div>  `
        
        })
    }

}

class CarritoController {
    constructor () {
        this.listaCarrito = []
        
    }


    limpiar () {
        localStorage.removeItem("listaCarrito")
        this.listaCarrito = []

    }

    borrar(producto) {
        let indice = this.listaCarrito.indexOf(producto)
        this.listaCarrito.splice(indice,1)

    }

    levantar()
    {
        let obtenerListaJSON = localStorage.getItem("listaCarrito")

        if(obtenerListaJSON){
            this.listaCarrito = JSON.parse(obtenerListaJSON)
            return true
        }
        return false
    }


    anadir(producto) {
        //this.listaCarrito.some(elemento => elemento.id == producto.id)

        this.listaCarrito.push(producto)

        let arrformatoJSON = JSON.stringify(this.listaCarrito)

        localStorage.setItem("listaCarrito", arrformatoJSON)

    }

    mostrarenDOM (contenedor_carrito) {
        //limpio contenedor
        contenedor_carrito.innerHTML = ""
        //muestro todo
        this.listaCarrito.forEach (producto => {
            contenedor_carrito.innerHTML += `
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.alt}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <button id="borrar${producto.id}"> <i class="bi bi-trash-fill"></i> </button>
                                <p class="card-text">$ ${producto.precio}</p>
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            `

         })

         this.listaCarrito.forEach (producto=> {
            document.getElementById (`borrar${producto.id}`).addEventListener("click", () => {
                this.borrar ()
                localStorage.setItem("listaCarrito", JSON.stringify(this.listaCarrito))
                this.mostrarenDOM(contenedor_carrito)
            })
            
         })
    }

    mostrarPreciosEnDom (precio, precio_con_iva) {
      precio.innerHTML = this.calcularTotal ()
      precio_con_iva.innerHTML = "$"+this.calcularPrecioConIVA ()
    }

    calcularTotal (){
        return this.listaCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad ,0)
    }

    calcularPrecioConIVA() {
       return this.calcularTotal() * 1.21
    }

}

//objetos 

const controladorProductos = new ProductoController ()
const controladorCarrito = new CarritoController()

//storage
controladorProductos.levantar ()
const levantoAlgo = controladorCarrito.levantar()




/*la constante como el id son unicos*/

//DOM

const contenedor_productos = document.getElementById("contenedor_productos")
const contenedor_carrito = document.getElementById("contenedor_carrito")
const precio = document.getElementById("precio")
const precio_con_iva = document.getElementById("precio_con_iva")

if(levantoAlgo){
    controladorCarrito.mostrarPreciosEnDom(precio, precio_con_iva)    
} 

//DOM
controladorProductos.mostrarenDOM(contenedor_productos)
controladorCarrito.mostrarenDOM(contenedor_carrito)


//eventos
controladorProductos.listaProductos.forEach (producto => {
    const productoXanadir = document.getElementById(`michiproducto${producto.id}`)

    productoXanadir.addEventListener("click",()=> {

        controladorCarrito.anadir(producto)
        controladorCarrito.levantar()
        //contenedor_carrito.innerHTML = " "
        controladorCarrito.mostrarenDOM (contenedor_carrito)
        controladorCarrito.mostrarPreciosEnDom (precio, precio_con_iva)
  

    })

})

const finalizar_compra = document.getElementById("finalizar_compra")

finalizar_compra.addEventListener("click", () => {

    controladorCarrito.limpiar()
    controladorCarrito.mostrarenDOM(contenedor_carrito)
    controladorCarrito.mostrarPreciosEnDom(precio, precio_con_iva)

})

//no me funciona el calculo del iva me quede en minuto 24 