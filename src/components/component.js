"use strict";
exports.__esModule = true;
exports.BaseComponent = void 0;
var utils_1 = require("../ts/utils");
var BaseComponent = /** @class */ (function () {
    function BaseComponent(container, htmlString, x, y, cnt) {
        // container의 x, y 위치에 element를 그린다.
        var template = document.createElement('template');
        template.innerHTML = htmlString;
        // 요소를 삽일할 부모 태그
        this.parentId = container.getAttribute('id');
        this.element = template.content.firstElementChild;
        this.element.style.position = 'absolute';
        this.element.style.transform = 'translate(-50%, -50%)';
        this.element.style.left = "".concat(x, "px");
        this.element.style.top = "".concat(y, "px");
        this.element.className = 'p-' + this.parentId;
        this.element.style.backgroundColor = 'rgba(255,0,0,0.2)';
        this.element.style.opacity = '1';
        this.element.setAttribute('onMouseOver', 'this.style.backgroundColor = "rgba(255,0,0,0.7)"');
        this.element.setAttribute('onMouseOut', 'this.style.backgroundColor = "rgba(255,0,0,0.2)"');
        this.element.setAttribute('parent', container.getAttribute('id'));
        this.element.addEventListener('click', this.moveTop);
        // 드래그 on
        utils_1.utils.draggable(this.element, this.detectOverlap, container);
        //this.element.setAttribute('draggable', 'true')
        this.element.setAttribute('id', this.elementId);
        this.attachTo(container, this.element, x, y, cnt);
        this.elementId = (document.getElementsByClassName('p-document').length).toString() + '_element';
        this.element.setAttribute('id', this.elementId);
    }
    BaseComponent.prototype.attachTo = function (parent, element, x, y, cnt) {
        console.log('attatch!!!', x, y);
        parent.appendChild(element);
    };
    BaseComponent.prototype.moveTop = function (event) {
        console.log('moveTop!');
        event.stopPropagation();
        event.preventDefault();
        this.selectedElement = this;
        this.parentId = this.selectedElement.getAttribute("parent");
        var elements = document.getElementsByClassName('p-' + this.parentId);
        // 선택한 것을 제외한 다른 요소들 border: none;
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            element.style.border = 'none';
        }
        this.selectedElement.remove();
        this.selectedElement.style.border = '2px solid red';
        document.getElementById(this.parentId).append(this.selectedElement);
    };
    BaseComponent.prototype.movePosition = function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('dragend!');
        var x = e.pageX;
        var y = e.pageY;
        this.draggedElement = this;
        this.draggedElement.style.left = "".concat(x, "px");
        this.draggedElement.style.top = "".concat(y, "px");
        this.draggedElement.removeAttribute('selected');
    };
    // private draggable(element, detectOverlap, throttle, container) {
    //     element.onmousedown = function (event) {
    //         document.onmousemove = function (event) {
    //             console.log(document.getElementsByTagName('body')[0].style.width)
    //             element.style.left = event.clientX + 'px';
    //             element.style.top = event.clientY + 'px';
    //             window.scrollBy(event.clientX, event.clientY);
    //             element.setAttribute('selected', 'true');
    //             throttle(detectOverlap(element), 100);
    //         };
    //         document.onmouseup = function () {
    //             document.onmousemove = null;
    //             element.removeAttribute('selected')
    //             console.log('onmouseup')
    //             if (element.releaseCapture) { element.releaseCapture(); }
    //         };
    //         if (element.setCapture) { element.setCapture(); }
    //     }
    //     element.unselectable = "on";
    //     element.onselectstart = function () { return false };
    //     element.style.userSelect = element.style.MozUserSelect = "none";
    // };
    BaseComponent.prototype.detectOverlap = function (element) {
        var selectedElement = element.getBoundingClientRect();
        var Elements = document.getElementsByClassName('p-document');
        // 겹치는 element 검사
        for (var i = 0; i < Elements.length; i++) {
            var elementRect = Elements[i].getBoundingClientRect();
            var _element = Elements[i];
            if (!_element.getAttribute('selected') &&
                selectedElement.x < elementRect.x + elementRect.width &&
                selectedElement.x + selectedElement.width > elementRect.x &&
                selectedElement.y < elementRect.y + elementRect.height &&
                selectedElement.height + selectedElement.y > elementRect.y) {
                _element.style.border = '2px solid blue';
            }
            else {
                _element.style.border = 'none';
            }
        }
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
