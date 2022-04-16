import { consoleUtil } from "./consoleUtil";

export const removeAllEventListener = (element: HTMLElement) =>  {
    consoleUtil('removeAllEventListener')
    const el = element,
        elClone = el.cloneNode(true);

    el.parentNode.replaceChild(elClone, el);
}