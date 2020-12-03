onmessage = (e) => {
    const receivedMessage = e.data;
    const response = "Received message: " + receivedMessage;
    result.data;
    postMessage(response); // send message back to main thread
};

