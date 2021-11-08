import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


admin.initializeApp();

// // auth trigger - sign up
// exports.signUp = functions.auth.user().onCreate((user) => {
//     console.log("user created", user);
//     return admin.firestore().collection("users").doc(user.uid).set({
//         email: user.email,
//         name: user.displayName,
//         upvotedOn: [],
//     });
// });

// // auth trigger - delete
// exports.userDeleted = functions.auth.user().onDelete((user) => {
//     console.log("user deleted", user);
//     const doc = admin.firestore().collection("users").doc(user.uid);
//     return doc.delete();
// });

// http callable func (add req)



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


// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     const original = req.query.text;
//     const result = await admin.firestore().collection("messages").add({ original });
//     res.json({ result: `Message with ID: ${result.id} added.` });
// });

// exports.makeUppercase = functions.firestore.document("/messages/{documentId}")
//     .onCreate((snap, context) => {
//         const original = snap.data().original;
//         functions.logger.log("Uppercasing", context.params.documentId, original);
//         const uppercase = original.toUpperCase();
//         return snap.ref.set({ uppercase }, { merge: true });
//     });
