

let contenedor = document.getElementById("contenedorProductos")
let botonCarrito = document.getElementById("botonCarrito")
let carritoFisico = document.getElementById("carritoFisico")
let carritoContenedor = document.getElementById("carritoContenedor")
let cantidadCarrito = document.getElementById("cantidadCarrito")
let catalogo = document.getElementById("catalogo")
let buscador = document.getElementById("buscador")
let ofertas = document.getElementById("ofertas")
let novedades = document.getElementById("novedades")
let vaciarCarrito = document.getElementById("vaciarCarrito")
let finalizarCompra = document.getElementById("finalizarCompra")


let carrito = JSON.parse(localStorage.getItem("carrito")) || []

let libros = `./libros.json`


///FUNCIÓN FETCH////

function articulos() {
    fetch(libros)
    .then(response => response.json())
    .then(libros =>{
        tarjetas(libros)
    })
    
}


articulos()

llenarCarrito()


////ESCUCHADOR DEL EVENTO DEL BOTÓN CARRITO DEL INDEX/////////


botonCarrito.addEventListener("click", mostrarOcultar)



////FUNCIÓN PARA LLENAR EL CARRITO/////


function llenarCarrito(){
        
        carritoFisico.innerHTML = ""
        carrito.forEach(libro => {
        let contenidoCarrito = document.createElement("div")
        contenidoCarrito.className = "tarjeta-carrito"
        contenidoCarrito.innerHTML = `
        <img src= imagenes/${libro.imagen}>    
        <p>Cantidad:${libro.cantidad}
        <p> $ ${libro.precio}</p>
        <button class="eliminar-producto">❌</button>
    
        `


        carritoFisico.append(contenidoCarrito)
        
        
        
    let eliminarProducto = contenidoCarrito.querySelector(".eliminar-producto")
    eliminarProducto.addEventListener("click", () => {
        eliminar(libro.id)
        
    
    })
  

    })

    let totalCompra = suma()
        let totalFisico = document.createElement("p")
        totalFisico.classList = "total"
        totalFisico.textContent = `Total: $${totalCompra}`     
        carritoFisico.appendChild(totalFisico)
        
}


////FUNCIÓN PARA ELIMINAR PRODUCTOS////
function eliminar(id) {
    let foundID = carrito.find(libro => libro.id === id)

    carrito = carrito.filter(carritoId => {
        return carritoId !== foundID
    })
    carritoContador()
    saveStorage()
    llenarCarrito()
    
}
   
////EVENTO PARA VACIAR CARRITO///////

vaciarCarrito.addEventListener("click", vaciar)


/////FUNCIÓN PARA VER EL CATÁLOGO////


catalogo.addEventListener("click",articulos)


////FUNCIÓN PARA VER LAS OFERTAS////
ofertas.addEventListener("click", CrearOfertas)

function CrearOfertas() {
    fetch(libros)
    .then(response => response.json())
    .then(libros => {
        let verOfertas = libros.filter(libro => libro.precio < 500)
        tarjetas(verOfertas)
    })
       
    }
  



////FUNCIÓN BUSCADOR////


buscador.addEventListener("input", buscarPorNombre)

function buscarPorNombre() {
    fetch(libros)
    .then(response => response.json())
    .then(libros => {
        let buscado = libros.filter(libro => libro.titulo.includes(buscador.value))
        tarjetas(buscado)
    })
   

}



////BOTÓN HOME////

let botonHome = document.getElementById("home")

botonHome.addEventListener("click", articulos)



///BOTÓN "ATRÁS/////"

let botonAtras = document.getElementById("botonAtras")

botonAtras.addEventListener("click", articulos)



////BOTÓN NOVEDADES////

novedades.addEventListener("click", verNovedades)

function verNovedades() {
    fetch(libros)
    .then(response => response.json())
    .then(libros => {
        let verNovedades = libros.filter(libro => libro.año > 2019)
        tarjetas(verNovedades)
    })
       
    }


  ////FUNCIÓN PARA VER Y OCULTAR EL CARRITO//////

function mostrarOcultar() {
    contenedor.classList.toggle("oculto")
    carritoContenedor.classList.toggle("oculto")
    botonCarrito.classList.toggle("active")
    catalogo.classList.toggle("active")
    novedades.classList.toggle("active")
    ofertas.classList.toggle("active")
}



/////LOCAL STORAGE////////
function saveStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

////EVENTO FINALIZAR COMPRA/////

finalizarCompra.addEventListener("click", () => {
    Swal.fire({
        icon: 'success',
        title: '¡Todo salió bien!',
        text: '¡Gracias por su compra!',
    
      })
    vaciar()
})



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
        <h2>PRECIO: $${libro.precio}</h2>
        
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
                   titulo: libro.titulo,
                   precio: libro.precio,
                   cantidad: libro.cantidad,
               })
           }
           saveStorage()
           carritoContador()
           alert()
           llenarCarrito()
        })
        } )


    } 

////FUNCIÓN PARA EL CONTADOR DEL CARRITO EN EL HTML////

    let carritoContador = () => {
        
        cantidadCarrito.innerText = carrito.length
    }

    ////FUNCIÓN PARA EL ALERT DE AGREGAR AL CARRITO/////

    function alert() {
        Toastify({
            text: "Producto agregado correctamente",
            duration: 2000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true, 
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} 
          }).showToast();
    }
    
    ///FUNCIÓN PARA VACIAR CARRITO////

    function vaciar() {
        carritoFisico.innerHTML = ""
        carrito = []
        carritoContador()
        localStorage.removeItem("carrito")
        llenarCarrito()

    }

    ///FUNCIÓN PARA CALCULAR EL PRECIO TOTAL////

    function suma() {
        let total = 0
        carrito.forEach(libro => {
            total += libro.precio * libro.cantidad
        })
        return total
    }