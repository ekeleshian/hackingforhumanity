import * as firebase from 'firebase/app';
// Load up side effects
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDoKRV1VHcToRCMF5Ox3cdqzh6HasovEM8',
  authDomain: 'hack-for-humanity-3cc30.firebaseapp.com',
  databaseURL: 'https://hack-for-humanity-3cc30.firebaseio.com',
  projectId: 'hack-for-humanity-3cc30',
  storageBucket: 'hack-for-humanity-3cc30.appspot.com',
  messagingSenderId: '827189898628'
};

firebase.initializeApp(config);

export const subscribe_donor_alert_number = firebase
  .functions()
  .httpsCallable('subscribe_donor_alert_number');

export const post_image_data_for_analysis = firebase
  .functions()
  .httpsCallable('accept_photo_upload');
