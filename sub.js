var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
    if(err){
        throw err;
    }
    connection.createChannel((err, channel) => {
        if(err){
            throw err;
        }
        let queueName = "myQueue";
        channel.assertQueue( queueName ,{ // Create queue if there is no queue in the server
            durable: false // True: If there is no subscriber then this queue will be deleted
        })
        channel.consume(queueName, (msg) => {
            console.log(`Received: ${msg.content.toString()}`) // As message is in form of a buffer sp content holds the buffer and we convert it to string
            channel.ack(msg); // Explicit acknowledgement to the message
        })

        // To implicitly send acknowledgement to the queue that msg is received use { noAck: true } in consume callback
    })
})