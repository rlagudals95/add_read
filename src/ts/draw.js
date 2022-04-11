"use strict";
exports.__esModule = true;
exports.drawOptions = void 0;
var square_js_1 = require("../components/square.js");
exports.drawOptions = {
    pos: {
        x: -1,
        y: -1
    },
    isDraw: false,
    getPosition: function (event, pos) {
        pos.x = event.pageX;
        pos.y = event.pageY;
    },
    drawOn: function () {
        var _this = this;
        var cnt = 0; // 생성한 요소 개수
        var drawSwitch = document.getElementById('drawSwitch');
        var container = document.getElementById('document');
        var isDraw = this.isDraw;
        drawSwitch.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var switchBtn = this;
            isDraw = !isDraw;
            if (isDraw) {
                switchBtn.style.background = '#f7685b';
                switchBtn.style.border = '1px solid #e54839';
                container.style.cursor = 'crosshair';
            }
            else {
                switchBtn.style.background = 'gray';
                switchBtn.style.border = '1px solid black';
                container.style.cursor = 'not-allowed';
            }
        });
        var _getPosition = this.getPosition;
        var _pos = this.pos;
        document.addEventListener('mousemove', function (e) {
            _getPosition(e, _pos);
        });
        document.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('생성!');
            if (isDraw) {
                cnt++; // 생성한 요소 갯수 카운팅
                new square_js_1.SquareComponent(container, "<div style=\"width: 200px; height: 200px;\"><div>", _this.pos.x, _this.pos.y, cnt);
            }
            else {
                alert('상자추가하기 버튼을 클릭해주세요😀 ');
            }
        });
    }
};
