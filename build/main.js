"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drawButton_1 = require("./components/drawButton");
require("./css/common.css");
window.onload = function () {
    console.log('env :', process.env.NODE_ENV);
    var drawButtonOptions = {
        container: document.getElementById('wrapper'),
        htmlString: "<button id=\"drawButton\">\uC0C1\uC790\uADF8\uB9AC\uAE30</button>",
        x: 50,
        y: 20
    };
    new drawButton_1.drawButton(drawButtonOptions);
};
//# sourceMappingURL=main.js.map