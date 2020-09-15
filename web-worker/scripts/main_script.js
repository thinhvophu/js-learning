const { fromEvent } = rxjs;
const { map, filter, debounceTime } = rxjs.operators;

import * as Table from './table.js';

const dataTable = document.getElementById('data-table');
const totalNum = document.getElementById('total-num');

let data = [];
document.addEventListener('DOMContentLoaded', function (e) {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            data = JSON.parse(request.responseText);
            console.log('data', data);
            totalNum.innerText = data.length + ' rows';
            Table.renderTable(dataTable, data);
        }
    }

    request.open('GET', '/api/data', true);
    request.send();
});

let worker;

const useWorkerCheckBox = document.getElementById('use-worker');
const filterBox = document.getElementById('filter-box');
fromEvent(filterBox, 'keyup')
    .subscribe(() => {
        const useWorker = useWorkerCheckBox.nodeValue;
        const value = filterBox.value;
        if (useWorker) {
            console.log('Filter data using worker, keyword: ', value);
            if (worker) {
                worker.terminate();
            }

            worker = new Worker('./web-worker.js', { type: 'module' });
            worker.onmessage = function (e) {
                totalNum.innerText = filtered.length + ' rows';    
                Table.renderTable(dataTable, e.data);
            }

            worker.postMessage({ data: data, keyword: value });
        } else {
            console.log('Filter data, keyword: ', value);
            const filtered = data.filter((element) => element.name.first.includes(value) || element.name.last.includes(value));
            totalNum.innerText = filtered.length + 'rows';
            Table.renderTable(dataTable, filtered);
        }
    });
