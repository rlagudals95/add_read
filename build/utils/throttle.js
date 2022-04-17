"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
var DELAYTIME = 300;
var throttle = function (callback, limit) {
    if (limit === void 0) { limit = DELAYTIME; }
    return function () {
        var _this = this;
        if (!this.waiting) {
            callback.apply(this, arguments);
            this.waiting = true;
            setTimeout(function () {
                _this.waiting = false;
            }, limit);
        }
    };
};
exports.throttle = throttle;
//# sourceMappingURL=throttle.js.map