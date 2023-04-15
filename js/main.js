// Slider
const radio = document.querySelector('#radio');
let contador = 1;
setInterval(function() {
    document.querySelector('#radio' + contador).checked = true;
    contador++
    if(contador >= 3){
        contador = 1;
    }
}, 5000);