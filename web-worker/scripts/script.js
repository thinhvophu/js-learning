const sendButton = document.getElementById("send");
const terminateButton = document.getElementById("terminate");
const messageInput = document.getElementById("message");
const resultText = document.getElementById("result");

const worker = new Worker("./worker.js", {type: "module"});

console.log('Worker in global context, ', worker);
console.log(self);

worker.onmessage = function(e) {
    resultText.innerText = e.data
}

worker.onerror = function (e) {
    resultText.innerText = "There was an error at: " + e.filename + ":" + e.lineno;
}

sendButton.addEventListener('click', function () {
    const message = messageInput.value;
    worker.postMessage(message);
});

terminateButton.addEventListener('click', function () {
    worker.terminate();
});