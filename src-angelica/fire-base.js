//confirma que el usuario esta logueando para que no tenga que volver a ingresar sus datos
window.onload = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      if(user.emailVerified === true){
      userName.innerHTML = `Bienvenid@  ${user.displayName}`;
      console.log('Inicio Logueado ')
      console.log(user);
      
      login.classList.remove("hidden");
      logout.classList.add("hidden");
      visualImgFont.setAttribute("class", "hidden");
      wall.classList.remove("hidden");  
      }
     
    } 
    else {
      console.log('No esta logueado');
      login.classList.add("hidden");
      logout.classList.remove("hidden");
      register.setAttribute("class", "hidden");
      singIn.removeAttribute("class");
      visualImgFont.removeAttribute("class");
      wall.classList.add("hidden");
    }
  });
}
//Registrando usuarios nuevos
btnRegister.addEventListener("click", () => {
  firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRregister.value)
    .then((result) => {
      
      console.log("me registro");
      console.log(nameRegister.value, nickNameRegister.value);
      const user = result.user;
      writeUserData(user.uid, nameRegister.value, nickNameRegister.value, user.email, user.photoURL);
      checkEmail();
      //url  aun no funciona
      
     })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // ...
    });
})
btnSignIn.addEventListener("click", () => {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(() => {
      console.log("entre");
      console.log(passwordRregister.value);
      console.log(emailRegister.value);
      onload();
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
      login.classList.remove("hidden");
      logout.classList.add("hidden");
      register.setAttribute("class", "hidden");
      singIn.removeAttribute("class");

    })
    .catch((error) => {
      console.log('Error al cerrar Sesión');
    });
})

//confirmando Email
const checkEmail = () => {
  const user = firebase.auth().currentUser;

  user.sendEmailVerification()
  .then(() => {
    // Email sent.
  alert("se envio un correo de confirmacion a tu email")

  })
  .catch((error) => {
    // An error happened.
  });
}
