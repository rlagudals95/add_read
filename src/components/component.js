"use strict";
exports.__esModule = true;
exports.BaseComponent = void 0;
var utils_1 = require("../ts/utils");
var BaseComponent = /** @class */ (function () {
    function BaseComponent(drawOptions) {
        var _this = this;
        this.DELAYTIME = 300;
        // container의 x, y 위치에 element를 그린다.
        var template = document.createElement('template');
        template.innerHTML = drawOptions.htmlString;
        this.parent = drawOptions.container;
        console.log('먼저등록 :', this.elements);
        this.element = template.content.firstElementChild;
        this.element.style.position = 'absolute';
        this.element.style.transform = 'translate(-50%, -50%)';
        this.element.style.left = "".concat(drawOptions.x, "px");
        this.element.style.top = "".concat(drawOptions.y, "px");
        // class name 지정형식 지양
        // 컴포넌트 위주 개발자라면 더더욱 지양
        this.element.style.backgroundColor = 'rgba(255,0,0,0.2)';
        this.element.style.opacity = '1';
        utils_1.utils.attachTo(drawOptions, this.element);
        this.mouseMove = function () { utils_1.utils.throttle(_this.detectOverlap(_this.element, _this.parent), _this.DELAYTIME); };
        // 드래그 on
        utils_1.utils.draggable(this.element, this.parent);
        utils_1.utils.dragInit(this.element, this.isSelected, this.elements, this.mouseMove, this.parent);
    }
    BaseComponent.prototype.detectOverlap = function (element, container) {
        // const { x, y } = contianer.getBoundingClientRect()
        // 위의 문법으로 수정
        var selectedElement = this.element.getBoundingClientRect();
        var childArr = utils_1.utils.elements;
        for (var i = 0; i < childArr.length; i++) {
            var elementRect = childArr[i].getBoundingClientRect();
            var _element = childArr[i];
            if (selectedElement.x < elementRect.x + elementRect.width &&
                selectedElement.x + selectedElement.width > elementRect.x &&
                selectedElement.y < elementRect.y + elementRect.height &&
                selectedElement.height + selectedElement.y > elementRect.y) {
                _element.style.border = '2px solid blue';
            }
            else {
                _element.style.border = 'none';
            }
            //_element.style.border = 'none'
        }
        this.element.style.border = '2px solid red';
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
