let productos = []

fetch('./../js/productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

const btnCategorias = document.querySelectorAll('.nav-menu-item');
const navMenu = document.querySelectorAll('.nav-menu-item');

const btncategoria2 = document.querySelectorAll('.menu-categoria');
const contenedorProductos = document.querySelector('.container-productos');
const tituloPrincipal = document.querySelector('#titulo-principal');
const contenedorProductosDestacados = document.querySelector('#destacado');



// Slider
const radio = document.querySelector('#radio');
let contador = 1;
setInterval(function() {
    document.querySelector('#radio' + contador).checked = true;
    contador++
    if(contador > 3){
        contador = 1;
    }
}, 6000);

// 

// Agrega los productos destacados
function cargarProductos(productosElegidos) {

    contenedorProductosDestacados.innerHTML = "";
    productosElegidos.forEach(producto =>  {
        if(producto.destacado == 'si'){
            let descuento = producto.descuento
            let precio = producto.precio
            let calculo = (descuento / 100) * precio
            let total = Number(precio - calculo)
            let fixeado = Number(total.toFixed(3));

            const div = document.createElement('div');
            div.classList.add('producto');
            div.innerHTML = `
                <img class="producto-img" clas src="${producto.imagen}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="produto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio subrayado">$ ${precio}</p>
                    <p class="producto-precio">$ ${(fixeado)} <span class="descuento">%${producto.descuento}</span></p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            `
            contenedorProductos.append(div);
        }
        })
}