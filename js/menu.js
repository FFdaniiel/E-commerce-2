const openMenu = document.querySelector('#open-menu');
const closeMenu = document.querySelector('#close-menu');
const menu = document.querySelector('.nav-menu');

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

