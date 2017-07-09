module.exports = {

    actionName: 'get.24HrStats',

    fulfillment: (GdaxClient, currency) => (
        (app) => {
            GdaxClient.getProduct24HrStats((err, req, data) => {
                if (err) {
                    app.tell("There was an error!");
                }

                if (data) {
                    app.tell(`Here are the 24 hour stats for ${currency}.
                      Opening price was ${data.open}. High was ${data.high}.
                      Low was ${data.low}. Volume traded was ${data.volume}.
                    `);
                } else {
                    app.tell("Error retrieving 24 hour stats");
                }
            })
        }
    )
}
