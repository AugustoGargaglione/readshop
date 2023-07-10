
let contenedor = document.getElementById("contenedorProductos")
let botonCarrito = document.getElementById("botonCarrito")
let carritoFisico = document.getElementById("carritoFisico")
let carritoContenedor = document.getElementById("carritoContenedor")
let cantidadCarrito = document.getElementById("cantidadCarrito")
let catalogo = document.getElementById("catalogo")
let buscador = document.getElementById("buscador")
let ofertas = document.getElementById("ofertas")
let novedades = document.getElementById("novedades")






let carrito = JSON.parse(localStorage.getItem("carrito")) || []


crearTarjetas()


////ESCUCHADOR DEL EVENTO DEL BOTÓN CARRITO DEL INDEX/////////

botonCarrito.addEventListener("click", () => {
    mostrarOcultar()
    carritoFisico.innerHTML = ""
    carrito.forEach(libro => {
    let ContenidoCarrito = document.createElement("div")
    ContenidoCarrito.className = "tarjeta-carrito"
    ContenidoCarrito.innerHTML = `
    <img src= imagenes/${libro.imagen}>
    <h3>${libro.titulo.toUpperCase()}</h3>
    <p>Cantidad:${libro.cantidad}
    <p> $ ${libro.precio}</p>
    

    `
    let botonEliminar = document.createElement("button")
    botonEliminar.innerText = "❌"
    botonEliminar.className = "boton-Eliminar"
    ContenidoCarrito.append(botonEliminar)
    carritoFisico.append(ContenidoCarrito)
    console.log(carrito)


})
})

   


/////FUNCIÓN PARA VER EL CATÁLOGO////


catalogo.addEventListener("click",()=>crearTarjetas())


////FUNCIÓN PARA VER LAS OFERTAS////
ofertas.addEventListener("click", CrearOfertas)

function CrearOfertas() {
    let verOfertas = libros.filter(libro => libro.precio < 500)
    tarjetas(verOfertas)
}

////FUNCIÓN BUSCADOR////


buscador.addEventListener("input", buscarPorNombre)

function buscarPorNombre() {
   let buscado = libros.filter(libro => libro.titulo.includes(buscador.value))
   tarjetas(buscado)

}

////BOTÓN HOME////

let botonHome = document.getElementById("home")

botonHome.addEventListener("click", crearTarjetas)

///BOTÓN "ATRÁS/////"

let botonAtras = document.getElementById("botonAtras")

botonAtras.addEventListener("click", crearTarjetas)

////BOTÓN NOVEDADES////

novedades.addEventListener("click", verNovedades)

function verNovedades() {
    let novedad = libros.filter(libro => libro.año >2019)
    tarjetas(novedad)
}



///FUNCIÓN PARA CREAR LAS TARJETAS AUTOMATICAMENTE EN EL CONTENEDOR////

function crearTarjetas() {
    contenedor.innerHTML = ""
    libros.forEach((libro) => {
        let tarjeta = document.createElement("div")
        tarjeta.className = "tarjeta"
        tarjeta.innerHTML = `
        <h3>${libro.titulo.toUpperCase()}
        <br><br>${libro.autor.toUpperCase()} </h3>
        <img src= imagenes/${libro.imagen}>
        <h3>PRECIO: ${libro.precio}</h3>
        `
     contenedor.appendChild(tarjeta)
     let botonAgregar = document.createElement("button")
     tarjeta.append(botonAgregar)
     botonAgregar.innerText = "Agregar al carrito"


     botonAgregar.addEventListener("click", () => {
        let repeat = carrito.some(repetido => repetido.id === libro.id)
        if (repeat) {
            carrito.map(articulo => {
                if(articulo.id === libro.id){
                    articulo.cantidad++
                }
            })

        } else {
            carrito.push({
                imagen: libro.imagen,
                id: libro.id,
                titulo:libro.titulo,
                precio: libro.precio,
                cantidad: libro.cantidad,
            })
        }
        saveStorage()

        carritoFisico.innerHTML = ""
        carrito.forEach(libro => {
        let ContenidoCarrito = document.createElement("div")
        ContenidoCarrito.className = "tarjeta-carrito"
        ContenidoCarrito.innerHTML = `
        <img src= imagenes/${libro.imagen}>
        <h3>${libro.titulo.toUpperCase()}</h3>
        <p>Cantidad:${libro.cantidad}
        <p> $ ${libro.precio}</p>
        

        `
        let botonEliminar = document.createElement("button")
        botonEliminar.innerText = "❌"
        botonEliminar.className = "boton-Eliminar"
        ContenidoCarrito.append(botonEliminar)
        carritoFisico.append(ContenidoCarrito)
        console.log(carrito)
     })
     })
     } )
  }


  ////FUNCIÓN PARA VER Y OCULTAR EL CARRITO//////

function mostrarOcultar() {
    contenedor.classList.toggle("oculto")
    carritoContenedor.classList.toggle("oculto")
}



/////LOCAL STORAGE////////
function saveStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}




////FUNCIÓN PARA CREAR TARJETAS CON DISTINTOS ARRAYS/////


 function tarjetas(array) {
    contenedorProductos.innerHTML = ""
    array.forEach(libro => {
        let tarjetaDelProducto = document.createElement("div")
        tarjetaDelProducto.className = "tarjeta"
        tarjetaDelProducto.innerHTML = `
        <h3>${libro.titulo.toUpperCase()}
        <br><br>${libro.autor.toUpperCase()} </h3>
        <img src= imagenes/${libro.imagen}>
        <h3>PRECIO: ${libro.precio}</h3>
        
        ` 
        contenedor.append(tarjetaDelProducto)

        let botonAgregar = document.createElement("button")
        tarjetaDelProducto.append(botonAgregar)
        botonAgregar.innerText = "Agregar al carrito"
   
   
        botonAgregar.addEventListener("click", () => {
           let repeat = carrito.some(repetido => repetido.id === libro.id)
           if (repeat) {
               carrito.map(articulo => {
                   if(articulo.id === libro.id){
                       articulo.cantidad++
                   }
               })
   
           } else {
               carrito.push({
                   imagen: libro.imagen,
                   id: libro.id,
                   titulo:libro.titulo,
                   precio: libro.precio,
                   cantidad: libro.cantidad,
               })
           }
           saveStorage()
   
           carritoFisico.innerHTML = ""
           carrito.forEach(libro => {
           let ContenidoCarrito = document.createElement("div")
           ContenidoCarrito.className = "tarjeta-carrito"
           ContenidoCarrito.innerHTML = `
           <img src= imagenes/${libro.imagen}>
           <h3>${libro.titulo.toUpperCase()}</h3>
           <p>Cantidad:${libro.cantidad}
           <p> $ ${libro.precio}</p>
           
   
           `
           let botonEliminar = document.createElement("button")
           botonEliminar.innerText = "❌"
           botonEliminar.className = "boton-Eliminar"
           ContenidoCarrito.append(botonEliminar)
           carritoFisico.append(ContenidoCarrito)
        })
        })
        } )


    } 