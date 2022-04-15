export const utils = {
    waiting: false as boolean,
    element: null as HTMLElement,
    isSeleted: false as boolean,
    elements: [],// NodeList
    innerWidth: 0 as number,
    innerHeight: 0 as number,
    flag: false as boolean,
    position: { x: 0, y: 0 },

    draggable(element: HTMLElement,
        container: HTMLElement) {

        this.element = element;

        const moveElement = (event) => {

            this.throttle(this.moveElement(event, element, container, this.isItIn, this.resizeScreen))

        }

        element.addEventListener('mousedown', (event) => {


            const body = document.getElementsByTagName('body')[0]

            body.addEventListener('mousemove', moveElement)
            body.addEventListener('mouseup', (event) => {

                body.removeEventListener('mousemove', moveElement)
                for (let i = 0; i < this.elements.length; i++) {
                    this.elements[i].style.border = 'none;'
                }

            })

            //if (element.setCapture) { element.setCapture(); }
        })

    },

    dragInit(element: HTMLElement, mouseMove, parent: HTMLElement) {

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
            // detectOverlap
            element.addEventListener('mousemove', mouseMove)
        })

        element.addEventListener('mouseup', (e) => {

            element.removeEventListener('mousemove', mouseMove)

            for (let i = 0; i < this.elements.length; i++) {
                this.elements[i].style.border = 'none;'
            }
        })

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

    attachTo(drawOptions, element: HTMLElement) {
        const container: HTMLElement = drawOptions.container
        this.elements.push(element)

        document.getElementsByTagName('body')[0].append(element);
    },

    removeEvent(element: HTMLElement) {
        console.log('removeEvent')
        const el = element,
            elClone = el.cloneNode(true);

        el.parentNode.replaceChild(elClone, el);
    },

    moveTop: (event: MouseEvent, element: HTMLElement, parent: HTMLElement) => { // z-index to
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

    moveElement: (event, element, container, isItIn,
        resizeScreen) => {
        // 타겟 비교하기 보완하기....!!!!!
        console.log(event.target.tagName)
        console.log(event.offsetX, '/', event.offsetY)
        // event.offsetX > 120 
        // event.target.tagName == 'DIV'

        if (event.offsetX > 120) {
            element.style.left = `${event.offsetX}px`;
            element.style.top = `${event.offsetY}px`;
        }

        if (isItIn) {
            resizeScreen(event, container)
            scrollTo(event.pageX, event.pageY)
        }
    },

    // 커서가 화면안에 있는지 감지하는 함수
    isItIn: (parent: HTMLElement, child: HTMLElement) => {
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

    resizeScreen(event: MouseEvent, container) {

        const scrollX = document.documentElement.scrollWidth;
        const scrollY = document.documentElement.scrollHeight;

        container.style.width = `${scrollX}px`
        container.style.height = `${scrollY}px`

    },


}