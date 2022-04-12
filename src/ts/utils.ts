export const utils = {
    waiting: false as boolean,
    pos: {
        x: -1,
        y: -1
    },

    draggable(element,
        detectOverlap,
        container) {
        const throttle = this.throttle

        element.onmousedown = function (event) {
            // document 전역 객체에다가 직접 이벤트 핸들러를 등록하고, 해제 보류....

            document.onmousemove = (event) => {

                element.style.left = event.clientX + 'px';
                element.style.top = event.clientY + 'px';
                window.scrollBy(event.clientX, event.clientY);

            };

            document.onmouseup = function () {
                document.onmousemove = null;
                console.log('onmouseup')

                if (element.releaseCapture) { element.releaseCapture(); }
            };

            if (element.setCapture) { element.setCapture(); }
        }

        element.unselectable = "on";
        element.onselectstart = function () { return false };
        element.style.userSelect = element.style.MozUserSelect = "none";
    },

    throttle(callback, limit = 100) {

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
        const container: HTMLElement = drawOptions.container
        container.append(element);
    },

    removeEvent(element) {
        console.log('removeEvent')
        let el = element,
            elClone = el.cloneNode(true);

        el.parentNode.replaceChild(elClone, el);
    },

}