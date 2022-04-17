"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleUtil = void 0;
var consoleUtil = function (desc) {
    var env = process.env.NODE_ENV;
    if (env == 'development') {
        console.log(desc);
    }
};
exports.consoleUtil = consoleUtil;
//# sourceMappingURL=consoleUtil.js.map