module.exports = {

    actionName: 'get.price',

    fulfillment: (GdaxClient, currency) => (
        (app) => {
            console.log(GdaxClient)
            GdaxClient.getProductTicker((err, req, data) => {
                if (err) {
                    app.tell("There was an error!");
                }

                if (data && data.price) {
                    app.tell(`The current price of ${currency} is ${data.price}`);
                } else {
                    app.tell("Error retrieving price");
                }
            })
        }
    )
}
