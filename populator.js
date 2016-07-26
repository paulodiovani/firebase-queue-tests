'use strict';

const Firebase = require('firebase');
const Faker = require('faker');
const leftPad = require('left-pad');
const config = require('rc')('fbqueue');

const ref = Firebase.initializeApp({
    databaseURL: config.databaseURL,
    serviceAccount: config.serviceAccount
}).database().ref('queue');

const totalTasks = 1000;
const operations = [];
let counter = 0;

while (counter < totalTasks) {

    operations.push(
        ref
        .child('tasks')
        .push({
            name: Faker.name.findName(),
            number: ++counter
        })
    );
}

console.log('START PUSHING TO QUEUE');
console.time('QUEUE PROCESS');

Promise.all(operations).then(() => {

    console.log('DONE PUSHING TO QUEUE');
}).then(() => {

    let remainingTasks = totalTasks;
    return new Promise((resolve) => {

        ref.child('tasks').on('child_removed', () => {

            remainingTasks--;
            process.stdout.write(`\rremaining tasks: ${leftPad(remainingTasks, 3)}`);

            if (remainingTasks === 0) {
                process.stdout.write(`\n`);
                resolve();
            }
        });
    });
}).then(() => {

    console.log('DONE PROCESSING QUEUE');
    console.timeEnd('QUEUE PROCESS');
    process.exit();
});
