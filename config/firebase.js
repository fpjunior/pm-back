const firebase = require('firebase/app');
require('firebase/database');
require('firebase/auth');
const firebaseConfig = require('../config/config-firebase');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

module.exports = firebase;