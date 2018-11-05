//pintar los datos iniciales del usuario
const writeUserData = (userId, name, nickName, email, imageUrl) => {
  const userData = {
    usersId: userId,
    userName: name,
    userNickName: nickName,
    email: email,
    profile_picture: imageUrl
  }
  firebase.database().ref(`users/${userId}`).set(userData);
  return userData;
}
//pintar los post de los usuarios
const writeNewPost = (uid, body, estado) => {
  // Get a key for a new Post.
  const newPostKey = firebase.database().ref().child('posts').push().key;
  // A post entry.
  const postData = {
    uid: uid,
    body: body,
    key: newPostKey,
    like: 0,
    dislike: 0

  };

  if (estado === 'Privado') {
    const updates = {};
    updates[`/posts/${newPostKey}`] = postData;
    updates[`/user-posts/${uid}/${newPostKey}`] = postData;
    firebase.database().ref().update(updates);
  } else if (estado === 'Público') {
    const updates = {};
    updates[`/posts/${newPostKey}`] = postData;
    updates[`/user-posts-public/${uid}/${newPostKey}`] = postData;
    updates[`/user-posts-world/${uid}/${newPostKey}`] = postData;
    firebase.database().ref().update(updates);
  }
  return newPostKey;
}
//llamar datos post privados para perfil
const returnData = (uid, html) => {
  const userUbication = firebase.database().ref('users').child(uid);
  userUbication.on("value", snap => {
    const nameUserId = snap.val().userNickName;
    html.innerHTML = `Bienvenid@  ${nameUserId}`;
    const postUbication = firebase.database().ref('user-posts').child(uid);
    postUbication.on("child_added", snap => {
      const key = snap.val().key;
      const listPost = snap.val().body;
      const numLike = snap.val().like;
      const numDisLike = snap.val().dislike;
      showData(uid, key, listPost, numLike, numDisLike, nameUserId);
    });
  })
}
//pintar datos post privados para perfil

