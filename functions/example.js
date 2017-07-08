module.exports = {
    
    actionName: 'get.price',

    fulfillment: (app) => {
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
}