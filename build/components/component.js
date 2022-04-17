"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent = void 0;
var draggable_1 = require("../utils/draggable");
var attachTo_1 = require("../utils/attachTo");
var attachTo_2 = require("../utils/attachTo");
var detectIntersect_1 = require("../utils/detectIntersect");
var throttle_1 = require("../utils/throttle");
var dragaInit_1 = require("../utils/dragaInit");
var BaseComponent = /** @class */ (function () {
    function BaseComponent(drawOptions) {
        var _this = this;
        // container의 x, y 위치에 element를 그린다.
        var template = document.createElement('template');
        template.innerHTML = drawOptions.htmlString;
        //this.parent = drawOptions.container
        this.parent = document.body;
        this.parent = drawOptions.container;
        this.element = template.content.firstElementChild;
        this.element.style.position = 'absolute';
        this.element.style.transform = 'translate(-50%, -50%)';
        this.element.style.left = "".concat(drawOptions.x, "px");
        this.element.style.top = "".concat(drawOptions.y, "px");
        this.element.style.backgroundColor = 'rgba(255,0,0,0.2)';
        this.element.style.opacity = '1';
        (0, attachTo_2.attachTo)(drawOptions, this.element);
        attachTo_1.elements.push(this.element);
        this.mouseMove = function () { (0, throttle_1.throttle)((0, detectIntersect_1.detectIntersect)(_this.element, attachTo_1.elements, _this.parent)); };
        // 드래그 on
        (0, draggable_1.draggable)(this.element, this.parent, attachTo_1.elements);
        (0, dragaInit_1.dragInit)(this.element, this.mouseMove, this.parent, attachTo_1.elements);
    }
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=component.js.map