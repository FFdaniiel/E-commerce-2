const openMenu = document.querySelector('#open-menu');
const closeMenu = document.querySelector('#close-menu');
const menu = document.querySelector('.nav-menu');

const navCategoria = document.querySelector('.nav-categoria');
const filtroOpen = document.querySelector('.filtro-nav-open');
const FiltroClose = document.querySelector('.filtro-nav-close');
const btnFiltro = document.querySelectorAll('.menu-categoria');

openMenu.addEventListener('click' , () => {
    closeMenu.style.display = 'inline';
    menu.classList.add('nav-menu-visible');
});

closeMenu.addEventListener('click' , () => {
    closeMenu.style.display = 'none';
    menu.classList.remove('nav-menu-visible');
});

btnCategorias.forEach(boton => boton.addEventListener('click' , () => {
    menu.classList.remove('nav-menu-visible');
}));

// Filtro categoria
// Añadiendo un evento para desplazar el menu de categorias

filtroOpen.addEventListener('click', () => {
    navCategoria.classList.remove('nav-disable')
    navCategoria.classList.add('nav-enable')
    FiltroClose.style.display = 'inline';
    filtroOpen.style.display = 'none';

})
FiltroClose.addEventListener('click', () => {
    quitarNavCategoria ()

})
