'use strict';

const Firebase = require('firebase');
const Queue = require('firebase-queue');

const ref = Firebase.initializeApp({
    databaseURL: 'https://is-app-3b28f.firebaseio.com/',
    serviceAccount: './serviceAccountCredentials.json'
}).database().ref('queue');

new Queue(ref, { numWorkers: 2 }, (data, progress, resolve, reject) => {

    console.log(data);

    if (data.number === 171) {
        reject('deu ruim');
    }

    resolve();
});
