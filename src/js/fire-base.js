//confirma que el usuario esta logueando para que no tenga que volver a ingresar sus datos
window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        
        if (user.emailVerified === true) {
          console.log('Inicio Logueado ')
         
         window.location = 'post.html';
          console.log(user);
         
        }
        if(user.isAnonymous === true){

          window.location = 'post.html';

        }
      }
      else {
        console.log('No esta logueado');
      
      }
    });
  }
  
  // Registrando usuarios nuevos
  btnRegister.addEventListener("click", () => {
    firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRregister.value)
        .then((result) => {
          console.log("me registro");
        const user = result.user;
        writeUserData(user.uid, nameRegister.value, nickNameRegister.value, user.email, user.photoURL);
        checkEmail();
        register.setAttribute("class", "hidden");
        singIn.removeAttribute("class");
        //url  aun no funciona
        ;})
      
      .catch((error) => {
        console.log(error);
        if(error.code ==="auth/invalid-email" ){
          validationMessage.innerHTML = "<span>Ingresa un email valido ejemplo:miusuario@dominio.algo</span>";
        }
        if(error.code ==="auth/weak-password"){
          validationMessage.innerHTML = "<span>Completa <strong>Contraseña</strong><br>  mínimo 6 digitos</span>";
        }
        if(error.code ==="auth/email-already-in-use"){
          validationMessage.innerHTML = "<span>Email ya en uso</span>";
        }
        
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
        console.log(error);
        console.log()
        if(error.code ==="auth/invalid-email" ){
          validationMessageSI.innerHTML = "<span>Ingresa un email valido </span>";
        }
        if(error.code ==="auth/user-not-found" ){
          validationMessageSI.innerHTML = "<span>Ingresa un email valido </span>";
        }
        if(error.code ==="auth/wrong-password"){
          validationMessageSI.innerHTML = "<span>Ingresa una contaseña valido</span>";
        }
        if(email.value.length===0 && password.value.length===0){
        validationMessageSI.innerHTML = "<span>Ingresa un email y/o contaseña valido</span>";

        }
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // ...
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
        console.log("email error");
        
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
        // writeUserData(user.uid, user.displayName, user.displayName, user.email, user.photoURL);
        
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        console.log(error.email);
        console.log(error.credential);
      });
  })
  
 
  //entrar como anonimo
  anonimus.addEventListener("click",()=>{
   firebase.auth().signInAnonymously()
   .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ... 
  })
  
  });
