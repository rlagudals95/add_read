import { moveTop } from "./moveTop";
import { Logger } from "./Logger";

export const dragInit = (element: HTMLElement, mouseMove, parent: HTMLElement, elements) => {

    // enter시 에 각종이벤트 등록
    // out시에 enter 이벤트 빼고 모두 해제
    

    const outEvent = () => {
        removeOnMouseEvent()
    } 

    const moveEvent = () => {
        element.addEventListener('mousemove', mouseMove)
    }

    const moveTopEvent = () => {
        moveTop(element, parent, elements);
    }

    const mouseUpEvent = () => {
        element.removeEventListener('mousemove', mouseMove)
        elements.map((ele)=> {
            ele.style.border = 'none;'
        })
    }

    const onMouseEvent = () => {
        Logger.info('on')
        element.style.backgroundColor = "rgba(255,0,0,0.7)";
        element.addEventListener('click', moveTopEvent);
        element.addEventListener('mouseout', outEvent);
        element.addEventListener('mousedown', moveEvent)
        element.addEventListener('mouseup', mouseUpEvent)
        //element.addEventListener('mouseout', outMouseEvent);
    }
    const removeOnMouseEvent = () => {
        Logger.info('out')
        element.style.backgroundColor = "rgba(255,0,0,0.2)";
        element.removeEventListener('click', moveTopEvent);
        element.removeEventListener('mouseout', outEvent);
        element.removeEventListener('mousedown', moveEvent)
        element.removeEventListener('mouseup', mouseUpEvent)
    }

    element.addEventListener('mouseenter',onMouseEvent);

}

// import { moveTop } from "./moveTop";


// export const dragInit = (element: HTMLElement, mouseMove, parent: HTMLElement, elements) => {

//     // enter시 에 각종이벤트 등록
//     // out시에 enter 이벤트 빼고 다 해제

//     element.addEventListener('mouseenter', (e) => {
//         console.log('')
//     });

//     element.addEventListener('click', (e) => {
//         moveTop(element, parent, elements);
//     });

//     element.addEventListener('mouseover', () => {
//         element.style.backgroundColor = "rgba(255,0,0,0.7)";
//     });

//     element.addEventListener('mouseout', () => {
//         element.style.backgroundColor = "rgba(255,0,0,0.2)";
//     });

//     element.addEventListener('mousedown', (e) => {
//         // detectOverlap
//         element.addEventListener('mousemove', mouseMove)
//     })

//     element.addEventListener('mouseup', (e) => {

//         element.removeEventListener('mousemove', mouseMove)

//         elements.map((ele)=> {
//             ele.style.border = 'none;'
//         })

//     })
// }

