import { utils } from '../ts/utils'
import { SquareComponent } from './square.js';

export class drawSwitch<T extends HTMLElement> {

    private element!: T;
    private pos = {
        x: -1,
        y: -1
    }

    private isDraw: boolean = false;

    constructor(container: HTMLElement, htmlString: string, x: number, y: number) {
        console.log('add dragSwitch!!')
        const template = document.createElement('template');
        template.innerHTML = htmlString;

        this.element = template.content.firstElementChild! as T;
        this.element.style.position = 'absolute';
        this.element.style.transform = 'translate(-50%, -50%)'
        this.element.style.left = `${x}%`;
        this.element.style.bottom = `${y}px`;
        this.element.style.zIndex = '100';

        this.element.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault()
            this.drawOn()
        })


        utils.attachTo(container, this.element, x, y);
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
            console.log('이벤트 등록!')
            drawSwitch.style.background = '#f7685b';
            drawSwitch.style.border = '1px solid #e54839';
            container.style.cursor = 'crosshair'

            container.addEventListener('mousemove', (e) => {
                this.getPosition(e)
            });
            container.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('생성!')
                if (this.isDraw) {
                    cnt++ // 생성한 요소 갯수 카운팅
                    new SquareComponent(container, `<div style="width: 200px; height: 200px;"><div>`, this.pos.x, this.pos.y, cnt);
                } else {
                    alert('상자추가하기 버튼을 클릭해주세요😀 ');
                }
            })
        } else {
            console.log('이벤트 제거!')
            drawSwitch.style.background = 'gray';
            drawSwitch.style.border = '1px solid black';
            container.style.cursor = 'not-allowed'
            utils.removeEvent(container)

        }
    }


}