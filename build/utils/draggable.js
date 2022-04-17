"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.draggable = void 0;
var throttle_1 = require("./throttle");
var isItIn_1 = require("./isItIn");
var resizeScreen_1 = require("./resizeScreen");
var moveElement_1 = require("./moveElement");
var consoleUtil_1 = require("./consoleUtil");
var draggable = function (element, container, elements) {
    (0, consoleUtil_1.consoleUtil)('draggable');
    var _moveElement = function (event) {
        (0, throttle_1.throttle)((0, moveElement_1.moveElement)(event, element, container, isItIn_1.isItIn, resizeScreen_1.resizeScreen));
    };
    element.addEventListener('mousedown', function (event) {
        var body = document.body;
        body.addEventListener('mousemove', _moveElement);
        body.addEventListener('mouseup', function (event) {
            body.removeEventListener('mousemove', _moveElement);
            elements.map(function (ele) {
                ele.style.border = 'none';
            });
        });
    });
};
exports.draggable = draggable;
//# sourceMappingURL=draggable.js.map