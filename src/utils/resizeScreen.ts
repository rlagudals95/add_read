import { consoleUtil } from "./consoleUtil";

export const resizeScreen =(event: MouseEvent, container) => {
    consoleUtil('resize')
    const scrollX = document.documentElement.scrollWidth;
    const scrollY = document.documentElement.scrollHeight;

    container.style.width = `${scrollX}px`
    container.style.height = `${scrollY}px`
}