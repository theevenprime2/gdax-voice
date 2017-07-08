const ActionsSdkApp = require('actions-on-google').ActionsSdkApp;
const Gdax = require('gdax');
const GdaxClient = new Gdax.PublicClient(['LTC-USD']);

exports.getLTCPrice = (req, res) => {
    const app = new ActionsSdkApp({request: req, response: res});

    function mainIntent(app) {
        let inputPrompt = app.buildInputPrompt(false, "Welcome. Say something");
        app.ask(inputPrompt)
    }

    function getPrice(app) {
        return GdaxClient.getProductTicker((tick) => {
            if(tick && tick.price) {
                app.tell(false, "The current price of Litecoin is " + tick.price)
            } else {
                app.tell(false, "Error retrieving Litecoin price")
            }
        })
    }

    // Map actions
    let actionMap = new Map();
    actionMap.set(app.StandardIntents.MAIN, mainIntent)
    actionMap.set(app.StandardIntents.TEXT, getPrice)
    app.handleRequest(actionMap);
}