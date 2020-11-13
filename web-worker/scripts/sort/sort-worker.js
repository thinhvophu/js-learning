onmessage = (e) => {
    console.log('Exchange time: ', Date.now() - e.data.firedTime);

    let result;
    const demoCase = e.data.demoCase;
    const data = e.data.data;
    switch (demoCase) {
        case "copied":
            result = bubbleSort(data);
            break;
        case "typedarray":
            result = bubbleSort(Array.from(data));
            break;
        case "stringify":
            result = bubbleSort(JSON.parse(data));
            break;
        case "errorhandling":
            result = result.data; // error
            break;
    }

    postMessage(result);
};

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