const StreamChat = require('stream-chat').StreamChat;
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.generateToken = functions.database.ref('/users/{uid}')
    .onCreate((snapshot, context) => {
        // Grab the current value of what was written to the Realtime Database.
        const uid = snapshot.key;
        console.log(uid);

        const serverSideClient = new StreamChat('rc6yxksd5uam', 'w6vb5eaxyfh2acn88vct6h5x5zatqvzj4n5pkrqahr7f9p6mcdz5zgcwh53sq26s');
        const token = serverSideClient.createToken(uid);
        console.log(token);
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        return snapshot.ref.child('chattoken').set(token);
    });

exports.generateTokenOnClient = functions.https.onCall((uid, context) => {
        console.log(uid);

        const serverSideClient = new StreamChat('rc6yxksd5uam', 'w6vb5eaxyfh2acn88vct6h5x5zatqvzj4n5pkrqahr7f9p6mcdz5zgcwh53sq26s');
        const generatedToken = serverSideClient.createToken(uid);
        console.log(generatedToken);

        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        return { token : generatedToken};
        });
