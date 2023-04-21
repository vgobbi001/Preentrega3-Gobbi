/* fetch('./APIcasera.json')
    .then(response => response.json())
    .then(listaProductos => console.log(listaProductos))
    */

class ProductoController {
    constructor () {
        this.listaProductos = []
        this.contenedor_productos = document.getElementById("contenedor_productos")
    }

    //lo convierto  a metodo, se levantan productos del DOM
    mostrarenDOM(contenedor_productos) {
        //limpio contenedor
        //contenedor_productos.innerHTML = ""

        this.listaProductos.forEach ( producto => {
            this.contenedor_productos.innerHTML += `
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

    /*levantarJSON () {
        fetch("./APIcasera.json")
        .then(resp => resp.json())
        .then(listaProductos => 
            
            listaProductos.forEach(producto => {
            contenedor_productos.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <img src="${producto.img}" class="card-img-top" alt="${producto.alt}">
                    <div class="card-body">
                        <h5 class="card-title"> ${producto.nombre}</h5>
                        <p class="card-text">$ ${producto.precio}</p>
                        <a href="#" class="btn btn-primary" id="michiproducto${producto.id}">Añadir al carrito</a>
                    </div>
                </div>  `
            }))
    }*/

    async levantarJSON (controladorCarrito)  {
        let res = await fetch("./APIcasera.json")
        this.listaProductos = await res.json()
        this.mostrarenDOM()
        this.darEvantoAnadirCarrito(controladorCarrito)
    }
    
    /*let obtenerListaJSON = localStorage.getItem("listaProductos")

    if(obtenerListaJSON){
        this.listaProductos = JSON.parse(obtenerListaJSON)
        
    }*/
        

    
    darEvantoAnadirCarrito() {
        controladorProductos.listaProductos.forEach (producto => {
            const productodelDOM = document.getElementById(`michiproducto${producto.id}`)
        
            productodelDOM.addEventListener("click",()=> {
        
                controladorCarrito.anadir(producto)
                controladorCarrito.limpiarDOM()
                //contenedor_carrito.innerHTML = " "
                controladorCarrito.mostrarenDOM ()
                controladorCarrito.mostrarPreciosEnDom ()
          
        
            })
        
        })
    }

}

class CarritoController {
    constructor () {
        this.listaCarrito = []
        this.contenedor_carrito = document.getElementById("contenedor_carrito")
        this.precio = document.getElementById("precio")
        this.precio_con_iva = document.getElementById("precio_con_iva")
        //this.finalizar_compra = document.getElementById ("finalizar_compra")
          
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
        let existeProducto = this.listaCarrito.some(elemento => elemento.id == producto.id)

        if (existeProducto){ 
            const productoEncontrado = this.buscar(producto.id)
            productoEncontrado.cantidad += 1 

        } else {
            this.listaCarrito.push(producto)
        }

      

        let arrformatoJSON = JSON.stringify(this.listaCarrito)

        localStorage.setItem("listaCarrito", arrformatoJSON)

    }

    cardHTML(producto) {
        return `
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
                        <p class="card-text">Cantidad: ${producto.cantidad}</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
    `
    }

        
    limpiarDOM (contenedor_carrito){
        this.contenedor_carrito.innerHTML = ""
    }

    mostrarenDOM () {

         //limpio contenedor
        this.limpiarDOM()
       
        //muestro todo
        this.listaCarrito.forEach (producto => {
            this.contenedor_carrito.innerHTML += this.cardHTML(producto)

         })

         this.darEventoBorrar()
    }

    darEventoBorrar() {
        this.listaCarrito.forEach (producto=> {
            document.getElementById (`borrar${producto.id}`).addEventListener("click", () => {
                this.borrar ()
                localStorage.setItem("listaCarrito", JSON.stringify(this.listaCarrito))
                this.mostrarenDOM()
                this.mostrarPreciosEnDom()
            })
            
         })
    }

    mostrarPreciosEnDom () {
      this.precio.innerHTML = this.calcularTotal ()
      this.precio_con_iva.innerHTML = "$"+this.calcularPrecioConIVA ()
    }

    calcularTotal (){
        return this.listaCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad ,0)
    }

    calcularPrecioConIVA() {
       return this.calcularTotal() * 1.21
    }

    buscar(id){
        return this.listaCarrito.find(producto => producto.id == id)
    }

    /*finalizar_compra () {
        this.finalizar_compra.addEventListener("click", () => {

            this.limpiar()
            this.mostrarenDOM()
            this.mostrarPreciosEnDom()
        
        })
    }*/

}

//objetos 

const controladorProductos = new ProductoController ()
const controladorCarrito = new CarritoController()

//storage

const levantoAlgo = controladorCarrito.levantar()

/*la constante como el id son unicos*/

//DOM

const contenedor_productos = document.getElementById("contenedor_productos")
// const contenedor_carrito = document.getElementById("contenedor_carrito")
// const precio = document.getElementById("precio")
// const precio_con_iva = document.getElementById("precio_con_iva")

if(levantoAlgo){
    controladorCarrito.mostrarPreciosEnDom(precio, precio_con_iva)    
} 

controladorProductos.levantarJSON (controladorCarrito)

//DOM

controladorCarrito.mostrarenDOM()

const finalizar_compra = document.getElementById ("finalizar_compra") 

//controladorCarrito.finalizar_compra()

this.finalizar_compra.addEventListener("click", () => {

    controladorCarrito.limpiar()
    controladorCarrito.mostrarenDOM()
    controladorCarrito.mostrarPreciosEnDom()

 })

//eventos



