export let elements = []

export const attachTo = (drawOptions, element: HTMLElement) => {
  
    elements.push(element)

    drawOptions.container.append(element);
}



