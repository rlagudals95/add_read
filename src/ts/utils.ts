export const utils = {
    waiting: false as boolean,
    pos: {
        x: -1,
        y: -1
    },
    element: null,
    isSeleted: false,

    draggable(element,
        container) {
        this.element = element

        //console.log('엘리먼트 ::', element)
        // addEventListner로 변경
        element.onmousedown = function (event) {
            // document 전역 객체에다가 직접 이벤트 핸들러를 등록하고, 해제 보류....
            console.log('다운!')

            // down 다음에 이벤트 리스너 등록
            container.onmousemove = (event) => {
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

            };

            container.onmouseup = function () {
                container.onmousemove = null;
                console.log('onmouseup')

                if (element.releaseCapture) { element.releaseCapture(); }
            };

            if (element.setCapture) { element.setCapture(); }
        }

        element.unselectable = "on";
        element.onselectstart = function () { return false };
        element.style.userSelect = element.style.MozUserSelect = "none";
    },

    throttle: (callback, limit = 100) => {
        //console.log('띠로리', this)
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
        container.append(element);
    },

    resizeContainer(element) {
        let containerWidth = window.innerWidth
        let containerHeight = window.innerHeight
    },

    dragInit(element) {

        element.addEventListener('mouseover', () => {
            element.style.backgroundColor = "rgba(255,0,0,0.7)";
        });

        element.addEventListener('mouseout', () => {
            element.style.backgroundColor = "rgba(255,0,0,0.2)";
        });

    },

    removeEvent(element) {
        console.log('removeEvent')
        const el = element,
            elClone = el.cloneNode(true);

        el.parentNode.replaceChild(elClone, el);
    },



}