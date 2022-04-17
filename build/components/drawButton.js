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
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawButton = void 0;
var square_1 = require("./square");
var consoleUtil_1 = require("../utils/consoleUtil");
var attachTo_1 = require("../utils/attachTo");
var removeAllEventListener_1 = require("../utils/removeAllEventListener");
var getPosition_1 = require("../utils/getPosition");
var drawButton = /** @class */ (function () {
    function drawButton(drawButtonOptions) {
        var _this = this;
        this.pos = {
            x: -1,
            y: -1
        };
        this.isDraw = false;
        var initOptions = __assign(__assign({}, drawButton.defaultOptions), drawButtonOptions);
        var template = document.createElement('template');
        template.innerHTML = initOptions.htmlString;
        this.element = template.content.firstElementChild;
        this.element.style.position = 'fixed';
        this.element.style.transform = 'translate(-50%, -50%)';
        this.element.style.left = "".concat(initOptions.x, "%");
        this.element.style.bottom = "".concat(initOptions.y, "px");
        this.element.style.zIndex = '100';
        this.element.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.drawOn(_this.element, drawButtonOptions.container);
        });
        (0, attachTo_1.attachTo)(initOptions, this.element);
    }
    drawButton.prototype.drawOn = function (element, container) {
        var _this = this;
        (0, consoleUtil_1.consoleUtil)('drawOn!');
        var cnt = 0; // 생성한 요소 개수
        var drawButton = element;
        this.isDraw = !this.isDraw;
        if (this.isDraw) {
            drawButton.style.background = '#f7685b';
            drawButton.style.border = '1px solid #e54839';
            container.style.cursor = 'crosshair';
            container.addEventListener('mousemove', function (e) {
                (0, getPosition_1.getPosition)(e, _this.pos);
                //this.getPosition(e)
            });
            container.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (_this.isDraw) {
                    cnt++; // 생성한 요소 갯수 카운팅
                    var squareOptions = {
                        container: container,
                        htmlString: "<span style=\"width: 200px; height: 200px;\"><span>",
                        x: _this.pos.x, y: _this.pos.y, cnt: cnt
                    };
                    (0, consoleUtil_1.consoleUtil)(squareOptions);
                    new square_1.SquareComponent(squareOptions);
                }
                else {
                    alert('상자추가하기 버튼을 클릭해주세요😀 ');
                }
            });
        }
        else {
            // 이벤트 제거
            (0, consoleUtil_1.consoleUtil)('removeEvent');
            drawButton.style.background = 'gray';
            drawButton.style.border = '1px solid black';
            container.style.cursor = 'not-allowed';
            (0, removeAllEventListener_1.removeAllEventListener)(container);
        }
    };
    Object.defineProperty(drawButton, "defaultOptions", {
        get: function () {
            return {
                container: document.createElement('div'),
                htmlString: '',
                x: 0,
                y: 0,
            };
        },
        enumerable: false,
        configurable: true
    });
    return drawButton;
}());
exports.drawButton = drawButton;
//# sourceMappingURL=drawButton.js.map