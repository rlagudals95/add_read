"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeScreen = void 0;
var consoleUtil_1 = require("./consoleUtil");
var resizeScreen = function (event, container) {
    (0, consoleUtil_1.consoleUtil)('resize');
    var scrollX = document.documentElement.scrollWidth;
    var scrollY = document.documentElement.scrollHeight;
    container.style.width = "".concat(scrollX, "px");
    container.style.height = "".concat(scrollY, "px");
};
exports.resizeScreen = resizeScreen;
//# sourceMappingURL=resizeScreen.js.map