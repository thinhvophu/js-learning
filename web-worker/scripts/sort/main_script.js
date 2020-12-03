let data = [];

// generate data
const dataSizeInput = document.getElementById('data-size');
const generateButton = document.getElementById('generate-button');
generateButton.addEventListener('click', function () {
    generateData(dataSizeInput.value)
});

// worker
let elapsedTimeInterval;
const workerTimeLabel = 'WorkerSortTime';

const worker = new Worker('/sort/sort-worker.js', { type: 'module' });
worker.onmessage = function (e) {
    displayData(e.data);
    toggleProgressBar(false);
    clearInterval(elapsedTimeInterval);
    console.timeEnd(workerTimeLabel);
};

// sort buttons
const sortButton = document.getElementById('sort-button');
const sortByWorkerButton = document.getElementById('sort-by-worker-button');

sortButton.addEventListener('click', sort, false);
sortByWorkerButton.addEventListener('click', function () {
    sortByWorker(false)
    // sortByWorker(true)
});

function sortByWorker(useTypedArray) {
    console.time(workerTimeLabel);

    const worker = new Worker('/sort/sort-worker.js', { type: 'module' });
    worker.onmessage = function (e) {
        displayData(e.data);
        toggleProgressBar(false);
        clearInterval(elapsedTimeInterval);
        console.timeEnd(workerTimeLabel);
    };

    toggleProgressBar(true);
    hideData();
    updateElapsedTime();
    elapsedTimeInterval = setInterval(function(){ updateElapsedTime(1) }, 1000);

    if (useTypedArray) {
        const message = { firedTime: Date.now(), demoCase: 'typedarray',  data: Uint32Array.from([...data])};
        console.log('before', message.data);
        worker.postMessage(message, [message.data.buffer]);
        console.log('after', message.data);
    } else {
        const message = { firedTime: Date.now(), demoCase: 'copied', data: [...data]};
        worker.postMessage(message);
    }

}

function sort() {
    const timerLabel = 'NormalSortTime';
    console.time(timerLabel);

    hideData();
    toggleProgressBar(true);
    updateElapsedTime();
    const interval = setInterval(function(){ updateElapsedTime(1) }, 1000);

    const result = bubbleSort([...data]);

    displayData(result);
    toggleProgressBar(false);
    clearInterval(interval);
    console.timeEnd(timerLabel);
}

// ui stuff and bubble sort method
function toggleProgressBar(show) {
    const progressBar = document.getElementById('loading-spinner');
    if (show) {
        progressBar.style.visibility = 'visible';
    }
    else {
        progressBar.style.visibility = 'hidden';
    }
}

function updateElapsedTime (step) {
    if (step) {
        const current = parseInt(document.getElementById('count').innerText);
        document.getElementById('count').innerText = current + step;
    } else {
        document.getElementById('count').innerText = 0;
    }
}

function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }

    return arr;
}

function swap(arr, firstIndex, secondIndex) {
    let temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
}

function generateData(dataSize) {
    hideData();
    for (let i = 0; i < dataSize; i++) {
        data[i] = Math.floor(Math.random() * dataSize);
    }

    displayData(data);
}

function displayData(data) {
    if (data) {
        document.getElementById('generated-data').innerText = data.join(", ");
    }
    else {
        document.getElementById('generated-data').innerText = "";
    }
}

function hideData() {
    displayData();
}