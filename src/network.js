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
      let listUser = snap.val().body;
      let key = snap.val().key;
      console.log(listUser);
      showData(listUser, key, uid);
      console.log(document.getElementsByClassName("eliminar"));
    });
  })
}

const showData = (posts, keyPost, userId) => {
  const postL = document.getElementById("post-list");
  postL.innerHTML +=
    `<div class="userPost">
      <textarea disabled id=${keyPost}>${posts}</textarea>
      <br>
      <span id=contador></span><input type=button class="like" value="like">
      <input type=button class="update" value="Editar">
      <input type=button class="hidden update-save"  value="Guardar">
      <input type=button class="delete" value="Borrar">
    </div>`;

  const btnsUpdateSave = document.getElementsByClassName("update-save");
  const btnsUpdate = document.getElementsByClassName("update");
  const btnsDelete = document.getElementsByClassName("delete");
  const divsDelete = document.getElementsByClassName("userPost");
  const chancePost = document.getElementById(keyPost);
  const like = document.getElementById("like");
  const contador = document.getElementById("contador");

  for (btnUpdate of btnsUpdate) {
    btnUpdate.addEventListener('click', () => {
      btnUpdate.setAttribute("class", "hidden");
      btnUpdateSave.removeAttribute("class");
      chancePost.removeAttribute("disabled");
    });
  }

  for (btnUpdateSave of btnsUpdateSave) {
    btnUpdateSave.addEventListener('click', () => {
      btnUpdate.removeAttribute("class");
      btnUpdateSave.setAttribute("class", "hidden");
      chancePost.setAttribute("disabled", "disabled");
      const postData = {
        uid: userId,
        body: chancePost.value,
        key: keyPost
      };
      firebase.database().ref().child(`/user-posts/${userId}/${keyPost}`).set(postData);
      firebase.database().ref().child(`posts/${keyPost}`).set(postData);
    });
  }

  for (btnDelete of btnsDelete) {
    btnDelete.addEventListener('click', () => {
      const opcion = confirm("Deseaes eliminar este post");
      if (opcion == true) {
        firebase.database().ref().child(`/user-posts/${userId}/${keyPost}`).remove();
        firebase.database().ref().child(`posts/${keyPost}`).remove();
        for (divDelete of divsDelete) {
          divDelete.remove();
        }
      } else {
        alert(":)");
      }
    });
  }
}
