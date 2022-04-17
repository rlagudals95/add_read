import { throttle } from "./throttle";
import { Logger } from "./Logger";
export const detectIntersect = (element: HTMLElement, elements: HTMLElement [] ,container: HTMLElement) => {
    Logger.info('detectIntersect')
    
    const selectedElement = element.getBoundingClientRect();
    
    for (const _element of elements) {

        const elementRect = _element.getBoundingClientRect();

        if (
            selectedElement.x < elementRect.x + elementRect.width &&
            selectedElement.x + selectedElement.width > elementRect.x &&
            selectedElement.y < elementRect.y + elementRect.height &&
            selectedElement.height + selectedElement.y > elementRect.y
        ) {
            //return true
            _element.style.border = '2px solid blue'
           
        } else {
            //return false
            _element.style.border = 'none' 
        }
       
    }
}