
export const removeAllEventListener = (element: HTMLElement) =>  {

    console.log('리무브 엘리먼트 :',element)
    const el = element,
        elClone = el.cloneNode(true);

    el.parentNode.replaceChild(elClone, el);
}