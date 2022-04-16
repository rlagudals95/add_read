import { consoleUtil } from "./consoleUtil";

export const moveTop = (element: HTMLElement, parent: HTMLElement, elements) => { // z-index to
    consoleUtil('moveTop!');
    event.stopPropagation();
    event.preventDefault();
    
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