"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachTo = exports.elements = void 0;
var consoleUtil_1 = require("./consoleUtil");
exports.elements = [];
var attachTo = function (drawOptions, element) {
    (0, consoleUtil_1.consoleUtil)('attachTo');
    exports.elements.push(element);
    document.body.append(element);
};
exports.attachTo = attachTo;
//# sourceMappingURL=attachTo.js.map