'use strict';

const CHART_BASE = 'https://chart.googleapis.com/chart';
// QR codes can have up to 4296 characters but Google's chart API is limited to
// URLs of 2048 bytes with GET requests.
const URL_LIMIT = 2048;
const SIZE = 350;

let qr = document.getElementById("qr");
let preview = document.getElementById("preview");

function setQR(text) {
    let url = `${CHART_BASE}?chs=${SIZE}x${SIZE}&cht=qr&chl=${encodeURIComponent(text)}`;
    console.log(url);
    console.log(url.lenth);
    if (url.length > URL_LIMIT) {
        alert('The current text is too large to be made into a QR code');
        window.close();
        return;
    }

    qr.src = url;
    preview.value = text;
}

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'window.getSelection().toString()'},
        (results) => {
            let text = results[0];
            // If no text selected, use tab URL instead
            if (text === '') {
                text = tabs[0].url;
            }

            setQR(text);
        }
    );
});

preview.addEventListener('focus', (evt) => {
    evt.target.select();
});
