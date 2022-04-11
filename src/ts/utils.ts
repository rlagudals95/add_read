import { SquareComponent } from "../components/square";

export const utils = {
    waiting: false as boolean,
    pos: {
        x: -1,
        y: -1
    },

    draggable(element, detectOverlap: Function, container) {
        const throttle = this.throttle
        element.onmousedown = function (event) {
            document.onmousemove = (event) => {
                console.log(document.getElementsByTagName('body')[0].style.width)
                element.style.left = event.clientX + 'px';
                element.style.top = event.clientY + 'px';
                window.scrollBy(event.clientX, event.clientY);

                element.setAttribute('selected', 'true');

                throttle(detectOverlap(element), 300);

            };

            document.onmouseup = function () {
                document.onmousemove = null;
                element.removeAttribute('selected')
                console.log('onmouseup')

                if (element.releaseCapture) { element.releaseCapture(); }
            };

            if (element.setCapture) { element.setCapture(); }
        }

        element.unselectable = "on";
        element.onselectstart = function () { return false };
        element.style.userSelect = element.style.MozUserSelect = "none";
    },

    throttle(callback: Function, limit = 100) {

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


    attachTo(parent: HTMLElement, element: HTMLElement, x: number, y: number, cnt?: number) {
        parent.appendChild(element);
    },

    removeEvent(element) {
        console.log('removeEvent')
        let el = element,
            elClone = el.cloneNode(true);

        el.parentNode.replaceChild(elClone, el);
    },

}