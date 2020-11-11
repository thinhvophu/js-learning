import {bubbleSort} from "./sort.js";

const { fromEvent } = rxjs;
const { map, filter, debounceTime } = rxjs.operators;

let data = [];
const dataSize = 10000;
document.addEventListener('DOMContentLoaded', function (e) {
    for (let i = 0; i < dataSize; i++) {
        data[i] = Math.floor(Math.random() * dataSize);
    }

    console.log('Generated:' + data.length + ' numbers');
});

function toggleSpinner(id, show) {
    const loadingSpinner = document.getElementById(id);
    if (show) {
        loadingSpinner.style.visibility = 'visible';
    }
    else {
        loadingSpinner.style.visibility = 'hidden';
    }
}

const useWorkerCheckBox = document.getElementById('use-worker-1');
const sortButton = document.getElementById('sort-button-1');
const sortButton2 = document.getElementById('sort-button-2');
fromEvent(sortButton, 'click')
    .subscribe(() => {
        console.time('totalTime');
        toggleSpinner('loading-spinner-1', true);
        const useWorker = useWorkerCheckBox.checked;
        if (true) {
            const worker = new Worker('./web-worker.js', { type: 'module' });
            worker.onmessage = function (e) {
                toggleSpinner('loading-spinner-1', false);
                console.timeEnd('totalTime');
                const link = document.createElement("a");
                link.download = "data.txt";
                link.href = e.data.link;
                link.appendChild(new Text("Download data"));
                link.addEventListener("click", function () {
                    this.parentNode.removeChild(this);
                    // remember to free the object url, but wait until the download is handled
                    setTimeout(() => {
                        URL.revokeObjectURL(e.data.link);
                    }, 500)
                });
                document.body.appendChild(link);
                link.click();
                worker.terminate();
            };

            // console.log('posting: ' + Date.now());
            // worker.postMessage({ fireTime:Date.now(), data: Uint32Array.from(data)});
            worker.postMessage({ fireTime:Date.now(), data:JSON.stringify(data)});
            // worker.postMessage({ fireTime:Date.now(), data: [...data]});
        } else {
            //do the same here
            const result = bubbleSort([...data]);
            toggleSpinner(false);
            console.timeEnd('totalTime');
            console.log('result', result);
        }
    });

fromEvent(sortButton2, 'click')
    .subscribe(() => {
        console.time('totalTime');
        toggleSpinner('loading-spinner-2', true);

        const worker = new Worker('./web-worker.js', {type: 'module'});
        worker.onmessage = function (e) {
            toggleSpinner('loading-spinner-2', false);
            console.timeEnd('totalTime');
            console.log('result', e.data);
            worker.terminate();
        };

        // console.log('posting: ' + Date.now());
        // worker.postMessage({ fireTime:Date.now(), data: Uint32Array.from(data)});
        worker.postMessage({fireTime: Date.now(), data: JSON.stringify(data)});
        // worker.postMessage({ fireTime:Date.now(), data: [...data]});

    });