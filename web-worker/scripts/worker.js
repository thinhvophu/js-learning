onmessage = (e) => {
    const receivedMessage = e.data;
    const response = "Received message: " + receivedMessage;
    postMessage(response); // send message back to main thread
};

console.log('Worker in its context', self);