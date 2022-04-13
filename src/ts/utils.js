"use strict";
exports.__esModule = true;
exports.utils = void 0;
exports.utils = {
    waiting: false,
    pos: {
        x: -1,
        y: -1
    },
    element: null,
    isSeleted: false,
    elements: [],
    innerWidth: 0,
    innerHeight: 0,
    flag: false,
    draggable: function (element, container) {
        var _this = this;
        this.element = element;
        //console.log('엘리먼트 ::', element)
        //addEventListner로 변경
        element.addEventListener('mousedown', function (event) {
            // document 전역 객체에다가 직접 이벤트 핸들러를 등록하고, 해제 보류....
            console.log('현재창 크기 :!', window.innerWidth, window.innerHeight);
            container.onmousemove = function (event) {
                _this.throttle(_this.outRangeScreen(event, element, container, _this.isItIn, _this.innerWidth, _this.innerHeight), 100);
            };
            // down 다음에 이벤트 리스너 등록
            //container.addEventListener('mousemove', this.addMouseMove(event, element, container))
            container.addEventListener('mouseup', function (event) {
                container.onmousemove = null;
                // container.removeEventListener('mouseup',
                //     this.addMouseMove(event, element, container)
                // )
                console.log('onmouseup');
                if (element.releaseCapture) {
                    element.releaseCapture();
                }
            });
            if (element.setCapture) {
                element.setCapture();
            }
        });
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
    },
    attachTo: function (drawOptions, element) {
        console.log('attach!!!!');
        console.log(drawOptions);
        var container = drawOptions.container;
        this.elements.push(element);
        container.append(element);
    },
    // moveTop 함수도 넘겨주기!
    // event와 element 그리고 부모 요소정보 필요!
    dragInit: function (element, isSelected, elements, mouseMove, parent) {
        var _this = this;
        element.addEventListener('click', function (e) {
            _this.moveTop(e, element, parent);
        });
        element.addEventListener('mouseover', function () {
            element.style.backgroundColor = "rgba(255,0,0,0.7)";
        });
        element.addEventListener('mouseout', function () {
            element.style.backgroundColor = "rgba(255,0,0,0.2)";
        });
        element.addEventListener('mousedown', function () {
            element.addEventListener('mousemove', mouseMove);
        });
        element.addEventListener('mouseup', function () {
            element.removeEventListener('mousemove', mouseMove);
            // 마우스 땔 시 border : none으로 
            console.log(_this);
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.border = 'none;';
            }
        });
    },
    removeEvent: function (element) {
        console.log('removeEvent');
        var el = element, elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);
    },
    addMouseMove: function (event, element, container) {
        console.log('애드마우스 ');
        element.style.left = event.clientX + 'px';
        element.style.top = event.clientY + 'px';
        // offset값으로 좌표계산하기
        var xp = Math.abs(container.getBoundingClientRect().x); // 호출마다 계산 > 최소호출 희망 > const { x, y } = contianer.getBoundingClientRect();
        var yp = Math.abs(container.getBoundingClientRect().y);
        // window.scrollBy(event.clientX, event.clientY);
        var height = container.scrollHeight;
        var width = container.scrollWidth;
        var x = event.clientX;
        var y = event.clientY;
        var xPercentage = x / screen.width;
        var yPercentage = y / screen.height;
        window.scrollTo(xPercentage * width, yPercentage * height);
        if (xp > 2 || yp > 2) {
            var innerWidth_1 = window.innerWidth;
            innerWidth_1 += Math.abs(container.getBoundingClientRect().x);
            var innerHeight_1 = window.innerHeight;
            innerHeight_1 += Math.abs(container.getBoundingClientRect().y);
            container.style.width = "".concat(innerWidth_1, "px");
            container.style.height = "".concat(innerHeight_1, "px");
        }
    },
    moveTop: function (event, element, parent) {
        console.log('moveTop!');
        event.stopPropagation();
        event.preventDefault();
        var elements = exports.utils.elements;
        // 선택한 것을 제외한 다른 요소들 border: none;
        if (elements.length) {
            elements.map(function (element) {
                element.style.border = 'none';
            });
        }
        element.remove();
        element.style.border = '2px solid red';
        parent.append(element);
    },
    outRangeScreen: function (event, element, container, isItIn, screenWidth, screenHeight) {
        //console.log('isInViewport :: ', isInViewport)
        console.log(screenWidth, '////', screenWidth);
        var screenX;
        var screenY;
        screenX = window.innerWidth;
        screenY = window.innerHeight;
        element.style.left = event.clientX + 'px';
        element.style.top = event.clientY + 'px';
        var scrollX = document.documentElement.scrollWidth;
        var scrollY = document.documentElement.scrollHeight;
        //console.log('스크롤 넓이 xy', scrollX, scrollY) // inner보다 커지면 이게 커지면 // 스크롤 넓이가 2가 더 크다
        var gapX;
        var gapY;
        // 계속 선언되서 넓이가 초기화 되는듯...!
        var innerWidth = window.innerWidth;
        var innerHeight = window.innerHeight;
        console.log('container ::', container);
        // container에 직접 height와 width를 계속 더하는 로직은 버그가 너무 많이 일어남...!
        // container 넓이 늘어나는 로직개선
        // if (isItIn(container, element)) {
        //     console.log('안에없음')
        //     gapX = scrollX - innerWidth + 2
        //     innerWidth += Math.abs(gapX)
        //     container.style.width = `${innerWidth}px`;
        //     gapY = scrollY - innerHeight + 2
        //     innerHeight += Math.abs(gapY)
        //     container.style.height = `${innerHeight}px`;
        //     console.log('innerHeight ::', innerHeight)
        // } else {
        //     console.log('안에있음')
        // }
        if (isItIn(container, element)) {
            console.log('innerWidth :', scrollX);
            console.log('innerWidth :', scrollY);
            container.style.width = "".concat(scrollX, "px");
            container.style.height = "".concat(scrollY, "px");
            // attachTo 조건 주자 화면 밖으로 마우스가 나가면 저절로 생김.....!
            console.log('안에없음');
        }
        else {
            console.log('안에있음');
        }
        //container.style.width = '100%';
        //container.style.height = '100%';
        scrollTo(element.offsetTop - 200, element.offsetLeft - 200);
    },
    // element가 view안에 있는지 감지하는 함수
    isInViewport: function (element) {
        var rect = element.getBoundingClientRect();
        console.log('rect :::: ', rect.bottom, window.innerHeight);
        return (
        // rect.top >= 0 &&
        // rect.left >= 0 &&
        (rect.bottom + 20) <= (window.innerHeight || document.documentElement.clientHeight) &&
            (rect.right + 20) <= (window.innerWidth || document.documentElement.clientWidth));
    },
    isItIn: function (parent, child) {
        var box1coords = parent.getBoundingClientRect();
        var box2coords = child.getBoundingClientRect();
        if (box2coords.top + 50 < box1coords.top ||
            box2coords.right + 50 > box1coords.right ||
            box2coords.bottom + 50 > box1coords.bottom ||
            box2coords.left + 50 < box1coords.left) {
            return true;
        }
        return false;
    }
};
