"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectIntersect = void 0;
var detectIntersect = function (element, elements, container) {
    //consoleUtil('detectOverlap')
    var selectedElement = element.getBoundingClientRect();
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var _element = elements_1[_i];
        var elementRect = _element.getBoundingClientRect();
        if (selectedElement.x < elementRect.x + elementRect.width &&
            selectedElement.x + selectedElement.width > elementRect.x &&
            selectedElement.y < elementRect.y + elementRect.height &&
            selectedElement.height + selectedElement.y > elementRect.y) {
            //_element.style.border = '2px solid blue'
            return false;
        }
        else {
            //_element.style.border = 'none'
            return true;
        }
        //_element.style.border = 'none'
    }
    //element.style.border = '2px solid red'
};
exports.detectIntersect = detectIntersect;
//# sourceMappingURL=detectIntersect.js.map