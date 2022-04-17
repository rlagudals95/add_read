"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isItIn = void 0;
var boxMargin = 50;
var isItIn = function (parent, child) {
    var box1coords = parent.getBoundingClientRect();
    var box2coords = child.getBoundingClientRect();
    if (box2coords.top + boxMargin < box1coords.top ||
        box2coords.right + boxMargin > box1coords.right ||
        box2coords.bottom + boxMargin > box1coords.bottom ||
        box2coords.left + boxMargin < box1coords.left) {
        return true;
    }
    return false;
};
exports.isItIn = isItIn;
//# sourceMappingURL=isItIn.js.map