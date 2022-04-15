import { consoleUtil } from "./consoleUtil";


export const detectOverlap = (element: HTMLElement, elements ,container: HTMLElement) => {
    
    const selectedElement = element.getBoundingClientRect();
    
    let childArr = elements;
    for (const _element of childArr) {

        const elementRect = _element.getBoundingClientRect();

        if (
            selectedElement.x < elementRect.x + elementRect.width &&
            selectedElement.x + selectedElement.width > elementRect.x &&
            selectedElement.y < elementRect.y + elementRect.height &&
            selectedElement.height + selectedElement.y > elementRect.y
        ) {
            _element.style.border = '2px solid blue'
        } else {
            _element.style.border = 'none'
        }
        //_element.style.border = 'none'
    }

    element.style.border = '2px solid red'
}