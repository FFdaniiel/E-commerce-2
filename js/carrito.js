// Obteniendo los objetos almacenados en localStorage
let productosEnCarrito = localStorage.getItem('productos-en-carrito');
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector('.carrito-vacio-container');
const contenedorCarritoProductos = document.querySelector('#carrito-productos');
const contenedorCarritoAcciones = document.querySelector('#carrito-acciones');
const contenedorCarritoComprado = document.querySelector('.carrito-comprado-container');
const contenedorTotal = document.querySelector('#total');
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
            let descuento = producto.descuento
            let precio = Number(producto.precio.toFixed(3))
            let calculo = (descuento / 100) * precio
            let total = Number(precio - calculo).toFixed(3)
            let subtotal = total * producto.cantidad;
            let subtotalSin = precio * producto.cantidad;
            let subtotalFixSin = Number(subtotalSin.toFixed(4));
            let subtotalFix = Number(subtotal.toFixed(3));
            if(producto.oferta == 'si'){
                const div = document.createElement('div');
            div.classList.add('carrito-producto');
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class= "container-precios">
                    <div class="carrito-producto-precio rebaja">
                        <small>Antes!</small>
                        <p>$${producto.precio.toFixed(3)}</p>
                    </div>
                    <div class="carrito-producto-precio con-descuento">
                        <small>Descuento</small>
                        <p>$${total}</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <small>Subtotal</small>
                        <p>$${subtotalFix}</p>
                    </div>
                </div>
                <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                    <div class = "carrito-container-cantidad">
                        <i id="${producto.id}" class="fa-solid fa-minus resta"></i>
                        <p class="cantidadActual">${producto.cantidad}</p>
                        <i id="${producto.id}" class="fa-solid fa-plus sumar"></i>
                    </div>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="fa-solid fa-trash"></i></button>
            `;
            contenedorCarritoProductos.append(div);
            }else {
                const div = document.createElement('div');
                div.classList.add('carrito-producto');
                div.innerHTML = `
                    <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="carrito-producto-titulo">
                        <small>Titulo</small>
                        <h3>${producto.titulo}</h3>
                    </div>
                    <div class= "container-precios sin-descuento">
                    <div class="carrito-producto-precio">
                        <small>Precio</small>
                        <p>$${producto.precio}</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <small>Subtotal</small>
                        <p>$${subtotalFixSin}</p>
                    </div>
                    </div>
                    <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                        <div class = "carrito-container-cantidad">
                            <i id="${producto.id}" class="fa-solid fa-minus resta"></i>
                            <p class="cantidadActual">${producto.cantidad}</p>
                            <i id="${producto.id}" class="fa-solid fa-plus sumar"></i>
                        </div>
                    </div>
                    <button class="carrito-producto-eliminar" id="${producto.id}"><i class="fa-solid fa-trash"></i></button>
                `;
                contenedorCarritoProductos.append(div);
            }
        });
        
    }else {
        contenedorCarritoVacio.classList.remove('disabled');
        contenedorCarritoProductos.classList.add('disabled');
        contenedorCarritoAcciones.classList.add('disabled');
        contenedorCarritoComprado.classList.add('disabled');
        document.querySelector('.contenedor-carrito').style.display = 'block';
    }
    actualizarsumarCantidad()
    actualizarRestaCantidad()
    actualizarBtnEliminar()
    actualizarTotal()
}
cargarProductosCarrito()

// *******Se lograra sumar y actualizar la cantidad *********  

function actualizarsumarCantidad(){
    const btnSuma = document.querySelectorAll('.sumar');
    btnSuma.forEach(btn =>{
        btn.addEventListener('click', sumarCantidad);
    });
}

function sumarCantidad(e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id == idBoton);
    productosEnCarrito[index].cantidad = productosEnCarrito[index].cantidad +1
    cargarProductosCarrito()

    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));

}

//  *********Restar***********
function actualizarRestaCantidad(){
    const btnResta = document.querySelectorAll('.resta');

    btnResta.forEach(btn =>{
        btn.addEventListener('click', restaCantidad);
    });
}

function restaCantidad(e){
    const idBoton = e.currentTarget.id
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    console.log(productosEnCarrito[index].cantidad)
    if (productosEnCarrito[index].cantidad > 1) {
        productosEnCarrito[index].cantidad = productosEnCarrito[index].cantidad - 1;
        cargarProductosCarrito();
    }else{
        console.log('No pa, no pasas')
    }
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));

}

//  ********************

function actualizarBtnEliminar() {
    const btnEliminar = document.querySelectorAll('.carrito-producto-eliminar');

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

        }
    })

}

// Actualizar el total
function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc +(producto.precio * producto.cantidad), 0);
    const totalCalculadodescuento = productosEnCarrito.reduce((acc, producto) => acc +(( producto.precio - ((producto.descuento / 100) * producto.precio)) * producto.cantidad), 0);
    let numero = Number(totalCalculado.toFixed(3))
// No toma el descuento
        contenedorTotal.innerText =  `$${numero} `
}

// btn Comprar
btnComprar.addEventListener('click', comprarCarrito);

function comprarCarrito() {
    Swal.fire({
        title: '<strong>Se va a procesar la compra, ¿estas seguro?</u></strong>',
        icon: 'question',
        html:
          `Se va a procesar la compra de ${productosEnCarrito.reduce((acc, productos) => acc + productos.cantidad, 0)} productos`,
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
        
            contenedorCarritoVacio.classList.add('disabled');
            contenedorCarritoProductos.classList.add('disabled');
            contenedorCarritoAcciones.classList.add('disabled');
            contenedorCarritoComprado.classList.remove('disabled');
            document.querySelector('.contenedor-carrito').style.display = 'block';
            
        }
    })

}



