import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const getTime = () => {
  const today = new Date();
  const date = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
  const time = today.getHours() + 2 + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes());
  const dateTime = date + " " + time;
  return dateTime;
};

// ------------------------------ Auth Functions ----------------------------------

exports.register = functions.https.onCall((data, context) => {
  const { email, password, name } = data;
  // console.log("register")

  return admin.auth().createUser({ email, password, displayName: name })
    .then((userRecord) => {
      console.log({ userRecord });
      return { id: userRecord.uid };
    })
    .catch((error) => {
      return { error: error.message };
    });
});

// auth trigger - sign up
exports.userJoined = functions.auth.user().onCreate((user) => {
  console.log("user created", user);
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    name: user.displayName,
  });
});

exports.getUser = functions.https.onRequest(async (req, res) => {
  console.log("get user");

  const email = req.body.data;

  const doc = await admin.firestore().collection("users").where("email", "==", email).get();
  // console.log(doc);

  let user = {};
  doc.forEach((doc) => {
    user = { id: doc.id, ...doc.data() };
  });
  console.log(user);
  res.send({ data: user });
});

exports.updateUser = functions.https.onCall((data, context) => {
  console.log("update profile");
  console.log(data);

  const { id, name, phoneNumber, photoURL, about, bgColor } = data;

  return admin.firestore().collection("users").doc(id).update({
    name: name,
    phoneNumber: phoneNumber,
    photoURL: photoURL,
    about: about,
    bgColor: bgColor
  });
});


// ------------------------------ Todos Functions ----------------------------------

exports.getTodos = functions.https.onRequest(async (req, res) => {
  const email = req.body.data.email;
  console.log(email);
  const snapshot = await admin.firestore().collection("todos").where("userId", "==", email).get();
  const arr: any = [];

  snapshot.forEach((doc) => {
    arr.push({ id: doc.id, ...doc.data() });
  });
  res.send({ data: arr });
});

exports.addTodo = functions.https.onRequest(async (req, res) => {
  const { title, description, userId, important, color } = req.body.data;

  console.log(title);

  const todo = {
    title: title,
    description: description,
    completed: false,
    important: important || false,
    color: color,
    userId: userId,
    createdAt: getTime(),
  };

  admin.firestore().collection("todos").add(todo)
    .then((resp) => {
      console.log(resp.id);
      const newTodo = { id: resp.id, ...todo };
      // console.log(newTodo);
      res.send({ data: newTodo });
    })
    .catch((error) => {
      res.send({ message: "something went wrong" });
    });
});

exports.deleteTodo = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "only authenticated users can delete todos"
    );
  }

  return admin.firestore().collection("todos").doc(data.id).delete();
});

exports.updateTodo = functions.https.onRequest(async (req, res) => {
  const { id, title, description, important, color } = req.body.data;

  const todo = {
    title: title,
    description: description,
    important: important,
    color: color,
    updatedAt: getTime(),
  };

  await admin.firestore().collection("todos").doc(id).update(todo);
  const updatedTodo = await admin.firestore().collection("todos").doc(id).get();
  res.send({ data: { id: id, ...updatedTodo.data() } });
});

exports.toggleCompleteTodo = functions.https.onRequest(async (req, res) => {
  const { id, completed } = req.body.data;


  await admin.firestore().collection("todos").doc(id).update({
    completed: !completed,
    updatedAt: getTime(),
  });

  res.send({ data: { updatedAt: getTime() } });
});


// // auth trigger - delete
// exports.userDeleted = functions.auth.user().onDelete((user) => {
//     console.log("user deleted", user);
//     const doc = admin.firestore().collection("users").doc(user.uid);
//     return doc.delete();
// });


// const spawn = require('child-process-promise').spawn;
// const path = require('path');
// const os = require('os');
// const fs = require('fs');

// exports.uploadPhoto = functions.https.onRequest(async (req, res) => {
//   const fileName = 'name';
//   const contentType = 'image/png'
//   const bucket = admin.storage().bucket(fileBucket);
//   const tempFilePath = path.join(os.tmpdir(), fileName);
//   const metadata = {
//     contentType: contentType,
//   };

//   await bucket.file(filePath).download({ destination: tempFilePath });
//   functions.logger.log('Image downloaded locally to', tempFilePath);
//   // Generate a thumbnail using ImageMagick.
//   await spawn('convert', [tempFilePath, '-thumbnail', '200x200>', tempFilePath]);
//   functions.logger.log('Thumbnail created at', tempFilePath);
//   // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
//   const thumbFileName = `thumb_${fileName}`;
//   const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
//   // Uploading the thumbnail.
//   await bucket.upload(tempFilePath, {
//     destination: thumbFilePath,
//     metadata: metadata,
//   });
//   // Once the thumbnail has been uploaded delete the local file to free up disk space.
//   return fs.unlinkSync(tempFilePath);

// })
