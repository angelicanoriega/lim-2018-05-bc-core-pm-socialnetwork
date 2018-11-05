const iconM = document.getElementById('iconM');
const seeIyP = document.getElementById('seeIyP');
iconM.addEventListener('click', () => {
    if (seeIyP.hasAttribute('value')) {
        seeIyP.removeAttribute('value');
        seeIyP.removeAttribute('class');
        seeIyP.setAttribute('class', 'col-12 col-md-12');
    } else {
        seeIyP.setAttribute('value', 'solo para el efecto');
        seeIyP.setAttribute('class', 'col-12 col-md-12 hiddennav2');
    }
})
const btnPrivadoPost = document.getElementById('btnPrivadoPost');
const btnPublicoPost = document.getElementById('btnPublicoPost');
const seePrivado = document.getElementById('seePrivado');
const seePublico = document.getElementById('seePublico');
btnPrivadoPost.addEventListener('click', () => {
    seePrivado.removeAttribute('class');
    seePrivado.setAttribute('class', 'col-sm-6 col-md-6 cuadro2');
    seePublico.setAttribute('class', 'col-sm-6 col-md-6 cuadro2 hiddennav2');
})
btnPublicoPost.addEventListener('click', () => {
    seePublico.removeAttribute('class');
    seePublico.setAttribute('class', 'col-sm-6 col-md-6 cuadro2');
    seePrivado.setAttribute('class', 'col-sm-6 col-md-6 cuadro2 hiddennav2');
})

const valorDeEstado = document.getElementById('valorDeEstado');
const btnEstadoPrivado = document.getElementById('btnEstadoPrivado');
const btnEstadoPublico = document.getElementById('btnEstadoPublico');
btnEstadoPrivado.addEventListener('click',()=>{
    valorDeEstado.innerHTML='Privado';
})
btnEstadoPublico.addEventListener('click',()=>{
    valorDeEstado.innerHTML='Público';
})
const btnYo = document.getElementById('btnYo');
const btnNosotros = document.getElementById('btnNosotros');
const yo = document.getElementById('yo');
const nosotros = document.getElementById('nosotros');

btnYo.addEventListener('click',()=>{
    yo.removeAttribute('class');
    nosotros.setAttribute('class','hidden')
});
btnNosotros.addEventListener('click',()=>{
    nosotros.removeAttribute('class');
    yo.setAttribute('class','hidden')
});