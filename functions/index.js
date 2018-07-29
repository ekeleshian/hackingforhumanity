const functions = require('firebase-functions');
const admin = require('firebase-admin');
const config = functions.config();

const mlFunctionStub = () => null;

admin.initializeApp();

const write_image_analysis_result = imageData => {
  return admin
    .database()
    .ref('/donations/images-submitted')
    .push()
    .then(({ key }) => {
      const updates = {};
      updates[`/donations/${key}/verified-good`] = { imageData };
      return admin
        .database()
        .ref()
        .update(updates);
    });
};

exports.accept_photo_upload = functions.https.onCall((data, context) => {
  const { photoImageBase64 } = data;
  const imageMLResults = mlFunctionStub(photoImageBase64);

  // Write code to the DB about the results
  return JSON.stringify(imageMLResults);
});

exports.accept_donor_sms_reply = functions.https.onRequest((request, response) => {
  return 10;
});

exports.makeUppercase = functions.database
  .ref('/donations/{pushId}/verified-good')
  .onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const original = snapshot.val();
    // Find the person most interested and ready to answer

    // console.log('Uppercasing', context.params.pushId, original);
    // const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    // return snapshot.ref.parent.child('uppercase').set(uppercase);
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
