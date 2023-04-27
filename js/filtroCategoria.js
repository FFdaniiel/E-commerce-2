const btncategoria2 = document.querySelectorAll('.menu-categoria');
const contenedorProductos = document.querySelector('.container-productos');
const contenedorOfertas = document.querySelector('#oferta');

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

        }else {
            tituloPrincipal.innerText = 'Todos los productos';
            cargarProductos(productos);
        }
    })

})

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto =>  {
        let descuento = producto.descuento
        let precio = producto.precio
        let calculo = (descuento / 100) * precio
        let total = Number(precio - calculo)
        let fixeado = Number(total.toFixed(3));

        if(producto.destacado == 'si' ){
            const div = document.createElement('div');
            div.classList.add('producto');
            div.innerHTML = `
                <img class="producto-img" clas src="${producto.imagen}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="produto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio subrayado">$ ${producto.precio}</p>
                    <p class="producto-precio">$ ${(fixeado)} <span class="descuento">%${producto.descuento}</span></p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            `
            contenedorProductos.append(div);

        }else{
            const div = document.createElement('div');
            div.classList.add('producto');
            div.innerHTML = `
                <img class="producto-img" clas src="${producto.imagen}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="produto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$ ${producto.precio.toLocaleString('es')}</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            `
            contenedorProductos.append(div);
        }
    })
    actualizarBtnAgregar()
}

// Filtro categoria
// Añadiendo un evento para desplazar el menu de categorias
function filtroCategoria (){
    btncategoria2.forEach(btn =>{
        btn.addEventListener('click',() =>{
            quitarNavCategoria ()
        })
    })
    filtroOpen.addEventListener('click', () => {
        navCategoria.classList.remove('nav-disable')
        navCategoria.classList.add('nav-enable')
        FiltroClose.style.display = 'inline';
        filtroOpen.style.display = 'none';
    
    })
    FiltroClose.addEventListener('click', () => {
        quitarNavCategoria ()
    
    })
    
    function quitarNavCategoria (){
        // Quitando el navegador por cada vez que se toca la categoria
        navCategoria.classList.remove('nav-enable')
        navCategoria.classList.add('nav-disable')
        FiltroClose.style.display = 'none';
        filtroOpen.style.display = 'inline';
    }
}

// Oferta
// Productos destacados
if(contenedorOfertas){
    // Agrega los productos destacados
    function cargarProductos(productosElegidos) {
    
        contenedorOfertas.innerHTML = "";
        productosElegidos.forEach(producto =>  {
            if(producto.oferta == 'si'){
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
                contenedorOfertas.append(div);
            }
        })
        actualizarBtnAgregar()
    }

}else{

}

if (filtroOpen) {
    filtroCategoria ()

    
}else {

}




