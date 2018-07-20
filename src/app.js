//botones de iniciar sesion;registro y salida
const btnSignIn = document.getElementById("SignIn");
const btnRegister = document.getElementById("register");
const btnLogout = document.getElementById("Logout");
//inputs email y pasword de iniciar sesión
const email = document.getElementById("email");
const password = document.getElementById("password");
//inputs Nombre, Apellido, email y pasword del registro
const nameRegister = document.getElementById("name-register");
const nickNameRegister = document.getElementById("nickName-register");
const emailRegister = document.getElementById("email-register");
const passwordRregister = document.getElementById("password-register");
//botones de iniciar secion con google y facebook(aun si uso)
const btnGoogle = document.getElementById("google-SignIn");
/* aun no se pone en uso const btnFacebook = document.getElementById("facebook-SignIn");*/
//botones de ocutar y aparecer (iniciar secion  registrarse)
const btnNewAccount = document.getElementById("newAccount-register");
const btnReturn = document.getElementById("return");
//varibles creadas para la visualizacion usando el css en html
const login = document.getElementById("menu");
const logout = document.getElementById("singIn-register");
let userName = document.getElementById("user_name");
const register = document.getElementById("register");
const singIn = document.getElementById("singIn");

//ocultando y apareciondo el area de inciar sesion y registro
btnNewAccount.addEventListener("click", () => {
  register.removeAttribute("class");
  singIn.setAttribute("class", "hidden");
})
btnReturn.addEventListener("click", () => {
  register.setAttribute("class", "hidden");
  singIn.removeAttribute("class");

})

// condicionales de validacion
/*constante para escribir el mensaje de validacion en iniciar sesion*/
const validationMessageSI = document.getElementById("validation-Message");
/*mensajes de validacion de Iniciar sesion
1.- input para introduccion de correo*/
email.addEventListener("keyup", () => {
   if (email.value.length <= 0) {
    validationMessageSI.innerHTML = "<span>Completa el cuadro <strong>Email</strong></span>";
    email.setAttribute("class", "warning");
   }
   else{
    validationMessageSI.innerHTML = "<span></span>";
    email.removeAttribute("class");
 
   }
})
/*2.- input para introduccion de contraseña*/
password.addEventListener("keyup", () => {
  if (password.value.length <= 0) {
   validationMessageSI.innerHTML = "<span>Completa el cuadro <strong>Pasword</strong></span>";
   password.setAttribute("class", "warning");
  }
  else{
   validationMessageSI.innerHTML = "<span></span>";
   password.removeAttribute("class");

  }
})
/*constante para escribir el mensaje de validacion en registro*/
const validationMessage = document.getElementById("validation-message");
/*mensajes de validacion del registro
1.- input para introduccion de nombre completo*/
nameRegister.addEventListener("mousemove", ()=>{
 validationMessage.innerHTML = "<span>Completa este cuadro con tu nombre completo</span>";
})
nameRegister.addEventListener("keyup", () => {
  if (nameRegister.value.length <= 0) {
    validationMessage.innerHTML = "<span>Completa el cuadros de registro <strong>Nombre Completo</strong></span>";
    nameRegister.setAttribute("class", "warning");
  }
  else{
    validationMessage.innerHTML = "<span></span>";
    nameRegister.removeAttribute("class");

  }
})
/*2.- input para introduccion de nombre de usuario*/
nickNameRegister.addEventListener("mousemove", ()=>{
  validationMessage.innerHTML = "<span>Completa este cuadro con un nombre de usuario a eleccion </span>";
 })
 nickNameRegister.addEventListener("keyup", () => {
   if (nickNameRegister.value.length <= 0) {
     validationMessage.innerHTML = "<span>Completa el cuadro de registro <strong>Nombre de Usuario</strong></span>";
     nickNameRegister.setAttribute("class", "warning");
    }
   else{
     validationMessage.innerHTML = "<span></span>";
     nickNameRegister.removeAttribute("class");
   }
 })
/*3.- input para introduccion de email*/
emailRegister.addEventListener("mousemove", ()=>{
  validationMessage.innerHTML = "<span>Completa este cuadro con un email </span>";
 })
 emailRegister.addEventListener("keyup", () => {
   if (emailRegister.value.length <= 0) {
     validationMessage.innerHTML = "<span>Completa el cuadro de registro <strong>Email</strong></span>";
     emailRegister.setAttribute("class", "warning");
   }
   else{
     validationMessage.innerHTML = "<span></span>";
     emailRegister.removeAttribute("class");
   }
 })
/*4.- input para introduccion de contraseña*/
passwordRregister.addEventListener("mousemove", ()=>{
  validationMessage.innerHTML = "<span>Completa este cuadro con una contraseña a elección </span>";
 })
 passwordRregister.addEventListener("keyup", () => {
   if (passwordRregister.value.length === 0) {
     validationMessage.innerHTML = "<span>Completa el cuadro de registro <strong>Password</strong></span>";
     passwordRregister.setAttribute("class", "warning");
   }
   else if(passwordRregister.value.length<=5){
    validationMessage.innerHTML = "<span>Completa el cuadro de registro <strong>Password</strong> con una contraseña de minimo 6 digitos</span>"; 
    passwordRregister.setAttribute("class", "warning");
   }
   else{
     validationMessage.innerHTML = "<span></span>";
     passwordRregister.removeAttribute("class");
   }
 })


//constante para almacenar datos
let users = {
  name: "",
  nickName: "",
  email: "",
  password: "",
};
let usersWhitGoogle = {
  name: "",
  nickName: "",
  email: "",
  password: "",
};


//confirma que el usuario esta logueando para que no tenga que volver a ingresar sus datos
window.onload = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

      userName.innerHTML = `Bienvenid@  ${user.displayName}`;
      console.log(user);


      console.log('Inicio Logueado ')
      login.classList.remove("contenedor-menu");
      logout.classList.add("contenedor-menu");


    } else {
      console.log('No esta logueado');
      login.classList.add("contenedor-menu");
      logout.classList.remove("contenedor-menu");
      register.setAttribute("class", "hidden");
      singIn.removeAttribute("class");


    }
  });
}

//Registrando usuarios nuevos
btnRegister.addEventListener("click", () => {
  firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRregister.value)
    .then(() => {



      console.log("me registro");
      console.log(users);

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
      register.setAttribute("class", "hidden");
      singIn.removeAttribute("class");

    })
    .catch((error) => {
      console.log('Error al cerrar Sesión');
    });
})

//iniciando con google 
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
