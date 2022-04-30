import { throttle } from "./throttle";
import { isItIn } from "./isItIn";
import { resizeScreen } from "./resizeScreen";
import { moveElement } from "./moveElement"
import { Logger } from "./Logger";

export const draggable  = (element: HTMLElement,
    container: HTMLElement, elements) => {
  
    const _moveElement = (event) => {
        throttle(moveElement(event, element, container, isItIn, resizeScreen))
    }

    const mouseUpEvent = () => {
        const body = document.body

        body.addEventListener('mouseup', (event) => {
            body.removeEventListener('mousemove', _moveElement)
            elements.map((ele) => {
                ele.style.border = 'none';
            })
        })
    }

    const mouseDownEvent = () => {
        const body = document.body
        body.addEventListener('mousemove', _moveElement)
        body.addEventListener('mouseup', mouseUpEvent)
    }

  
    const onMouseEvent = () => {
        Logger.info('on draggable')
        element.addEventListener('mousedown', mouseDownEvent)
        element.addEventListener('mouseout', removeOnMouseEvent)
        element.addEventListener('mouseup', removeMouseDownEvent)
    }
    
    const removeOnMouseEvent = () => {
        Logger.info('out draggable')
        element.removeEventListener('mousedown', mouseDownEvent)
        element.removeEventListener('mouseout', removeOnMouseEvent)
        element.removeEventListener('mouseup', removeMouseDownEvent)
        
    }

    const removeMouseDownEvent = () => {
        const body = document.body
        body.removeEventListener('mousemove', _moveElement)
        body.removeEventListener('mouseup', mouseUpEvent)   
    }

    element.addEventListener('mouseenter',onMouseEvent);

}


