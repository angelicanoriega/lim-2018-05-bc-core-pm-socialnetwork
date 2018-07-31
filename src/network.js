const writeUserData = (userId, name, nickName, email, imageUrl) => {
  firebase.database().ref(`users/${userId}`).set({
    usersId: userId,
    userName: name,
    userNickName: nickName,
    email: email,
    profile_picture: imageUrl
  });
}

const writeNewPost = (uid, body) => {
  // Get a key for a new Post.
  const newPostKey = firebase.database().ref().child('posts').push().key;
  // A post entry.

  const postData = {
    uid: uid,
    body: body,
    key: newPostKey,
    like: ''
  };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates[`/posts/${newPostKey}`] = postData;
  updates[`/user-posts/${uid}/${newPostKey}`] = postData;

  firebase.database().ref().update(updates);
  return newPostKey;
}

const returnData = (uid) => {
  console.log(uid);

  const userUbication = firebase.database().ref('users').child(uid);
  userUbication.on("value", snap => {

    let listUserId = snap.val().userNickName;
    userName.innerHTML = `Bienvenid@  ${listUserId}`;
    console.log(listUserId);

    const postUbication = firebase.database().ref('user-posts').child(uid);
    postUbication.on("child_added", snap => {
      const listPost = snap.val().body;
      const key = snap.val().key;
      const numLike = snap.val().like;
      console.log(listPost);
      showData(listPost, key, uid, numLike);
    });
  })
}

const showData = (posts, keyPost, userId, likePost) => {
  const postL = document.getElementById("post-list");

  const divDelete = document.createElement("div");
  const tab = document.createElement("br")
  const changePost = document.createElement("textarea");
  changePost.setAttribute("disabled", "disabled");
  const tell = document.createElement("span");
  const like = document.createElement("input");
  like.setAttribute("value", "Like");
  like.setAttribute("type", "button");
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

  changePost.innerHTML = posts;
  tell.innerHTML = likePost;
  let saveNumber = '';
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
      like: likePost
    };
    firebase.database().ref().child(`/user-posts/${userId}/${keyPost}`).set(postData);
    firebase.database().ref().child(`posts/${keyPost}`).set(postData);
  });

  btnDelete.addEventListener('click', () => {
    const opcion = confirm("Deseaes eliminar este post");
    if (opcion == true) {
      firebase.database().ref().child(`/user-posts/${userId}/${keyPost}`).remove();
      firebase.database().ref().child(`posts/${keyPost}`).remove();
      divDelete.remove();
    } else {
      alert(":)");
    }
  });

  like.addEventListener('click', () => {
    tell.innerHTML++
    const postData = {
      uid: userId,
      body: changePost.value,
      key: keyPost,
      like: tell.value++
    };
    firebase.database().ref().child(`/user-posts/${userId}/${keyPost}`).set(postData);
    firebase.database().ref().child(`posts/${keyPost}`).set(postData);
  });

  divDelete.appendChild(changePost);
  divDelete.appendChild(tab);
  divDelete.appendChild(tell);
  divDelete.appendChild(like);
  divDelete.appendChild(btnUpdate);
  divDelete.appendChild(btnUpdateSave);
  divDelete.appendChild(btnDelete);
  postL.appendChild(divDelete);
}
