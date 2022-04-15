import { drawButton } from "./components/dragButton";
import { drawButtonOptions } from "./components/dragButton"
import {consoleUtil} from "./utils/consoleUtil"
import "./css/common.css"

window.onload = function () {

    console.log('개발환경 :',process.env.NODE_ENV)

    const drawButtonOptions: drawButtonOptions = {
        container: document.getElementById('wrapper'),
        htmlString: `<button id="drawButton">상자그리기</button>`,
        x: 50,
        y: 20

    }

    new drawButton(drawButtonOptions);

}





