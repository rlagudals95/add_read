"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveTop = void 0;
var consoleUtil_1 = require("./consoleUtil");
var moveTop = function (element, parent, elements) {
    (0, consoleUtil_1.consoleUtil)('moveTop!');
    event.stopPropagation();
    event.preventDefault();
    // 선택한 것을 제외한 다른 요소들 border: none;
    if (elements.length) {
        elements.map(function (element) {
            element.style.border = 'none';
        });
    }
    element.remove();
    element.style.border = '2px solid red';
    parent.append(element);
};
exports.moveTop = moveTop;
//# sourceMappingURL=moveTop.js.map