"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dragInit = void 0;
var moveTop_1 = require("./moveTop");
var dragInit = function (element, mouseMove, parent, elements) {
    element.addEventListener('click', function (e) {
        (0, moveTop_1.moveTop)(element, parent, elements);
    });
    element.addEventListener('mouseover', function () {
        element.style.backgroundColor = "rgba(255,0,0,0.7)";
    });
    element.addEventListener('mouseout', function () {
        element.style.backgroundColor = "rgba(255,0,0,0.2)";
    });
    element.addEventListener('mousedown', function (e) {
        // detectOverlap
        element.addEventListener('mousemove', mouseMove);
    });
    element.addEventListener('mouseup', function (e) {
        element.removeEventListener('mousemove', mouseMove);
        elements.map(function (ele) {
            ele.style.border = 'none;';
        });
    });
};
exports.dragInit = dragInit;
//# sourceMappingURL=dragaInit.js.map