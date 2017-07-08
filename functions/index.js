'use strict'; 

process.env.DEBUG = 'actions-on-google:*';

const Assistant = require('actions-on-google').ApiAiApp;
const Gdax = require('gdax');
const GdaxClient = new Gdax.PublicClient(['LTC-USD']);
const functions = require('firebase-functions');

exports.getLTCPrice = functions.https.onRequest((req, res) => {
    const app = new Assistant({request: req, response: res});
    console.log("Request is: ", req);
    console.log("App is: ", app);

    function mainIntent(app) {
        console.log("Main intent called");
        let inputPrompt = app.buildInputPrompt("Welcome. Say something");
        app.ask(inputPrompt);
    }

    function getPrice(app) {
        console.log("Get price called");
        GdaxClient.getProductTicker((err, req, data) => {
            if(err) {
                app.tell("There was an error!");
            }

            console.log('err', err);
            console.log('data', data);
            if(data && data.price) {
                app.tell("The current price of Litecoin is " + data.price);
            } else {
                app.tell("Error retrieving Litecoin price");
            }
        })
    }

    // Map actions
    let actionMap = new Map();
    actionMap.set('main', mainIntent);
    actionMap.set('get.price', getPrice);
    app.handleRequest(actionMap);
});