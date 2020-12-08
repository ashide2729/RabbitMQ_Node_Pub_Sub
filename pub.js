var amqp = require('amqplib/callback_api');

amqp.connect(`amqp://localhost`, (err, connection) => {
    if(err){
        throw err;
    }
    connection.createChannel((err, channel) => {
        if(err){
            throw err;
        }
        let queueName = "myQueue";
        let message = "This is a message. Hello !";
        channel.assertQueue( queueName ,{ // Create queue if there is no queue in the server
            durable: false // True: If there is no subscriber then this queue will be deleted
        })
        channel.sendToQueue(queueName, Buffer.from(message));
        setTimeout(()=>{
            connection.close();
        }, 1000)
    })
})