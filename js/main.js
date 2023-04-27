let productos = []

fetch('./js/productos.json')
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

const sliderContainer = document.querySelector('.slider-container');

// Slider
const radio = document.querySelector('#radio');

if(sliderContainer){
    sliderContainer.innerHTML = ''
    const slider = document.createElement('div');
    slider.classList.add('slider');
    const sliders = document.createElement('div');
    sliders.classList.add('sliders');
    sliders.innerHTML = `
        <input type="radio" name="radio-btn" id="radio1">
        <input type="radio" name="radio-btn" id="radio2">
        <input type="radio" name="radio-btn" id="radio3">
        <!-- Radio buttons end -->
        <!-- Slider images start -->
        <div class="slide item1">
            <img src="./img/Banner/Banner1.jpg" alt="banner1">
        </div>
        <div class="slide item2">
            <img src="./img/Banner/banner2.jpg" alt="banner2">
        </div>
        <div class="slide item3">
            <img src="./img/Banner/banner3.jpg" alt="banner3">
        </div>
        <!-- Slider images end -->
        <!-- Automatic navigation start -->
        <div class="navigation-auto">
            <div class="auto-1"></div>
            <div class="auto-2"></div>
            <div class="auto-3"></div>
        </div>
    `
    const navigationManual = document.createElement('div');
    navigationManual.classList.add('navigation-manual');
    navigationManual.innerHTML = `
        <label for="radio1" class="manual-btn"></label>
        <label for="radio2" class="manual-btn"></label>
        <label for="radio3" class="manual-btn"></label>
    `

    slider.appendChild(sliders)
    slider.appendChild(navigationManual)
    sliderContainer.appendChild(slider)

    // Slider
    let contador = 1;
    setInterval(function() {
        document.querySelector('#radio' + contador).checked = true;
        contador++
        if(contador > 3){
            contador = 1;
        }
    }, 6000);
    
}else {

}


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