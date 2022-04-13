export const utils = {
    waiting: false as boolean,
    pos: {
        x: -1,
        y: -1,
        top: 0,
        left: 0
    },
    element: null,
    isSeleted: false,
    elements: [],
    innerWidth: 0 as number,
    innerHeight: 0 as number,
    flag: false as boolean,

    draggable(element,
        container) {
        this.element = element

        //console.log('엘리먼트 ::', element)
        //addEventListner로 변경
        element.addEventListener('mousedown', (event) => {
            // document 전역 객체에다가 직접 이벤트 핸들러를 등록하고, 해제 보류....
            console.log('현재창 크기 :!', window.innerWidth, window.innerHeight)

            container.onmousemove = (event) => {
                this.throttle(this.outRangeScreen(event, element, container, this.isItIn, this.innerWidth, this.innerHeight))
            };

            // down 다음에 이벤트 리스너 등록
            //container.addEventListener('mousemove', this.addMouseMove(event, element, container))

            container.addEventListener('mouseup', (event) => {
                container.onmousemove = null;
                // container.removeEventListener('mouseup',
                //     this.addMouseMove(event, element, container)
                // )
                console.log('onmouseup')

                if (element.releaseCapture) { element.releaseCapture(); }
            })

            if (element.setCapture) { element.setCapture(); }
        })

        element.unselectable = "on";
        element.onselectstart = function () { return false };
        element.style.userSelect = element.style.MozUserSelect = "none";
    },

    throttle: (callback, limit = 300) => {
        return function () {
            if (!this.waiting) {
                callback.apply(this, arguments)
                this.waiting = true
                setTimeout(() => {
                    this.waiting = false
                }, limit)
            }
        }
    },


    attachTo(drawOptions, element) {
        console.log('attach!!!!')
        console.log(drawOptions)
        const container: HTMLElement = drawOptions.container
        this.elements.push(element)
        container.append(element);
    },

    // moveTop 함수도 넘겨주기!
    // event와 element 그리고 부모 요소정보 필요!
    dragInit(element, isSelected, elements, mouseMove, parent, mouseDownHandler) {
        console.log('mouseDownHandler:', mouseDownHandler)
        //mouseDownHandler(element)
        element.addEventListener('click', (e) => {
            this.moveTop(e, element, parent);
        });

        element.addEventListener('mouseover', () => {
            element.style.backgroundColor = "rgba(255,0,0,0.7)";
        });

        element.addEventListener('mouseout', () => {
            element.style.backgroundColor = "rgba(255,0,0,0.2)";
        });

        element.addEventListener('mousedown', (e) => {
            element.addEventListener('mousemove', mouseMove)
            // 내일수정
            // element.addEventListener('mousemove', (e) => { mouseDownHandler(e, this.pos, element) }
            // )
        })

        element.addEventListener('mouseup', () => {

            element.removeEventListener('mousemove', mouseMove)
            // 마우스 땔 시 border : none으로 

            console.log(this)
            for (let i = 0; i < elements.length; i++) {

                elements[i].style.border = 'none;'
            }
        })

    },

    removeEvent(element) {
        console.log('removeEvent')
        const el = element,
            elClone = el.cloneNode(true);

        el.parentNode.replaceChild(elClone, el);
    },

    addMouseMove(event, element, container) {

        console.log('애드마우스 ')
        element.style.left = event.clientX + 'px';
        element.style.top = event.clientY + 'px';

        // offset값으로 좌표계산하기
        const xp = Math.abs(container.getBoundingClientRect().x); // 호출마다 계산 > 최소호출 희망 > const { x, y } = contianer.getBoundingClientRect();
        const yp = Math.abs(container.getBoundingClientRect().y);
        // window.scrollBy(event.clientX, event.clientY);
        const height = container.scrollHeight;
        const width = container.scrollWidth;

        const x = event.clientX;
        const y = event.clientY;

        const xPercentage = x / screen.width;
        const yPercentage = y / screen.height;

        window.scrollTo(xPercentage * width, yPercentage * height)

        if (xp > 2 || yp > 2) {
            let innerWidth = window.innerWidth;
            innerWidth += Math.abs(container.getBoundingClientRect().x)

            let innerHeight = window.innerHeight;
            innerHeight += Math.abs(container.getBoundingClientRect().y)

            container.style.width = `${innerWidth}px`;
            container.style.height = `${innerHeight}px`;
        }
    },

    moveTop: (event, element, parent) => { // z-index to
        console.log('moveTop!');
        event.stopPropagation();
        event.preventDefault();
        const elements = utils.elements

        // 선택한 것을 제외한 다른 요소들 border: none;
        if (elements.length) {
            elements.map((element: HTMLElement) => {
                element.style.border = 'none';
            })
        }

        element.remove();
        element.style.border = '2px solid red';
        parent.append(element);
    },

    outRangeScreen: (event, element, container, isItIn,
        screenWidth, screenHeight) => {
        //console.log('isInViewport :: ', isInViewport)


        console.log(screenWidth, '////', screenWidth)
        let screenX
        let screenY


        screenX = window.innerWidth;
        screenY = window.innerHeight;

        element.style.left = event.clientX + 'px';
        element.style.top = event.clientY + 'px';

        const scrollX = document.documentElement.scrollWidth;
        const scrollY = document.documentElement.scrollHeight;
        //console.log('스크롤 넓이 xy', scrollX, scrollY) // inner보다 커지면 이게 커지면 // 스크롤 넓이가 2가 더 크다

        let gapX;
        let gapY;

        // 계속 선언되서 넓이가 초기화 되는듯...!
        let innerWidth = window.innerWidth;
        let innerHeight = window.innerHeight;
        console.log('container ::', container)

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
            console.log('innerWidth :', scrollX)
            console.log('innerWidth :', scrollY)
            container.style.width = `${scrollX}px`
            container.style.height = `${scrollY}px`
            scrollTo(element.offsetTop, element.offsetLeft)
            // attachTo 조건 주자 화면 밖으로 마우스가 나가면 저절로 생김.....!
            console.log('안에없음')
        } else {
            console.log('안에있음')
        }

        //container.style.width = '100%';
        //container.style.height = '100%';



    },

    // element가 view안에 있는지 감지하는 함수
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        console.log('rect :::: ', rect.bottom, window.innerHeight)
        return (
            // rect.top >= 0 &&
            // rect.left >= 0 &&
            (rect.bottom + 20) <= (window.innerHeight || document.documentElement.clientHeight) &&
            (rect.right + 20) <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    isItIn: (parent, child) => {
        const box1coords = parent.getBoundingClientRect();
        const box2coords = child.getBoundingClientRect();

        if (
            box2coords.top + 50 < box1coords.top ||
            box2coords.right + 50 > box1coords.right ||
            box2coords.bottom + 50 > box1coords.bottom ||
            box2coords.left + 50 < box1coords.left) {

            return true;
        }

        return false;

    },
    mouseDownHandler(e, pos, element) {
        console.log('mouseDownHandler start!')
        pos = {
            // The current scroll
            left: element.scrollLeft,
            top: element.scrollTop,
            x: e.clientX,
            y: e.clientY,
        };

        // document.addEventListener('mousemove', (e) => {
        //     this.mouseMoveHandler(e, pos, element)
        // });
        // document.addEventListener('mouseup', (e) => {
        //     this.mouseUpHandler(e, pos, element)
        // });
    },

    mouseMoveHandler(e, pos, element) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        element.scrollTop = pos.top - dy;
        element.scrollLeft = pos.left - dx;
    },

    mouseUpHandler(element, mouseMoveHandler, mouseUpHandler) {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);

        element.style.cursor = 'grab';
        element.style.removeProperty('user-select');
    }


}