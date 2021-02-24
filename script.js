const msgEl = document.getElementById("msg");



const randomNum = getRandomNum();

function getRandomNum() {
    return Math.floor(Math.random() * 100) + 1
}

console.log(`Number: ${randomNum}`)

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

recognition.addEventListener('result', onSpeak);

function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    console.log(msg)

    writeMessage(msg);
    checkNumber(msg);

}

function writeMessage(value) {
    console.log(value)
        msgEl.innerHTML =
            ` <div>You said</div> 
    <span class='box'>${value}</span>`;

}

function checkNumber(msg) {
    const num = +msg;

    if (Number.isNaN(num)) {
        msgEl.innerHTML = `<div>That is not a valid number</div>`
        return;
    }

    if (num < 1 || num > 100) {
        msgEl.innerHTML = `<div>Number must be in range.</div>`
        return;
    }

    if (num === randomNum) {
        document.body.innerHTML = `
        <h2> Congrats! you have guessed the number! 
        <br>
        It was ${num}. </h2>
        <button class="playAgain" id="playAgain"> Play Again </button>
        `
    } else if (num > randomNum) {
        msgEl.innerHTML = `<div> Go Lower. </div>`
    } else {
        msgEl.innerHTML = `<div> Go Higher. </div>`
    }
}

recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
    if (e.target.id = 'playAgain') {
        window.location.reload();
    }
})