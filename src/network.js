//pintar los datos iniciales del usuario
const writeUserData = (userId, name, nickName, email, imageUrl) => {
  firebase.database().ref(`users/${userId}`).set({
    usersId: userId,
    userName: name,
    userNickName: nickName,
    email: email,
    profile_picture: imageUrl
  });
}
//pintar los post de los usuarios
const writeNewPost = (uid, body) => {
  // Get a key for a new Post.
  const newPostKey = firebase.database().ref().child('posts').push().key;
  // A post entry.
  const postData = {
    uid: uid,
    body: body,
    key: newPostKey,
    like: 0,
    dislike:0

  };
  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates[`/posts/${newPostKey}`] = postData;
  updates[`/user-posts/${uid}/${newPostKey}`] = postData;
  firebase.database().ref().update(updates);
  return newPostKey;
}
//llamar datos post privados
const returnData = (uid) => {
  console.log(uid);

  const userUbication = firebase.database().ref('users').child(uid);
  userUbication.on("value", snap => {

    const listUserId = snap.val().userNickName;
    userName.innerHTML = `Bienvenid@  ${listUserId}`;
    console.log(listUserId);

    const postUbication = firebase.database().ref('user-posts').child(uid);
    postUbication.on("child_added", snap => {
      const listPost = snap.val().body;
      const key = snap.val().key;
      const numLike = snap.val().like;
      const numDisLike=snap.val().dislike;
      showData(listPost, key, uid, numLike,numDisLike);
    });
  })
}
//pintar datos post privados
const showData = (posts, keyPost, userId, likePost,dislikePost ) => {
  const divDelete = document.createElement("div");
  const tab = document.createElement("br")
  const changePost = document.createElement("textarea");
  changePost.setAttribute("disabled", "disabled");
  const tellLike = document.createElement("span");
  const like = document.createElement("input");
  like.setAttribute("value", "Like");
  like.setAttribute("type", "button"); 
  const tellDisLike = document.createElement("span");
  const disLike = document.createElement("input");
  disLike.setAttribute("value", "DisLike");
  disLike.setAttribute("type", "button");
  const btnUpdateSave = document.createElement("input");
  btnUpdateSave.setAttribute("value", "Guardar");
  btnUpdateSave.setAttribute("type", "button");
  btnUpdateSave.setAttribute("class", "hidden");
  const btnUpdate = document.createElement("input");
  btnUpdate.setAttribute("value", "Editar");
  btnUpdate.setAttribute("type", "button");
  const btnDelete = document.createElement("input");
  btnDelete.setAttribute("value", "Borrar");
  btnDelete.setAttribute("type", "button");
  const btnpublic = document.createElement("SELECT");
  const wantSee = document.createElement("option");
  wantSee.setAttribute("value", "election");
  const wantSeeToday = document.createTextNode("Ver como:");
  wantSee.appendChild(wantSeeToday); 
  const onlyMe = document.createElement("option");
  onlyMe.setAttribute("value", "only me");
  const seeMe = document.createTextNode("see me");
  onlyMe.appendChild(seeMe);
  const onlyWorld = document.createElement("option");
  onlyWorld.setAttribute("value", "world");
  const seeWorld = document.createTextNode("see world");
  onlyWorld.appendChild(seeWorld);

  changePost.innerHTML = posts;
  let saveNumber = likePost;
  let saveDisNumber = dislikePost;
  tellLike.innerHTML=likePost;
  tellDisLike.innerHTML=dislikePost;

//editar  
  btnUpdate.addEventListener('click', () => {
    btnUpdate.setAttribute("class", "hidden");
    btnUpdateSave.removeAttribute("class");
    changePost.removeAttribute("disabled");
  });

  btnUpdateSave.addEventListener('click', () => {
    btnUpdate.removeAttribute("class");
    btnUpdateSave.setAttribute("class", "hidden");
    changePost.setAttribute("disabled", "disabled");
    const postData = {
      uid: userId,
      body: changePost.value,
      key: keyPost,
      like: likePost,
      dislike:dislikePost,

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
      firebase.database().ref().child(`/user-posts-world/${keyPost}`).remove();
      divDelete.remove();
    } else {
      alert(":)");
    }
  });
//likes
  like.addEventListener('click', () => {
    let number=saveNumber++
    tellLike.innerHTML=number;
    const postData = {
      uid: userId,
      body: changePost.value,
      key: keyPost,
      like: number,
      dislike:dislikePost

    };
    firebase.database().ref().child(`/user-posts/${userId}/${keyPost}`).set(postData);
    firebase.database().ref().child(`posts/${keyPost}`).set(postData);
    firebase.database().ref().child(`/user-posts-world/${keyPost}`).set(postData);

  });
 //Dislike
 disLike.addEventListener('click', () => {
  let number=saveDisNumber++
  tellDisLike.innerHTML=number;
  const postData = {
    uid: userId,
    body: changePost.value,
    key: keyPost,
    like: likePost,
    dislike:number

  };
  firebase.database().ref().child(`/user-posts/${userId}/${keyPost}`).set(postData);
  firebase.database().ref().child(`posts/${keyPost}`).set(postData); 
  firebase.database().ref().child(`/user-posts-world/${keyPost}`).set(postData);


}); 
//publicar 
    btnpublic.addEventListener("change",()=>{
      if(btnpublic.value==="world"){
        console.log("hola");
        
        const postData = {
          uid: userId,
          body: changePost.value,
          key: keyPost,
          like: likePost,
          dislike:dislikePost
        };
        firebase.database().ref().child(`/user-posts-world/${keyPost}`).update(postData);
      }
      if(btnpublic.value==="only me"){
        console.log("hola e");

        const opcion = confirm("Deseaes eliminar este post");
        if (opcion == true) {
        firebase.database().ref().child(`/user-posts-world/${keyPost}`).remove();
          divDelete.remove();
        } else {
          alert(":)");
        }
      }
  })
  divDelete.appendChild(changePost);
  divDelete.appendChild(tab);
  divDelete.appendChild(tellLike);
  divDelete.appendChild(like);
  divDelete.appendChild(tellDisLike);
  divDelete.appendChild(disLike);
  divDelete.appendChild(btnUpdate);
  divDelete.appendChild(btnUpdateSave);
  divDelete.appendChild(btnDelete);
  btnpublic.appendChild(wantSee);
  btnpublic.appendChild(onlyMe);
  btnpublic.appendChild(onlyWorld);
  divDelete.appendChild(btnpublic);
  postL.appendChild(divDelete);
}

