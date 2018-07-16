//botones de iniciar secion;registro y salida
const btnSignIn = document.getElementById("SignIn");
const btnRegister = document.getElementById("register");
const btnLogout = document.getElementById("Logout");
//email y pasword de iniciar seción
const email = document.getElementById("email");
const password = document.getElementById("password");
//Nombre, Apellido, email y pasword del registro
const nameRegister = document.getElementById("name-register");
const lastNameRegister = document.getElementById("lastName-register");
const emailRegister = document.getElementById("email-register");
const passwordRregister = document.getElementById("password-register");
//varibles creadas para la visualizacion usando el css en html
const login = document.getElementById("menu");
const logout = document.getElementById("singIn-register");
//botones de iniciar secion con google y facebook
const btnGoogle = document.getElementById("google-SignIn");
const btnFacebook = document.getElementById("facebook-SignIn");


//confirma que el usuario esta logueando para que no tenga que volver a ingresar sus datos
window.onload = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('Inicio Logueado ')
      login.classList.remove("contenedor-menu");
      logout.classList.add("contenedor-menu");

    } else {
      console.log('No esta logueado');
      login.classList.add("contenedor-menu");
      logout.classList.remove("contenedor-menu");

    }
  });
}

//Registrando usuarios nuevos
btnRegister.addEventListener("click", () => {
  firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRregister.value)
    .then(() => {
      console.log("me registro");
      console.log(passwordRregister.value);
      console.log(emailRegister.value);
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // ...
    });
})

//Acceso de usuarios existentes
btnSignIn.addEventListener("click", () => {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(() => {
      console.log("entre");
      console.log(passwordRregister.value);
      console.log(emailRegister.value);
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // ...
    });

})

//salir de la cuenta del usuario
btnLogout.addEventListener('click', () => {
  firebase.auth().signOut()
    .then(() => {
      console.log('Cerro Sesión');
      login.classList.remove("contenedor-menu");
      logout.classList.add("contenedor-menu");
    })
    .catch((error) => {
      console.log('Error al cerrar Sesión');
    });
})

btnGoogle.addEventListener("click", () => {

  let provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log("ingrese con google");

    })
    .catch((error) => {

      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(error.credential);

    });
})
