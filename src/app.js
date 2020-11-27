import { jsPDF } from 'jspdf';
const { JSDOM } = require("jsdom");

// function toPdf() {
//     const doc = new jsPDF();
//     const page = document.getElementById('wholePage');
//     doc.html(page, {
//         callback: function (doc) {
//           doc.save();
//         }, x: 10, y: 10});
// }


function toPdf() {
    var doc = new jsPDF();          
    var elementHandler = {
      '#pdf-button': function (element, renderer) {
        return true;
      }
    };
    var source = window.document.getElementsByTagName("body")[0];
    const htmldom = new JSDOM();

    global.window = htmldom.window;
    global.document = window.document;
    global.Node = window.Node;

    doc.html(
        source,
        {
            callback: function (doc) {
                doc.save()
        }},
        15,
        15,
        {
        'width': 180,'elementHandlers': elementHandler
        });

    doc.save("a4.pdf");
}


function app() {
    const button = document.getElementById('pdf-button');
    button.onclick = window.print();
}

app()