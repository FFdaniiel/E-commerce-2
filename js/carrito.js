// Obteniendo los objetos almacenados en localStorage
let productosEnCarrito = localStorage.getItem('productos-en-carrito');
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector('#carrito-vacio');
const contenedorCarritoProductos = document.querySelector('#carrito-productos');
const contenedorCarritoAcciones = document.querySelector('#carrito-acciones');
const contenedorCarritoComprado = document.querySelector('#carrito-comprado');
const contenedorTotal = document.querySelector('#total');
let btnEliminar = document.querySelectorAll('.carrito-producto-eliminar');
const btnVaciar = document.querySelector('.carrito-acciones-vaciar');
const btnComprar = document.querySelector('.carrito-acciones-comprar');

function cargarProductosCarrito() {
    contenedorCarritoProductos.innerHTML = '';

    if(productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add('disabled');
        contenedorCarritoProductos.classList.remove('disabled');
        contenedorCarritoAcciones.classList.remove('disabled');
        contenedorCarritoComprado.classList.add('disabled');
    
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement('div');
            div.classList.add('carrito-producto');
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="fa-solid fa-trash"></i></button>
            `;
            contenedorCarritoProductos.append(div);
        });
    
    }else {
        contenedorCarritoVacio.classList.remove('disabled');
        contenedorCarritoProductos.classList.add('disabled');
        contenedorCarritoAcciones.classList.add('disabled');
        contenedorCarritoComprado.classList.add('disabled');
    
    }
    actualizarBtnEliminar()
    actualizarTotal()
}
cargarProductosCarrito()

function actualizarBtnEliminar() {
    btnEliminar = document.querySelectorAll('.carrito-producto-eliminar');

    btnEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarDelCarrito);
    })
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto Eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#785ce9",
          borderRadius: "2rem",
          textTransform: "upperCase",
          fontSize: ".75rem",
        },
        offset: {
            x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "1.5rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();
      const idBoton = e.currentTarget.id
      const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
      productosEnCarrito.splice(index,1);
      cargarProductosCarrito()
  
      localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
  }
  
  btnVaciar.addEventListener('click', vaciarCarrito);
  
function vaciarCarrito() {
    Swal.fire({
        title: '<strong>¿Estás seguro?</u></strong>',
        icon: 'question',
        html:
          `Se van a borrar ${productosEnCarrito.reduce((acc, productos) => acc + productos.cantidad, 0)} productos`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          'Si',
        cancelButtonText:
          'No',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {    
            productosEnCarrito.length = 0;
            localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
            cargarProductosCarrito()
            contenedorCarritoProductos.innerHTML = '';

        }
    })

}

// Actualizar el total
function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc +(producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText =  `$${totalCalculado}`
}

// btn Comprar
btnComprar.addEventListener('click', comprarCarrito);

function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
    cargarProductosCarrito()

    contenedorCarritoVacio.classList.add('disabled');
    contenedorCarritoProductos.classList.add('disabled');
    contenedorCarritoAcciones.classList.add('disabled');
    contenedorCarritoComprado.classList.remove('disabled');

}
