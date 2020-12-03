importScripts('sort.js');
onmessage = (e) => {
    const data = quickSort(e.data, 0, e.data.length - 1);
    postMessage(data);
};