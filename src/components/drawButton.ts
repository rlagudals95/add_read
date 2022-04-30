import { SquareComponent } from './square';
import { attachTo } from '../utils/attachTo';
import { removeAllEventListener } from '../utils/removeAllEventListener';
import { getPosition } from '../utils/getPosition';

export interface drawButtonOptions {
    container: HTMLElement, // 삽입할 html의 부모태그
    htmlString: string, // 삽입할 html
    x: number, // 삽입할 위치 x좌표
    y: number, // 삽입할 위치 y좌표
}


export class drawButton<T extends HTMLElement> {

    private element!: T;
    private pos = {
        x: -1,
        y: -1
    }

    private isDraw: boolean = false;

    constructor(drawButtonOptions: drawButtonOptions) {

        const initOptions = {
            ...drawButton.defaultOptions,
            ...drawButtonOptions
        }

        const template = document.createElement('template');
        template.innerHTML = initOptions.htmlString;

        this.element = template.content.firstElementChild! as T;
        this.element.style.position = 'fixed';
        this.element.style.transform = 'translate(-50%, -50%)'
        this.element.style.left = `${initOptions.x}%`;
        this.element.style.bottom = `${initOptions.y}px`;
        this.element.style.zIndex = '100';

        this.element.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault()
           
            this.drawOn(this.element, drawButtonOptions.container)
        })

        attachTo(drawButtonOptions, this.element);
    }

    
    private drawOn(element:HTMLElement, container:HTMLElement) {

        let cnt: number = 0; // 생성한 요소 개수
        const drawButton:HTMLElement = element;
        
        this.isDraw = !this.isDraw

        if (this.isDraw) {

            drawButton.style.background = '#f7685b';
            drawButton.style.border = '1px solid #e54839';
            container.style.cursor = 'crosshair'
            container.addEventListener('mousemove', (e) => {
                getPosition(e,this.pos)
                //this.getPosition(e)
            });
            container.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (this.isDraw) {
                    cnt++ // 생성한 요소 갯수 카운팅

                    const squareOptions = {
                        container: container,
                        htmlString: `<span style="width: 200px; height: 200px;"><span>`,
                        x: this.pos.x, y: this.pos.y, cnt: cnt
                    }
              
                    new SquareComponent(squareOptions);
                } else {
                    alert('상자추가하기 버튼을 클릭해주세요😀 ');
                }
            })
        } else {
        
            drawButton.style.background = 'gray';
            drawButton.style.border = '1px solid black';
            container.style.cursor = 'not-allowed'
            removeAllEventListener(container)

        }
    }

    public static get defaultOptions(): drawButtonOptions {
        return {
            container: document.createElement('div'),
            htmlString: '',
            x: 0,
            y: 0,
        };
    }

} 
