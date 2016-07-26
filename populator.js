'use strict';

const Firebase = require('firebase');
const Faker = require('faker');

const ref = Firebase.initializeApp({
    databaseURL: 'https://is-app-3b28f.firebaseio.com/',
    serviceAccount: './serviceAccountCredentials.json'
}).database().ref('queue');

const operations = [];
let counter = 0;

while (counter < 1000) {

    operations.push(
        ref
        .child('tasks')
        .push({
            name: Faker.name.findName(),
            number: ++counter
        })
    );
}

Promise.all(operations).then(() => {

    console.log('Done');
    process.exit();
});
