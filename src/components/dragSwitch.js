"use strict";
exports.__esModule = true;
exports.drawSwitch = void 0;
var utils_1 = require("../ts/utils");
var square_js_1 = require("./square.js");
var drawSwitch = /** @class */ (function () {
    function drawSwitch(container, htmlString, x, y) {
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
        console.log('add dragSwitch!!');
        var template = document.createElement('template');
        template.innerHTML = htmlString;
        this.element = template.content.firstElementChild;
        this.element.style.position = 'absolute';
        this.element.style.transform = 'translate(-50%, -50%)';
        this.element.style.left = "".concat(x, "%");
        this.element.style.bottom = "".concat(y, "px");
        this.element.style.zIndex = '100';
        this.element.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.drawOn();
        });
        utils_1.utils.attachTo(container, this.element, x, y);
    }
    drawSwitch.prototype.drawOn = function () {
        var _this = this;
        var cnt = 0; // 생성한 요소 개수
        var drawSwitch = document.getElementById('drawSwitch');
        var container = document.getElementById('document');
        this.isDraw = !this.isDraw;
        if (this.isDraw) {
            console.log('이벤트 등록!');
            drawSwitch.style.background = '#f7685b';
            drawSwitch.style.border = '1px solid #e54839';
            container.style.cursor = 'crosshair';
            container.addEventListener('mousemove', function (e) {
                _this.getPosition(e);
            });
            container.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('생성!');
                if (_this.isDraw) {
                    cnt++; // 생성한 요소 갯수 카운팅
                    new square_js_1.SquareComponent(container, "<div style=\"width: 200px; height: 200px;\"><div>", _this.pos.x, _this.pos.y, cnt);
                }
                else {
                    alert('상자추가하기 버튼을 클릭해주세요😀 ');
                }
            });
        }
        else {
            console.log('이벤트 제거!');
            drawSwitch.style.background = 'gray';
            drawSwitch.style.border = '1px solid black';
            container.style.cursor = 'not-allowed';
            utils_1.utils.removeEvent(container);
        }
    };
    return drawSwitch;
}());
exports.drawSwitch = drawSwitch;
