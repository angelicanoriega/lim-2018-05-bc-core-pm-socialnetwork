
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
    // A post entry.
    const postData = {
      uid: uid,
      body: body,
    };
  
    // Get a key for a new Post.
    const newPostKey = firebase.database().ref().child('posts').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
    firebase.database().ref().update(updates);
    return newPostKey;
  }
  