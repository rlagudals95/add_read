import { throttle } from "./throttle";
import { isItIn } from "./isItIn";
import { resizeScreen } from "./resizeScreen";
import { moveElement } from "./moveElement"
import { consoleUtil } from "./consoleUtil";

export const draggable  = (element: HTMLElement,
    container: HTMLElement, elements) => {
    consoleUtil('draggable')
    const _moveElement = (event) => {
        throttle(moveElement(event, element, container, isItIn, resizeScreen))
    }

    element.addEventListener('mousedown', (event) => {

        const body = document.body

        body.addEventListener('mousemove', _moveElement)
        body.addEventListener('mouseup', (event) => {

            body.removeEventListener('mousemove', _moveElement)

            elements.map((ele) => {
                ele.style.border = 'none';
            })
        })
    })
}
