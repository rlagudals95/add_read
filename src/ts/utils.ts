export const utils = {
    waiting: false as boolean,
    pos: {
        x: -1,
        y: -1
    },
    element: null,
    isSeleted: false,
    elements: [],

    draggable(element,
        container) {
        this.element = element

        //console.log('엘리먼트 ::', element)
        //addEventListner로 변경
        element.addEventListener('mousedown', (event) => {
            // document 전역 객체에다가 직접 이벤트 핸들러를 등록하고, 해제 보류....
            console.log('다운!')

            container.onmousemove = (event) => {
                element.style.left = event.clientX + 'px';
                element.style.top = event.clientY + 'px';

                //console.log('오프셋!', element.offsetTop, '//', element.offsetLeft)

                // offset값으로 좌표계산하기
                const xp = Math.abs(container.getBoundingClientRect().x); // 호출마다 계산 > 최소호출 희망 > const { x, y } = contianer.getBoundingClientRect();
                const yp = Math.abs(container.getBoundingClientRect().y);
                // window.scrollBy(event.clientX, event.clientY);
                // const height = container.scrollHeight;
                // const width = container.scrollWidth;

                // const x = event.clientX;
                // const y = event.clientY;

                // const xPercentage = x / screen.width;
                // const yPercentage = y / screen.height;

                window.scrollTo(element.offsetLeft, element.offsetTop)

                if (xp > 2 || yp > 2) {
                    let innerWidth = window.innerWidth;
                    innerWidth += Math.abs(container.getBoundingClientRect().x)

                    let innerHeight = window.innerHeight;
                    innerHeight += Math.abs(container.getBoundingClientRect().y)

                    container.style.width = `${innerWidth}px`;
                    container.style.height = `${innerHeight}px`;
                }

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

    throttle: (callback, limit = 100) => {
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
        console.log(drawOptions)
        const container: HTMLElement = drawOptions.container
        this.elements.push(element)
        container.append(element);
    },

    // moveTop 함수도 넘겨주기!
    // event와 element 그리고 부모 요소정보 필요!
    dragInit(element, isSelected, elements, mouseMove, parent) {

        element.addEventListener('click', (e) => {
            this.moveTop(e, element, parent);
        });

        element.addEventListener('mouseover', () => {
            element.style.backgroundColor = "rgba(255,0,0,0.7)";
        });

        element.addEventListener('mouseout', () => {
            element.style.backgroundColor = "rgba(255,0,0,0.2)";
        });

        element.addEventListener('mousedown', () => {
            element.addEventListener('mousemove', mouseMove)
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

    }
}