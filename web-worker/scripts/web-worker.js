import {bubbleSort} from "./sort.js";

onmessage = (e) => {
    console.log('End posting: ', Date.now() - e.data.fireTime);
    const data = JSON.parse(e.data.data);
    const result = bubbleSort(data);
    const blob = new Blob([JSON.stringify(result)], { type: "text/plain;charset=utf-8" });
    // const blob = new Blob([mydata.buffer], {type: "octet/stream"});
    const url = URL.createObjectURL(blob);
    // self.postMessage({name:"download-link", link:url});
    postMessage({link: url});
};