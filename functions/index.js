const functions = require('firebase-functions');
const admin = require('firebase-admin');
const config = functions.config();

const sms_provider = require('./sms-provider')(config.sms_provider);

const plivo_provider = require('./plivo')(config.plivo, config.phone_numbers);

const { BULK_LIMIT } = sms_provider;

const INITIAL_TEXT_ORGANIZATION = `Hi`.trimLeft();

const INITIAL_TEXT = `Hi,`.trimLeft();

const is_phone_number = phone_number => /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(phone_number);


const is_bad_phone_number_candidate = phone_number =>
  !phone_number || typeof phone_number !== 'string' || !is_phone_number(phone_number);

const send_failure = (response, reason) =>
  response.send(JSON.stringify({
    result: 'failure',
    reason
  }));

function object_values(obj) {
  const res = [];
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      res.push(obj[i]);
    }
  }
  return res;
}

const mlFunctionStub = () => null;

admin.initializeApp();

const write_image_analysis_result = (image_data, ml_results) => {
  return admin
    .database()
    .ref('/donations/images-submitted')
    .push()
    .then(({ key }) => {
      const updates = {};
      updates[`/donations/${key}/verified-good`] = { image_data, ml_results };
      return admin
        .database()
        .ref()
        .update(updates);
    });
};

exports.accept_photo_upload = functions.https.onCall((data, context) => {
  const { base_64_image_data } = data;
  const imageMLResults = mlFunctionStub(base_64_image_data);
  // Write code to the DB about the results
  return JSON.stringify(imageMLResults);
});

exports.subscribe_donor_alert_number = functions.https.onCall((data, context) => {
  const { subscribe_to_alerts_phone_number } = data;
    try {
      const {
        phone_number,
        signup_as,
        is_beeline
      } = data;
      check_params(phone_number, signup_as);
      const with_no_spaces_phone_number = phone_number.replace(/-/g, '').replace(/ /g, '');
      const is_not_well_formatted = is_bad_phone_number_candidate(with_no_spaces_phone_number);
      if (is_not_well_formatted) {
        console.info({
          msg: `Non Armenian mobile phone provided`,
          raw_body: data
        });
        throw new functions.https.HttpsError('invalid-argument', 'Only Armenian numbers accepted');
      } else {
        return check_if_user_already_exists(with_no_spaces_phone_number)
          .then(({
            user_already_exists,
            user
          }) => {
            if (user_already_exists) {
              console.warn(`${phone_number} already had account`);
              throw new functions.https.HttpsError(
                'invalid-argument',
                'Phone number already registered '
              );
            } else {
              return persist_new_user({
                phone_number: with_no_spaces_phone_number,
                signup_as,
              });
            }
          })
          .then(increment_total_user_count)
          .then(() => {
            let message = INITIAL_TEXT;
            RECEIPENT_T.GOVERNMENT === signup_as && (message = INITIAL_TEXT_GOV_WORKER);
            return sms_provider.send_message({
              content: message,
              to: [with_no_spaces_phone_number]
            });
          })
          .then(msg_queue => ({
            result: 'success'
          }));
      }
    } catch (e) {
      return Promise.resolve({
        result: 'failure',
        reason: e.message
      });
    }
  return { foo: 'bar' };
});

exports.accept_donor_sms_reply = functions.https.onRequest((request, response) => {
  return 10;
});

exports.check_if_send_sms = functions.database
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

