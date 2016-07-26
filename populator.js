const Firebase = require('firebase');
const faker = require('faker');

const ref = Firebase.initializeApp({
  databaseURL: 'https://is-app-3b28f.firebaseio.com/',
  serviceAccount: './serviceAccountCredentials.json'
}).database().ref('queue');

const operations = [];
var counter = 0;

while(counter < 1000) {

  operations.push(
    ref
      .child('tasks')
      .push({
        name: faker.name.findName(),
        number: ++counter
      })
    );
}

Promise.all(operations).then(() => {

  console.log('Done');
  process.exit();
});
