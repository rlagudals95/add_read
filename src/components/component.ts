import { utils } from '../ts/utils'

export class BaseComponent<T extends HTMLElement>  {

    private element!: T;
    private elements
    private selectedElement: any;
    private parentId: string;
    private elementId: string
    private parent: HTMLElement
    public isSelected: boolean;
    private DELAYTIME: number = 300;
    private mouseMove


    constructor(drawOptions) {

        // container의 x, y 위치에 element를 그린다.
        const template = document.createElement('template');
        template.innerHTML = drawOptions.htmlString;

        this.parent = drawOptions.container


        console.log('먼저등록 :', this.elements)

        this.element = template.content.firstElementChild! as T;
        this.element.style.position = 'absolute';
        this.element.style.transform = 'translate(-50%, -50%)'
        this.element.style.left = `${drawOptions.x}px`;
        this.element.style.top = `${drawOptions.y}px`;

        // class name 지정형식 지양
        // 컴포넌트 위주 개발자라면 더더욱 지양

        this.element.style.backgroundColor = 'rgba(255,0,0,0.2)';
        this.element.style.opacity = '1';

        utils.attachTo(drawOptions, this.element);

        this.mouseMove = () => { utils.throttle(this.detectOverlap(this.element, this.parent), this.DELAYTIME) }

        // 드래그 on
        utils.draggable(this.element, this.parent)
        utils.dragInit(this.element, this.isSelected, this.elements, this.mouseMove, this.parent);
    }

    private detectOverlap(element: T, container: HTMLElement) {
        // const { x, y } = contianer.getBoundingClientRect()
        // 위의 문법으로 수정
        const selectedElement = this.element.getBoundingClientRect();

        let childArr = utils.elements;
        for (let i = 0; i < childArr.length; i++) {

            const elementRect = childArr[i].getBoundingClientRect();
            const _element = childArr[i] as HTMLElement

            if (
                selectedElement.x < elementRect.x + elementRect.width &&
                selectedElement.x + selectedElement.width > elementRect.x &&
                selectedElement.y < elementRect.y + elementRect.height &&
                selectedElement.height + selectedElement.y > elementRect.y
            ) {
                _element.style.border = '2px solid blue'
            } else {
                _element.style.border = 'none'
            }
            //_element.style.border = 'none'
        }

        this.element.style.border = '2px solid red'
    }
}

