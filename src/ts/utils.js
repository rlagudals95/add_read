"use strict";
exports.__esModule = true;
exports.utils = void 0;
exports.utils = {
    waiting: false,
    draggable: function (element, detectOverlap, container) {
        element.onmousedown = function (event) {
            var _this = this;
            document.onmousemove = function (event) {
                console.log(document.getElementsByTagName('body')[0].style.width);
                element.style.left = event.clientX + 'px';
                element.style.top = event.clientY + 'px';
                window.scrollBy(event.clientX, event.clientY);
                element.setAttribute('selected', 'true');
                _this.throttle(detectOverlap(element), 100);
            };
            document.onmouseup = function () {
                document.onmousemove = null;
                element.removeAttribute('selected');
                console.log('onmouseup');
                if (element.releaseCapture) {
                    element.releaseCapture();
                }
            };
            if (element.setCapture) {
                element.setCapture();
            }
        };
        element.unselectable = "on";
        element.onselectstart = function () { return false; };
        element.style.userSelect = element.style.MozUserSelect = "none";
    },
    throttle: function (callback, limit) {
        if (limit === void 0) { limit = 100; }
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
    }
};
