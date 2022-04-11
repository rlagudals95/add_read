import { drawSwitch } from "./components/dragSwitch.js";
import { drawSwitchOptions } from "./components/dragSwitch.js"


window.onload = function () {

    const drawSwitchOptions: drawSwitchOptions = {
        container: document.getElementById('wrapper'),
        htmlString: `<button id="drawSwitch">상자그리기</button>`,
        x: 50,
        y: 20

    }

    new drawSwitch(drawSwitchOptions);

}





