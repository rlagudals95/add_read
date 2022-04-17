"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAllEventListener = void 0;
var consoleUtil_1 = require("./consoleUtil");
var removeAllEventListener = function (element) {
    (0, consoleUtil_1.consoleUtil)('removeAllEventListener');
    var el = element, elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);
};
exports.removeAllEventListener = removeAllEventListener;
//# sourceMappingURL=removeAllEventListener.js.map