import { consoleUtil } from "./consoleUtil";
import { throttle } from "./throttle";

export const detectIntersect = (element: HTMLElement, elements: HTMLElement [] ,container: HTMLElement):boolean => {
    //consoleUtil('detectOverlap')

    const selectedElement = element.getBoundingClientRect();
    
    for (const _element of elements) {

        const elementRect = _element.getBoundingClientRect();

        if (
            selectedElement.x < elementRect.x + elementRect.width &&
            selectedElement.x + selectedElement.width > elementRect.x &&
            selectedElement.y < elementRect.y + elementRect.height &&
            selectedElement.height + selectedElement.y > elementRect.y
        ) {
            //_element.style.border = '2px solid blue'
            return false;
        } else {
            //_element.style.border = 'none'
            return true;
        }
        //_element.style.border = 'none'
    }

    //element.style.border = '2px solid red'
}