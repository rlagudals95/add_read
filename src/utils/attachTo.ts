import { consoleUtil } from "./consoleUtil"

export let elements = []

export const attachTo = (drawOptions, element: HTMLElement) => {
    consoleUtil('attachTo');
    elements.push(element)

    document.body.append(element);
}



