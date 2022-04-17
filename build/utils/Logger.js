"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
exports.Logger = {
    info: function (msg) {
        if (process.env.NODE_ENV === 'development') {
            console.info(msg);
        }
    },
    log: function (msg) {
        if (process.env.NODE_ENV === 'development') {
            console.log(msg);
        }
    },
};
//# sourceMappingURL=Logger.js.map