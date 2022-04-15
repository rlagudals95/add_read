import { consoleUtil } from "./consoleUtil";

export const removeEvent = (element: HTMLElement) =>  {
    consoleUtil('removeEvent')
    const el = element,
        elClone = el.cloneNode(true);

    el.parentNode.replaceChild(elClone, el);
}