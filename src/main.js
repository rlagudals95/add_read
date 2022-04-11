"use strict";
exports.__esModule = true;
var dragSwitch_js_1 = require("./components/dragSwitch.js");
require("./css/common.css");
window.onload = function () {
    var drawSwitchOptions = {
        container: document.getElementById('wrapper'),
        htmlString: "<button id=\"drawSwitch\">\uC0C1\uC790\uADF8\uB9AC\uAE30</button>",
        x: 50,
        y: 20
    };
    new dragSwitch_js_1.drawSwitch(drawSwitchOptions);
};
