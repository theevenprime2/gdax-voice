'use strict';

process.env.DEBUG = 'actions-on-google:*';

const Assistant = require('actions-on-google').ApiAiApp;
const Gdax = require('gdax');
const functions = require('firebase-functions');

const getPrice = require('./getPrice');
const get24HrStats = require('./get24HrStats');

exports.handler = functions.https.onRequest((req, res) => {
    const app = new Assistant({ request: req, response: res });

    const currencyIds = {
      bitcoin: 'BTC-USD',
      litecoin: 'LTC-USD',
      ethereum: 'ETH-USD',
    }

    const currency = app.getArgument('currency-name')

    const GdaxClient = new Gdax.PublicClient(currencyIds[currency]);

    function mainIntent(app) {
        let inputPrompt = app.buildInputPrompt("Welcome. Say something");
        app.ask(inputPrompt);
    }

    // Map actions
    let actionMap = new Map();
    actionMap.set('main', mainIntent);
    actionMap.set(getPrice.actionName, getPrice.fulfillment(GdaxClient, currency));
    actionMap.set(get24HrStats.actionName, get24HrStats.fulfillment(GdaxClient, currency));

    app.handleRequest(actionMap);
});
