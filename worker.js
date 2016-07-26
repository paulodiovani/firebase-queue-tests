'use strict';

const Firebase = require('firebase');
const Queue = require('firebase-queue');

const config = require('rc')('fbqueue');

const ref = Firebase.initializeApp({
    databaseURL: config.databaseURL,
    serviceAccount: config.serviceAccount
}).database().ref('queue');

new Queue(ref, { numWorkers: 2 }, (data, progress, resolve, reject) => {

    console.log(data);
    resolve();
});
