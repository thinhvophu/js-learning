let numbers = [];

function render() {
    const data = [...numbers];
    console.log('data', data);
    renderTable(document.getElementById('normal-table'), data);
}

function renderTable(table, data) {
    console.time('Render table')
    table.innerHTML = "";

    const result = bubbleSort(data);
    // while (data.length > 0) {
    //     let minIndex = findMin(data);
    //     // insertRow(table, data[minIndex]);
    //     data.splice(minIndex, 1);
    // }
    console.timeEnd('Render table')
}

function insertRow(table, data) {
    let row = table.insertRow(0);
    let cell1 = row.insertCell(0);
    cell1.innerHTML = data
}

function loadData() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            numbers = JSON.parse(xhttp.responseText);
            console.log('done');
        }
    };

    const value = document.getElementById('total-rows').value;
    xhttp.open('GET', `/api/table-rows?totalRows=${value}`, true);
    xhttp.send();
}

const worker = new Worker('web-worker.js');

worker.onmessage = (e) => {
    // const workerTable = document.getElementById('worker-table');
    // insertRow(workerTable, e.data.number);
    console.timeEnd('render by worker');
}

function renderByWorker() {
    console.time('render by worker');
    // const workerTable = document.getElementById('worker-table');
    // workerTable.innerHTML = "";
    worker.postMessage(numbers);
}