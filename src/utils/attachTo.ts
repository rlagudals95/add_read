import { consoleUtil } from "./consoleUtil"

export let elements = []

export const attachTo = (drawOptions, element: HTMLElement) => {
    consoleUtil('attachTo');
    const container: HTMLElement = drawOptions.container

    elements.push(element)

    document.body.append(element);
}



