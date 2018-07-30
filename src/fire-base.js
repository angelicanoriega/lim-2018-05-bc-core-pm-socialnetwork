//confirma que el usuario esta logueando para que no tenga que volver a ingresar sus datos
window.onload = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      if(user.emailVerified === true){
      console.log('Inicio Logueado ')
      console.log(user.uid);
      returnData(user.uid);
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
      register.setAttribute("class", "hidden");
      singIn.removeAttribute("class");
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
      email.addEventListener("mousemove", () => {
        validationMessageSI.innerHTML = "<span>Ingresa un email y/o contaseña valido</span>";
      })      
      password.addEventListener("mousemove", () => {
        validationMessageSI.innerHTML = "<span>Ingresa un email y/o contaseña valido</span>";
      })
      validationMessageSI.innerHTML = "<span>Ingresa un email y/o contaseña valido</span>";
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

//iniciando con google en iniciar secion:
btnGoogle.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log("ingrese con google");
      const user = result.user;
      writeUserData(user.uid, user.displayName, user.displayName, user.email, user.photoURL);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(error.credential);
    });
})
//iniciando con google en registro:
btnGoogleRegister.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log("ingrese con google");
      const user = result.user;
      writeUserData(user.uid, user.displayName, user.displayName, user.email, user.photoURL);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(error.credential);
    });
})

//iniciar con facebook en iniciar secion
btnFacebook.addEventListener("click", () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log("ingrese con facebook");
      const user = result.user;
      writeUserData(user.uid, user.displayName, user.displayName, user.email, user.photoURL);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(error.credential);
    });
})
//iniciar con facebook en registrar
btnFacebookRegister.addEventListener("click", () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log("ingrese con facebook");
      const user = result.user;
      writeUserData(user.uid, user.displayName, user.displayName, user.email, user.photoURL);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(error.credential);
    });
})

btnSave.addEventListener('click', () => {
  
  if (post.value.length !== 0 && post.value.trim() !== '') 
  {
  const userId = firebase.auth().currentUser.uid;
  const newPost = writeNewPost(userId, post.value);
  }
else{
  alert("escribe un comentario")
}
})
