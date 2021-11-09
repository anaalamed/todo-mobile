import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

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

  const { id, name, phoneNumber, photoURL } = data;

  return admin.firestore().collection("users").doc(id).update({
    name: name,
    phoneNumber: phoneNumber,
    photoURL: photoURL,
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

exports.addTodo = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "only authenticated users can add requests"
    );
  }

  if (data.title.length > 30) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "request must be no more than 30 characters long"
    );
  }
  console.log(data);
  return admin.firestore().collection("todos").add({
    title: data.title,
    completed: false,
    // userId: context.auth.uid,
    userId: data.userId,
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

exports.updateTodo = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "only authenticated users can update todos"
    );
  }

  return admin.firestore().collection("todos").doc(data.id).update({
    title: data.title,
  });
});

exports.toggleCompleteTodo = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "only authenticated users can toggle todos"
    );
  }

  return admin.firestore().collection("todos").doc(data.id).update({
    completed: !data.completed,
  });
});


// // auth trigger - delete
// exports.userDeleted = functions.auth.user().onDelete((user) => {
//     console.log("user deleted", user);
//     const doc = admin.firestore().collection("users").doc(user.uid);
//     return doc.delete();
// });

