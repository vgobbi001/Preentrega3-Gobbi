
let img = document.createElement('img'); 

let listaProductos = [
    {id:1, nombre:"Comedero automático PRO", precio: 25000, cantidad:1, img: "./images/comedero-automatico-para-gatos.jpg"},
    {id:2, nombre:"Comedero automático PRO EXCELLENT", precio: 35000, cantidad:1, img: "./images/comedero-automatico-pro.jpg", alt:"imagen producto"},
    {id:3, nombre:"Fuente de agua para gatos 1L.", precio: 11000, cantidad:1, img: "./images/fuente-gatos-aguita.jpg", alt:"imagen producto"},
    {id:4, nombre:"Moisés stardard", precio: 8000, cantidad:1, img:"./images/moises-gatos-comun.jpg", alt:"imagen producto"},
    {id:5, nombre:"Moisés cueva", precio: 9500, cantidad:1, img: "./images/moises-gatos-cueva.jpg", alt:"imagen producto"},
    {id:6, nombre:"Moisés cueva profunda", precio: 14500, cantidad:1, img: "./images/moises-gatos-cuevapro.jpg", alt:"imagen producto"},
    {id:7, nombre:"Rascador cartón", precio: 1500, cantidad:1, img: "./images/rascador-carton.jpg", alt:"imagen producto"},
    {id:8, nombre:"Rascador tubo con juguete", precio: 6500, cantidad:1, img: "./images/rascador-tubo.jpg", alt:"imagen producto"}
]

const arrformatoJSON = JSON.stringify (listaProductos)

localStorage.setItem("listaProductos", arrformatoJSON)

/* let listaProductos;
let obtenerListaJSON = localStorage.getItem("listaProductos")

if(obtenerListaJSON){
    listaProductos = JSON.parse(obtenerListaJSON)
    
}else{
    listaProductos = []
}

console.log(listaProductos)

const form = document.getElementById("formulario")


form.addEventListener("submit", (e) => {

    e.preventDefault()

    const id = document.getElementById("id").value
    const nombre = document.getElementById("nombre").value
    const precio = document.getElementById("precio").value
    const descripcion = document.getElementById("descripcion").value

    listaProductos.push({id:id,nombre:nombre,precio:precio,descripcion:descripcion})

    const listaProductosJSON = JSON.stringify( listaProductos )

    localStorage.setItem("listaProductos",listaProductosJSON)

    form.reset()

    console.log(listaProductos)
})*/
