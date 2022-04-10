import { SquareComponent } from "./components/square.js"
import { drawOptions } from "./ts/draw.js"

let pos = {
    x: -1,
    y: -1,
};
let cnt: number = 0; // 생성한 요소 개수


function getPosition(event: any): void {
    let x: number = event.pageX;
    let y: number = event.pageY;

    pos.x = x;
    pos.y = y;

}



window.onload = function () {

    drawOptions.drawOn();

}





