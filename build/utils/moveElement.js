"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveElement = void 0;
var consoleUtil_1 = require("./consoleUtil");
var detectOffset = 120;
var moveElement = function (event, element, container, isItIn, resizeScreen) {
    // 타겟 비교하기 보완하기....!!!!!
    (0, consoleUtil_1.consoleUtil)(event.target.tagName);
    (0, consoleUtil_1.consoleUtil)(event.offsetX);
    // event.offsetX > 120 
    // event.target.tagName == 'DIV'
    if (event.offsetX > detectOffset) {
        element.style.left = "".concat(event.offsetX, "px");
        element.style.top = "".concat(event.offsetY, "px");
    }
    if (isItIn(container, element)) {
        resizeScreen(event, container);
        scrollTo(event.pageX, event.pageY);
    }
};
exports.moveElement = moveElement;
//# sourceMappingURL=moveElement.js.map