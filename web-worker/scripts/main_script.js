let numbers = [];

function render() {
    const data = [...numbers];
    const table = document.getElementById('normal-table');
    for (let i = 0; i < data.length; i++) {
        insertRow(table, data[i]);
    }
}

function renderWithSetTimeout() {
    const data = [...numbers];
    const table = document.getElementById('worker-table');
    for (let i = 0; i < data.length; i++) {
        setTimeout(()=>insertRow(table, data[i]), 0);
    }
}

function insertRow(table, data) {
    let row = table.insertRow(0);
    let cell1 = row.insertCell(0);
    cell1.innerHTML = data
}

function loadData() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            numbers = JSON.parse(xhttp.responseText);
            console.log('done');
        }
    };

    const value = document.getElementById('total-rows').value;
    xhttp.open('GET', `/api/table-rows?totalRows=${value}`, true);
    xhttp.send();
}

