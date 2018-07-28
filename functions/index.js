const functions = require('firebase-functions');
const admin = require('firebase-admin');

const config = functions.config();

const sms_provider = require('./sms-provider')(config.sms_provider);

const plivo_provider = require('./plivo')(config.plivo, config.phone_numbers);

const { BULK_LIMIT } = sms_provider;

admin.initializeApp();

const cors = require('cors')({ origin: 'https://azathayastan.online' });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
