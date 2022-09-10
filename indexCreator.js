export default class indexCreator {
    messages = new Set(["Hello"]);

    constructor(messagess) {
        this.messages = new Set([...this.messages,...messagess]);
    }

    Hello() {
        this.messages.forEach(function (value) {
            console.info("%c" + value + "", 'background: #222; color: #bada55');
        });
    }
}

// load index page


let messages = new Set();
messages.add("Welcome OOP JS examples");

let index = new indexCreator(messages);
index.Hello();