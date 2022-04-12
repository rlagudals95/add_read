"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.drawSwitch = void 0;
var utils_1 = require("../ts/utils");
var square_js_1 = require("./square.js");
var drawSwitch = /** @class */ (function () {
    function drawSwitch(drawSwitchOptions) {
        var _this = this;
        this.pos = {
            x: -1,
            y: -1
        };
        this.isDraw = false;
        this.getPosition = function (event) {
            _this.pos.x = event.pageX;
            _this.pos.y = event.pageY;
        };
        var initOptions = __assign(__assign({}, drawSwitch.defaultOptions), drawSwitchOptions);
        var template = document.createElement('template');
        template.innerHTML = initOptions.htmlString;
        this.element = template.content.firstElementChild;
        this.element.style.position = 'absolute';
        this.element.style.transform = 'translate(-50%, -50%)';
        this.element.style.left = "".concat(initOptions.x, "%");
        this.element.style.bottom = "".concat(initOptions.y, "px");
        this.element.style.zIndex = '100';
        this.element.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.drawOn();
        });
        utils_1.utils.attachTo(initOptions, this.element);
    }
    drawSwitch.prototype.drawOn = function () {
        var _this = this;
        var cnt = 0; // 생성한 요소 개수
        var drawSwitch = document.getElementById('drawSwitch');
        var container = document.getElementById('document');
        this.isDraw = !this.isDraw;
        if (this.isDraw) {
            drawSwitch.style.background = '#f7685b';
            drawSwitch.style.border = '1px solid #e54839';
            container.style.cursor = 'crosshair';
            container.addEventListener('mousemove', function (e) {
                _this.getPosition(e);
            });
            container.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (_this.isDraw) {
                    cnt++; // 생성한 요소 갯수 카운팅
                    var squareOptions = {
                        container: container,
                        htmlString: "<div style=\"width: 200px; height: 200px;\"><div>",
                        x: _this.pos.x, y: _this.pos.y, cnt: cnt
                    };
                    new square_js_1.SquareComponent(squareOptions);
                }
                else {
                    alert('상자추가하기 버튼을 클릭해주세요😀 ');
                }
            });
        }
        else {
            // 이벤트 제거
            drawSwitch.style.background = 'gray';
            drawSwitch.style.border = '1px solid black';
            container.style.cursor = 'not-allowed';
            utils_1.utils.removeEvent(container);
        }
    };
    Object.defineProperty(drawSwitch, "defaultOptions", {
        get: function () {
            return {
                container: document.createElement('div'),
                htmlString: '',
                x: 0,
                y: 0
            };
        },
        enumerable: false,
        configurable: true
    });
    return drawSwitch;
}());
exports.drawSwitch = drawSwitch;
