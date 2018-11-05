window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user);

            if (user.emailVerified === true) {
                console.log('Inicio Logueado ')
                returnData(user.uid,username);
                returnDataPublic(user.uid,username);
                returnDataWorl(user.uid,'usuario');
            }
            if (user.isAnonymous === true) {
                console.log('Inicio Logueado ANONIMO ')
                document.getElementById('seeanonimo').setAttribute('class', 'hidden');
                returnDataWorl(user.uid,'anonimo');



            }
        } else {
            console.log('No esta logueado');
            window.location='index.html';

        }
    });
}

btnLogout.addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => {
            console.log('fhgjkku');

            window.location = 'index.html'

        })
        .catch((error) => {
            console.log('Error al cerrar Sesión');
        });
})
btnSave.addEventListener('click', () => {

    if (post.value.length !== 0 && post.value.trim() !== '') {
        console.log(valorDeEstado.value);

        const userId = firebase.auth().currentUser.uid;
        const newPost = writeNewPost(userId, post.value,valorDeEstado.innerHTML);
        
        post.value = '';
    } else {
        alert("escribe un comentario")
    }
})