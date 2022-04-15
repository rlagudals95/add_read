const boxMargin:number = 50;

export const isItIn =  (parent: HTMLElement, child: HTMLElement) => {

    const box1coords = parent.getBoundingClientRect();
    const box2coords = child.getBoundingClientRect();

    if (
        box2coords.top + boxMargin < box1coords.top ||
        box2coords.right + boxMargin > box1coords.right ||
        box2coords.bottom + boxMargin > box1coords.bottom ||
        box2coords.left + boxMargin < box1coords.left) {
        return true;
    }
    return false;
}