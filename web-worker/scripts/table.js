const { BehaviorSubject } = rxjs;

export function clear(table) {
    table.innerHTML = "";
}

export function renderTable(table, data) {
    clear(table);
    rendering.next(true)
    for (let i = 0; i < data.length; i++) {
        // setTimeout(() => {
            insertRow(table, data[i]);
            if (i === data.length - 1) {
                rendering.next(false);
            }
        // }, 0)
    }
}

const rendering = new BehaviorSubject();
rendering.subscribe(value => toggleSpinner(value));

function insertRow(table, data) {
    let row = table.insertRow(0);
    let name = row.insertCell(0);
    name.innerHTML = data.name.first + ' ' + data.name.last;

    let age = row.insertCell(1);
    age.innerHTML = data.age;

    let address = row.insertCell(2);
    address.innerHTML = `${data.street}, ${data.city}, ${data.state}`;

    let dollar = row.insertCell(3);
    dollar.innerHTML = data.dollar;
}

function toggleSpinner(show) {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (show) {
        loadingSpinner.style.visibility = 'visible';
    }
    else {
        loadingSpinner.style.visibility = 'hidden';
    }
}
