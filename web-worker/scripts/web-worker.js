import {bubbleSort} from './sort.js';

onmessage = (e) => {
    const data = e.data;
    const keyword = e.keyword;
    const filtered = data.filter((element) => element.name.first.includes(value) || element.name.last.includes(value))
    postMessage(filtered);
};