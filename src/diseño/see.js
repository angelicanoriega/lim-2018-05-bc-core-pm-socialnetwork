const loginsee = document.getElementById('logindisplay');
const btnseeLogin = document.getElementById('seeLogin');
const btnseeRegister = document.getElementById('seeRegister');
const registersee = document.getElementById('registerdisplay');
btnseeRegister.addEventListener('click', () => {
    registersee.removeAttribute('class')
    loginsee.setAttribute('class', 'hidden');
});
btnseeLogin.addEventListener('click', () => {
    loginsee.removeAttribute('class')
    registersee.setAttribute('class', 'hidden');
});

