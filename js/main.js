let productos = []

fetch('./../js/productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

const btnCategorias = document.querySelectorAll('.nav-menu-item');
const navMenu = document.querySelectorAll('.nav-menu-item');
const btncategoria2 = document.querySelectorAll('.menu-categoria')
const contenedorProductos = document.querySelector('.container-productos')
const tituloPrincipal = document.querySelector('#titulo-principal')



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


// Categoria

btncategoria2.forEach(btn => {
    btn.addEventListener('click', (e) =>{
        btncategoria2.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');

        if(e.currentTarget.id != 'todos'){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
    
            const productosBtn = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBtn);
            console.log(productosBtn)
        } else {
            tituloPrincipal.innerText = 'Todos los productos';
            cargarProductos(productos);
        }
    })

})

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto =>  {

        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
        <div class="producto">
            <img class="producto-img" clas src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="produto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$ ${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        </div>
        `
        contenedorProductos.append(div);
    })
}