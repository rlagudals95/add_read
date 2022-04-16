import { moveTop } from "./moveTop";


export const dragInit = (element: HTMLElement, mouseMove, parent: HTMLElement, elements) => {

    element.addEventListener('click', (e) => {
        moveTop(element, parent, elements);
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

        elements.map((ele)=> {
            ele.style.border = 'none;'
        })

    })
}
