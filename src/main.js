"use strict";
exports.__esModule = true;
var draw_js_1 = require("./ts/draw.js");
var pos = {
    x: -1,
    y: -1
};
var cnt = 0; // 생성한 요소 개수
function getPosition(event) {
    var x = event.pageX;
    var y = event.pageY;
    pos.x = x;
    pos.y = y;
}
window.onload = function () {
    draw_js_1.drawOptions.drawOn();
};