const showData = (userId, keyPost, posts, likePost, dislikePost, nameUserId) => {
  const divDelete = document.createElement("div");
  divDelete.setAttribute("class", "col-md-12 border border-dark mt-2");
  const div2 = document.createElement("div");
  div2.setAttribute("class", "row");
  const div3 = document.createElement("div");
  div3.setAttribute("class", "col-md-12 text-center bg-dark text-white");
  const div4 = document.createElement("div");
  div4.setAttribute("class", "col-md-12");
  const div5 = document.createElement("div");
  div5.setAttribute("class", "col-md-12");
  const div6 = document.createElement("div");
  div6.setAttribute("class", "row");
  const div7 = document.createElement("div");
  div7.setAttribute("class", "col-3 col-md-4");
  const div8 = document.createElement("div");
  div8.setAttribute("class", "col-3 col-md-4");
  const div9 = document.createElement("div");
  div9.setAttribute("class", "col-4 col-md-4");
  const nickUser = document.createElement("h5");
  const changePost = document.createElement("textarea");
  changePost.setAttribute("disabled", "disabled");
  const btnUpdateSave = document.createElement("h3");
  btnUpdateSave.setAttribute("class", "hidden fas fa-save");
  const btnUpdate = document.createElement("h3");
  btnUpdate.setAttribute("class", "fas fa-edit");
  const btnDelete = document.createElement("h3");
  btnDelete.setAttribute("class", "fas fa-trash-alt");
  const btnpublic = document.createElement("select");
  const wantSee = document.createElement("option");
  wantSee.setAttribute("value", "election");
  const wantSeeToday = document.createTextNode("Ver como:");
  wantSee.appendChild(wantSeeToday);
  const onlyWorld = document.createElement("option");
  onlyWorld.setAttribute("value", "world");
  const seeWorld = document.createTextNode("Público");
  onlyWorld.appendChild(seeWorld);

  nickUser.innerHTML = nameUserId;
  let saveNumber = likePost;
  console.log("este es like post", likePost);

  const postData = {
    uid: userId,
    body: changePost.value,
    key: keyPost,
    like: likePost,
    dislike: dislikePost,
    name: nameUserId,
  };
  let saveDisNumber = dislikePost;
  //el valor del like va ir cambiando en ambos lados segun corresponde :
  firebase.database().ref(`user-posts`).child(userId).child(keyPost).on("value", snap => {
    changePost.innerHTML = snap.val().body;
  })
  //editar  
  btnUpdate.addEventListener('click', () => {
    btnUpdateSave.removeAttribute("class");
    btnUpdateSave.setAttribute("class", "fas fa-save");
    btnUpdate.setAttribute("class", "hidden");
    changePost.removeAttribute("disabled");
  });
  btnUpdateSave.addEventListener('click', () => {
    btnUpdate.removeAttribute("class");
    btnUpdate.setAttribute("class", 'fas fa-edit');
    btnUpdateSave.setAttribute("class", "hidden");
    changePost.setAttribute("disabled", "disabled");
    const postData = {
      uid: userId,
      body: changePost.value,
      key: keyPost,
      like: likePost,
      dislike: dislikePost,
      name: nameUserId,
    };
    firebase.database().ref().child(`/user-posts/${userId}/${keyPost}`).set(postData);
    firebase.database().ref().child(`posts/${keyPost}`).set(postData);
  });
  //borrar
  btnDelete.addEventListener('click', () => {
    const opcion = confirm("Deseaes eliminar este post");
    if (opcion == true) {
      firebase.database().ref().child(`/user-posts/${userId}/${keyPost}`).remove();
      firebase.database().ref().child(`posts/${keyPost}`).remove();
      divDelete.remove();
    } else {}
  });
  //publicar 
  btnpublic.addEventListener("change", () => {
    const postData = {
      uid: userId,
      body: changePost.value,
      key: keyPost,
      like: likePost,
      dislike: dislikePost,
      name: nameUserId,
    };
    if (btnpublic.value === "world") {
      const opcion = confirm('Deseas volver publico el post');
      if (opcion) {
        firebase.database().ref().child(`/user-posts-world/${userId}/${keyPost}`).set(postData);
        firebase.database().ref().child(`/user-posts-public/${userId}/${keyPost}`).set(postData);
        firebase.database().ref().child(`/user-posts/${userId}/${keyPost}`).remove();
        firebase.database().ref().child(`posts/${keyPost}`).remove();
        divDelete.remove();
      }
    }
  })
  divDelete.appendChild(div2);
  div2.appendChild(div3);
  div2.appendChild(div4);
  div2.appendChild(div5);
  div3.appendChild(nickUser);
  div4.appendChild(changePost);
  div5.appendChild(div6);
  div6.appendChild(div7);
  div6.appendChild(div8);
  div6.appendChild(div9);
  div7.appendChild(btnUpdate);
  div7.appendChild(btnUpdateSave);
  div8.appendChild(btnDelete);
  div9.appendChild(btnpublic);
  btnpublic.appendChild(wantSee);
  btnpublic.appendChild(onlyWorld);
  postL.appendChild(divDelete);
  return postData;
}
//llamar datos post publicos
const returnDataPublic = (uid, html) => {
  const userUbication = firebase.database().ref('users').child(uid);
  userUbication.on("value", snap => {
    const nameUserId = snap.val().userNickName;
    html.innerHTML = `Bienvenid@  ${nameUserId}`;
    const postUbication = firebase.database().ref('user-posts-public').child(uid);
    postUbication.on("child_added", snap => {
      console.log('<AZDCGBJM,LÑMKNFCDRSE', snap.val().body);

      const key = snap.val().key;
      const listPost = snap.val().body;
      const numLike = snap.val().like;
      const numDisLike = snap.val().dislike;
      showDataPublic(uid, key, listPost, numLike, numDisLike, nameUserId);
    });
  })
}
// pintar datos post publicos para pefil
const showDataPublic = (userId, keyPost, posts, likePost, dislikePost, nameUserId) => {
  const divDelete = document.createElement("div");
  divDelete.setAttribute("class", "col-md-12 border border-dark mt-2");
  const div2 = document.createElement("div");
  div2.setAttribute("class", "row");
  const div3 = document.createElement("div");
  div3.setAttribute("class", "col-md-12 text-center bg-dark text-white");
  const div4 = document.createElement("div");
  div4.setAttribute("class", "col-md-12");
  const div5 = document.createElement("div");
  div5.setAttribute("class", "col-md-12");
  const div6 = document.createElement("div");
  div6.setAttribute("class", "row");
  const div7 = document.createElement("div");
  div7.setAttribute("class", "col-3 col-md-4");
  const div8 = document.createElement("div");
  div8.setAttribute("class", "col-3 col-md-4");
  const div9 = document.createElement("div");
  div9.setAttribute("class", "col-4 col-md-4");
  const nickUser = document.createElement("h5");
  const changePost = document.createElement("textarea");
  changePost.setAttribute("disabled", "disabled");
  const btnUpdateSave = document.createElement("h3");
  btnUpdateSave.setAttribute("class", "hidden fas fa-save");
  const btnUpdate = document.createElement("h3");
  btnUpdate.setAttribute("class", "fas fa-edit");
  const btnDelete = document.createElement("h3");
  btnDelete.setAttribute("class", "fas fa-trash-alt");
  const btnpublic = document.createElement("select");
  const wantSee = document.createElement("option");
  wantSee.setAttribute("value", "election");
  const wantSeeToday = document.createTextNode("Ver como:");
  wantSee.appendChild(wantSeeToday);
  const onlyMe = document.createElement("option");
  onlyMe.setAttribute("value", "only me");
  const seeMe = document.createTextNode("Privado");
  onlyMe.appendChild(seeMe);


  nickUser.innerHTML = nameUserId;
  let saveNumber = likePost;
  console.log("este es like post", likePost);

  const postData = {
    uid: userId,
    body: changePost.value,
    key: keyPost,
    like: likePost,
    dislike: dislikePost,
    name: nameUserId,
  };
  let saveDisNumber = dislikePost;
  //el valor del like va ir cambiando en ambos lados segun corresponde :
  firebase.database().ref(`user-posts-public`).child(userId).child(keyPost).on("value", snap => {
    changePost.innerHTML = snap.val().body;
  })
  //editar  
  btnUpdate.addEventListener('click', () => {
    btnUpdateSave.removeAttribute("class");
    btnUpdateSave.setAttribute("class", "fas fa-save");
    btnUpdate.setAttribute("class", "hidden");
    changePost.removeAttribute("disabled");
  });
  btnUpdateSave.addEventListener('click', () => {
    btnUpdate.removeAttribute("class");
    btnUpdate.setAttribute("class", 'fas fa-edit');
    btnUpdateSave.setAttribute("class", "hidden");
    changePost.setAttribute("disabled", "disabled");
    const postData = {
      uid: userId,
      body: changePost.value,
      key: keyPost,
      like: likePost,
      dislike: dislikePost,
      name: nameUserId,
    };
    firebase.database().ref().child(`/user-posts-public/${userId}/${keyPost}`).set(postData);
    firebase.database().ref().child(`/user-posts-world/${userId}/${keyPost}`).set(postData);
    firebase.database().ref().child(`posts/${keyPost}`).set(postData);
  });
  //borrar
  btnDelete.addEventListener('click', () => {
    const opcion = confirm("Deseaes eliminar este post");
    if (opcion == true) {
      firebase.database().ref().child(`/user-posts-world/${userId}/${keyPost}`).remove();
      firebase.database().ref().child(`/user-posts-public/${userId}/${keyPost}`).remove();
      firebase.database().ref().child(`posts/${keyPost}`).remove();
      divDelete.remove();
    } else {}
  });
  //publicar 
  btnpublic.addEventListener("change", () => {
    const postData = {
      uid: userId,
      body: changePost.value,
      key: keyPost,
      like: likePost,
      dislike: dislikePost,
      name: nameUserId,
    };

    if (btnpublic.value === "only me") {
      const opcion = confirm("Deseas eliminar este post en el muro publico");
      if (opcion == true) {
        firebase.database().ref().child(`/user-posts-world/${userId}/${keyPost}`).remove();
        firebase.database().ref().child(`/user-posts-public/${userId}/${keyPost}`).remove();
        firebase.database().ref().child(`/user-posts/${userId}/${keyPost}`).set(postData);
        firebase.database().ref().child(`posts/${keyPost}`).set(postData);
        divDelete.remove();

      }
    }
  })
  divDelete.appendChild(div2);
  div2.appendChild(div3);
  div2.appendChild(div4);
  div2.appendChild(div5);
  div3.appendChild(nickUser);
  div4.appendChild(changePost);
  div5.appendChild(div6);
  div6.appendChild(div7);
  div6.appendChild(div8);
  div6.appendChild(div9);
  div7.appendChild(btnUpdate);
  div7.appendChild(btnUpdateSave);
  div8.appendChild(btnDelete);
  div9.appendChild(btnpublic);
  btnpublic.appendChild(wantSee);
  btnpublic.appendChild(onlyMe);
  postP.appendChild(divDelete);
  return postData;
}

