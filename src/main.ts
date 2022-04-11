import { drawSwitch } from "./components/dragSwitch.js";
import { drawOptions } from "./ts/draw.js"


window.onload = function () {

    new drawSwitch(
        document.getElementById('wrapper')
        , `<button id="drawSwitch">상자그리기</button>`, 50, 20);

    //drawOptions.drawOn();
}





