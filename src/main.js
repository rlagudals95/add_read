"use strict";
exports.__esModule = true;
var dragSwitch_js_1 = require("./components/dragSwitch.js");
window.onload = function () {
    new dragSwitch_js_1.drawSwitch(document.getElementById('wrapper'), "<button id=\"drawSwitch\">\uC0C1\uC790\uADF8\uB9AC\uAE30</button>", 50, 20);
    //drawOptions.drawOn();
};