const returnDataWorl = (uid,estado) => {
  const postPublicWorld = firebase.database().ref().child("user-posts-world");
  postPublicWorld.on("value", snap => {
    const entre = Object.values(snap.val());
    entre.forEach(element => {
      const body = Object.values(element);
      body.forEach(element => {
        const userUid = element.uid;
        const userKey = element.key;
        const userlike = element.like;
        const userDislike = element.dislike;
        const userbody = element.body;
        console.log(userUid, userKey);
        firebase.database().ref('users').child(userUid).on("value", snap => {
          const userName = snap.val().userNickName;
          showWorld(userUid, userKey, userName, userbody, userlike, userDislike,estado);
        })
      });
    });
  });
}
const showWorld = (uid, key, userName, postGlobal, userlike, userDislike,estado) => {

  const divDelete = document.createElement("div");
  divDelete.setAttribute("class", "col-md-12 border border-dark mt-2");
  const div2 = document.createElement("div");
  div2.setAttribute("class", "row");
  const div3 = document.createElement("div");
  div3.setAttribute("class", "col-md-12 text-center bg-dark text-white");
  const div4 = document.createElement("div");
  div4.setAttribute("class", "col-md-12");
  const div5 = document.createElement("div");

  if(estado==='anonimo'){
   div5.setAttribute("class", "col-md-12 hidden"); 
  }
  else{
    div5.setAttribute("class", "col-md-12");
  }
  const div6 = document.createElement("div");
  div6.setAttribute("class", "row");
  const div7 = document.createElement("div");
  div7.setAttribute("class", "col-3 col-md-3");
  const div8 = document.createElement("div");
  div8.setAttribute("class", "col-3 col-md-3");
  const div9 = document.createElement("div");
  div9.setAttribute("class", "col-3 col-md-3");
  const div10 = document.createElement("div");
  div10.setAttribute("class", "col-3 col-md-3");
  const nickUser = document.createElement("h5");
  const like = document.createElement("h5");
  const dislike = document.createElement("h5");
  const btnLike = document.createElement("h5");
  btnLike.setAttribute("class", "fas fa-thumbs-up");
  const btnDislike = document.createElement("h5");
  btnDislike.setAttribute("class", "fas fa-thumbs-down");
  const changePost = document.createElement("textarea");
  changePost.setAttribute("disabled", "disabled");
  nickUser.innerHTML = userName;
  changePost.innerHTML = postGlobal;
 

  firebase.database().ref(`user-posts-public/${uid}`).child(key).on("value", snap => {
    console.log(snap.val());
    
    like.innerHTML = snap.val().like;
    dislike.innerHTML = snap.val().dislike;
  })

  const postData = {
    uid: uid,
    body: postGlobal,
    key: key,
    like: userlike,
    dislike: userDislike,
    name: userName,
  };

  btnLike.addEventListener('click',()=>{
    let contador=parseInt(userlike)+1;
    postData.like=contador;
    firebase.database().ref().child(`/user-posts-world/${uid}/${key}`).set(postData);
    firebase.database().ref().child(`/user-posts-public/${uid}/${key}`).set(postData);
    firebase.database().ref().child(`/user-posts/${uid}/${key}`).set(postData);
    firebase.database().ref().child(`posts/${key}`).set(postData);
  })
  btnDislike.addEventListener('click',()=>{
    let contador=parseInt(userDislike)+1;
    console.log(contador);
    
    postData.dislike=contador;
    firebase.database().ref().child(`/user-posts-world/${uid}/${key}`).set(postData);
    firebase.database().ref().child(`/user-posts-public/${uid}/${key}`).set(postData);
    firebase.database().ref().child(`/user-posts/${uid}/${key}`).set(postData);
    firebase.database().ref().child(`posts/${key}`).set(postData);
  })





  divDelete.appendChild(div2);
  div2.appendChild(div3);
  div2.appendChild(div4);
  div2.appendChild(div5);
  div3.appendChild(nickUser);
  div4.appendChild(changePost);
  div5.appendChild(div6);
  div6.appendChild(div7);
  div7.appendChild(btnLike);
  div6.appendChild(div8);
  div8.appendChild(like);
  div6.appendChild(div9);
  div9.appendChild(btnDislike);
  div6.appendChild(div10);
  div10.appendChild(dislike);


  postWord.appendChild(divDelete);
};

window.writeUserData = writeUserData;
window.writeNewPost = writeNewPost;
window.returnData = returnData;
window.showData = showData;
window.returnDataPublic = returnDataPublic;
window.showWorld = showWorld;