//llamar datos post publicos

const returnDataPublic = (uid) => {
  const postPublicWorld = firebase.database().ref().child("user-posts-world");
  postPublicWorld.on("child_added", snap => {
    const keyPost = snap.val().key;
    const likeGlobal = snap.val().like;
    const dislLikeGlobal = snap.val().dislike;
    const postGlobal = snap.val().body;
    console.log(postGlobal);
    showWorld(uid,keyPost,postGlobal,likeGlobal,dislLikeGlobal);
  })

}
const showWorld=(userId,keyPost,postGlobal,likeGlobal,dislLikeGlobal)=>{
  
  const divDelete = document.createElement("div");
  const tab = document.createElement("br")
  const changePost = document.createElement("textarea");
  changePost.setAttribute("disabled", "disabled");
  const tell = document.createElement("span");
  const like = document.createElement("input");
  like.setAttribute("value", "Like");
  like.setAttribute("type", "button");
  const tellDisLike = document.createElement("span");
  const disLike = document.createElement("input");
  disLike.setAttribute("value", "DisLike");
  disLike.setAttribute("type", "button");

  changePost.innerHTML = postGlobal;
  let saveNumber = likeGlobal;
  let saveDisNumber = dislLikeGlobal;
  tell.innerHTML=likeGlobal;
  tellDisLike.innerHTML=dislLikeGlobal;
  //like global
  like.addEventListener('click', () => {
    let number=saveNumber++
    tell.innerHTML=number;
    const postData = {
      uid: userId,
      body: changePost.value,
      key: keyPost,
      like: number,
      dislike:dislLikeGlobal
    };
    firebase.database().ref().child(`/user-posts/${userId}/${keyPost}`).set(postData);
    firebase.database().ref().child(`posts/${keyPost}`).set(postData);
    firebase.database().ref().child(`/user-posts-world/${keyPost}`).set(postData);
  });
  //Dislike Global
  disLike.addEventListener('click', () => {
    let number=saveDisNumber++
    tellDisLike.innerHTML=number;
    const postData = {
      uid: userId,
      body: changePost.value,
      key: keyPost,
      like: likeGlobal,
      dislike:number
  
    };
    firebase.database().ref().child(`/user-posts/${userId}/${keyPost}`).set(postData);
    firebase.database().ref().child(`posts/${keyPost}`).set(postData);
    firebase.database().ref().child(`/user-posts-world/${keyPost}`).set(postData);

  }); 

  divDelete.appendChild(changePost);
  divDelete.appendChild(tab);
  divDelete.appendChild(tell);
  divDelete.appendChild(like);
  divDelete.appendChild(tellDisLike);
  divDelete.appendChild(disLike);
  postWorld.appendChild(divDelete);

};
