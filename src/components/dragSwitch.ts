import { utils } from '../ts/utils'
import { SquareComponent } from './square.js';

export interface drawSwitchOptions {
    container: HTMLElement, // 삽입할 html의 부모태그
    htmlString: string, // 삽입할 html
    x: number, // 삽입할 위치 x좌표
    y: number, // 삽입할 위치 y좌표
}


export class drawSwitch<T extends HTMLElement> {

    private element!: T;
    private pos = {
        x: -1,
        y: -1
    }

    private isDraw: boolean = false;

    constructor(drawSwitchOptions: drawSwitchOptions) {

        const initOptions = {
            ...drawSwitch.defaultOptions,
            ...drawSwitchOptions
        }

        const template = document.createElement('template');
        template.innerHTML = initOptions.htmlString;

        this.element = template.content.firstElementChild! as T;
        this.element.style.position = 'absolute';
        this.element.style.transform = 'translate(-50%, -50%)'
        this.element.style.left = `${initOptions.x}%`;
        this.element.style.bottom = `${initOptions.y}px`;
        this.element.style.zIndex = '100';

        this.element.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault()
            this.drawOn()
        })

        utils.attachTo(initOptions, this.element);
    }

    private getPosition = (event) => {
        this.pos.x = event.pageX
        this.pos.y = event.pageY
    }

    private drawOn() {

        let cnt: number = 0; // 생성한 요소 개수

        const drawSwitch = document.getElementById('drawSwitch');
        const container: HTMLElement = document.getElementById('document')!;

        this.isDraw = !this.isDraw

        if (this.isDraw) {
            drawSwitch.style.background = '#f7685b';
            drawSwitch.style.border = '1px solid #e54839';
            container.style.cursor = 'crosshair'
            container.addEventListener('mousemove', (e) => {
                this.getPosition(e)
            });
            container.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (this.isDraw) {
                    cnt++ // 생성한 요소 갯수 카운팅
                    const squareOptions = {
                        container: container,
                        htmlString: `<div style="width: 200px; height: 200px;"><div>`,
                        x: this.pos.x, y: this.pos.y, cnt: cnt
                    }

                    new SquareComponent(squareOptions);
                } else {
                    alert('상자추가하기 버튼을 클릭해주세요😀 ');
                }
            })
        } else {
            // 이벤트 제거
            drawSwitch.style.background = 'gray';
            drawSwitch.style.border = '1px solid black';
            container.style.cursor = 'not-allowed'
            utils.removeEvent(container)

        }
    }

    public static get defaultOptions(): drawSwitchOptions {
        return {
            container: document.createElement('div'),
            htmlString: '',
            x: 0,
            y: 0,
        };
    }

}