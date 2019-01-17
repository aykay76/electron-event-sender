var sending = false
var timer = null

$("#clicky").click(function() {
    if (sending)
    {
        $("#status").text("Preparing to stop")
        clearInterval(timer)
    }
    else
    {
        $("#status").text("Preparing to send");
        const { EventHubClient, EventPosition } = require('@azure/event-hubs');

        const client = EventHubClient.createFromConnectionString("<connection string>", "<hub name>");

        timer = setInterval(async function() {
            // NOTE: For receiving events from Azure Stream Analytics, please send Events to an EventHub where the body is a JSON object.
            // const eventData = { body: { "message": "Hello World" }, partitionKey: "pk12345"};
            const eventData = { body: "Hello World", partitionKey: "pk12345"};
            const delivery = await client.send(eventData);
            console.log("message sent successfully.");
        }, 1000)
    }
})
