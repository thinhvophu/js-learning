importScripts('sort.js');
onmessage = (e) => {
    // const data = bubbleSort(e.data);
    console.log('data', e.data);
    const data = quickSort(e.data, 0, e.data.length - 1);
    console.log('sorted data', data);
    postMessage(data);
    // while (data.length > 0) {
    //     let minIndex = findMin(data);
    //     postMessage({number: data[minIndex], last: data.length === 1});
    //     data.splice(minIndex, 1);
    // }
};