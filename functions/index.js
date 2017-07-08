'use strict'; 

const ActionsSdkApp = require('actions-on-google').ActionsSdkApp;
const Gdax = require('gdax');
const GdaxClient = new Gdax.PublicClient(['LTC-USD']);
const functions = require('firebase-functions');

exports.getLTCPrice = functions.https.onRequest((req, res) => {
    const app = new ActionsSdkApp({request: req, response: res});
    console.log("Request is: ", req);
    console.log("App is: ", app);

    function mainIntent(app) {
        console.log("Main intent called");
        let inputPrompt = app.buildInputPrompt(false, "Welcome. Say something");
        app.ask(inputPrompt);
    }

    function getPrice(app) {
        conosle.log("Get price called");
        return GdaxClient.getProductTicker((err, tick) => {
            if(tick && tick.price) {
                app.tell(false, "The current price of Litecoin is " + tick.price);
            } else {
                app.tell(false, "Error retrieving Litecoin price");
            }
        })
    }

    // Map actions
    let actionMap = new Map();
    actionMap.set('main', mainIntent);
    actionMap.set('get.price', getPrice);
    app.handleRequest(actionMap);
});