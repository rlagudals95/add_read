import { drawButton } from "./components/drawButton";
import { drawButtonOptions } from "./components/drawButton"
import { Logger } from "./utils/Logger";
import "./css/common.css"

window.onload = function () {

    Logger.info(`env :, ${process.env.NODE_ENV}`)

    const drawButtonOptions: drawButtonOptions = {
        container: document.getElementById('wrapper'),
        htmlString: `<button id="drawButton">상자그리기</button>`,
        x: 50,
        y: 20

    }

    new drawButton(drawButtonOptions);

}





