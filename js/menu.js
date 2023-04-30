const btnCategorias = document.querySelectorAll('.nav-menu-item');

const openMenu = document.querySelector('#open-menu');
const closeMenu = document.querySelector('#close-menu');
const menu = document.querySelector('.nav-menu');

const navCategoria = document.querySelector('.nav-categoria');
const filtroOpen = document.querySelector('.filtro-nav-open');
const FiltroClose = document.querySelector('.filtro-nav-close');

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


