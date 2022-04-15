import { utils } from '../ts/utils'

export class BaseComponent<T extends HTMLElement>  {

    private element!: T;
    private parent: HTMLElement
    public isSelected: boolean;
    private mouseMove

    constructor(drawOptions) {

        // container의 x, y 위치에 element를 그린다.
        const template = document.createElement('template');
        template.innerHTML = drawOptions.htmlString;


        this.parent = drawOptions.container
        this.element = template.content.firstElementChild! as T;
        this.element.style.position = 'absolute';
        this.element.style.transform = 'translate(-50%, -50%)'
        this.element.style.left = `${drawOptions.x}px`;
        this.element.style.top = `${drawOptions.y}px`;
        //this.element.className = 'drag_component';

        this.element.style.backgroundColor = 'rgba(255,0,0,0.2)';
        this.element.style.opacity = '1';
        utils.attachTo(drawOptions, this.element);

        this.mouseMove = () => { utils.throttle(this.detectOverlap(this.element, this.parent)) }

        // 드래그 on
        utils.draggable(this.element, this.parent)
        utils.dragInit(this.element, this.mouseMove, this.parent);
    }

    private detectOverlap(element: T, container: HTMLElement) {
        // 위의 문법으로 수정
        const selectedElement = this.element.getBoundingClientRect();

        let childArr = utils.elements;
        for (const _element of childArr) {

            const elementRect = _element.getBoundingClientRect();

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