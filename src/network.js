
const writeUserData = (userId, name, nickName, email, imageUrl) => {
    firebase.database().ref('users/' + userId).set({
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
      key:newPostKey,
    };
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
    firebase.database().ref().update(updates);
    return newPostKey;
  }
  const returnData=(uid)=>{ 
    console.log(uid);

    const userUbication = firebase.database().ref('users').child(uid);
    userUbication.on("value", snap => {
  
      let listUserId =snap.val().userNickName;
      userName.innerHTML = `Bienvenid@  ${listUserId}`;
      console.log(listUserId);
  
      const postUbication = firebase.database().ref('user-posts').child(uid);
      postUbication.on("child_added", snap => {  
      let listUser =snap.val().body;
      let key=snap.val().key;
      console.log(listUser);
      showData(listUser,key);
    });
  })
}
const showData=(post,newPost)=>{
  
  const pol = document.getElementById("post-list");

  pol.innerHTML+=
  "<div>"+
  "<input type=button id=btnUpdate value=editar>"+
  "<input type=button id=btnUpdate-save  class=hidden  value=guardar>"+
   "<input type=button id=btnDelete value=borrar>"+
  "<div id=postlist><textarea disabled id="+newPost+">"+post+"</textarea>"+
  "<input type=button id=like value=like><p id=contador></p>"+"</div>"
  +"</div>";

  let btnUpdateSave=document.getElementById("btnUpdate-save");
  console.log(btnUpdateSave);
  let btnUpdate=document.getElementById("btnUpdate");
  console.log("hola");
  let btnDelete=document.getElementById("btnDelete");    
  console.log("hola");
  let divDelete=document.getElementById("postlist");
  console.log("hola"); 
  let chancePost=document.getElementById(newPost);
  console.log("hola");
  let like=document.getElementById("like");
  let contador=document.getElementById("contador");
  console.log("hola");

  btnUpdate.addEventListener('click', () => {
    console.log("hola");
    
    btnUpdate.setAttribute("class", "hidden");
    btnUpdateSave.removeAttribute("class");
    chancePost.removeAttribute("disabled");
  });
  btnUpdateSave.addEventListener('click', () => {
    btnUpdate.removeAttribute("class");
    btnUpdateSave.setAttribute("class", "hidden");
    chancePost.setAttribute("disabled","disabled");
    const postData = {
      uid:userId ,
      body:chancePost.value ,
    };
    firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).update(postData);
    firebase.database().ref().child('posts/' + newPost).update(postData);
  });

  btnDelete.addEventListener('click', () => {
    const opcion = confirm("Deseaes eliminar este post");
    if (opcion == true) { 
    firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
    firebase.database().ref().child('posts/' + newPost).remove();

    divDelete.remove();

	  } else {
      alert(":)");
  	}

   


  });

  
}
