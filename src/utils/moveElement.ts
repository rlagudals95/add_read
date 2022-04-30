import { DETECT_OFFSET } from "../config/constants";

export const moveElement = (event, element, container, isItIn,
    resizeScreen) => {
    // 타겟 비교하기 보완하기....!!!!!
    // event.offsetX > 120 
    // event.target.tagName == 'DIV'

    if (event.offsetX > DETECT_OFFSET) {
        element.style.left = `${event.offsetX}px`;
        element.style.top = `${event.offsetY}px`;
    }

    if (isItIn(container, element)) {
        resizeScreen(event, container)
        scrollTo(event.pageX, event.pageY)
    }
}