import { BOX_MARGIN } from "../config/constants";


export const isItIn =  (parent: HTMLElement, child: HTMLElement) => {

    const box1coords = parent.getBoundingClientRect();
    const box2coords = child.getBoundingClientRect();

    if (
        box2coords.top + BOX_MARGIN < box1coords.top ||
        box2coords.right + BOX_MARGIN > box1coords.right ||
        box2coords.bottom + BOX_MARGIN > box1coords.bottom ||
        box2coords.left + BOX_MARGIN < box1coords.left) {
        return true;
    }
    return false;
}