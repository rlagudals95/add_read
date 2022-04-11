import { utils } from '../ts/utils'

interface drawOptions {
    container: HTMLElement, // 삽입할 html의 부모태그
    htmlString: string, // 삽입할 html
    x: number, // 삽입할 위치 x좌표
    y: number, // 삽입할 위치 y좌표
    cnt: number // 삽입한 요소의 갯수
}

export class BaseComponent<T extends HTMLElement>  {

    private element!: T;
    private selectedElement: any;
    private parentId: string;
    private elementId: string

    // container: HTMLElement, htmlString: string, x: number, y: number, cnt: number
    constructor(drawOptions: drawOptions) {

        // container의 x, y 위치에 element를 그린다.
        const template = document.createElement('template');
        template.innerHTML = drawOptions.htmlString;

        // 요소를 삽일할 부모 태그
        this.parentId = drawOptions.container.getAttribute('id')

        this.element = template.content.firstElementChild! as T;
        this.element.style.position = 'absolute';
        this.element.style.transform = 'translate(-50%, -50%)'
        this.element.style.left = `${drawOptions.x}px`;
        this.element.style.top = `${drawOptions.y}px`;

        this.element.className = 'p-' + this.parentId;


        this.element.style.backgroundColor = 'rgba(255,0,0,0.2)';
        this.element.style.opacity = '1';
        this.element.setAttribute('onMouseOver', 'this.style.backgroundColor = "rgba(255,0,0,0.7)"');
        this.element.setAttribute('onMouseOut', 'this.style.backgroundColor = "rgba(255,0,0,0.2)"');
        this.element.setAttribute('parent', drawOptions.container.getAttribute('id'))
        this.element.addEventListener('click', this.moveTop);

        // 드래그 on
        utils.draggable(this.element, this.detectOverlap, drawOptions.container)

        //this.element.setAttribute('draggable', 'true')
        this.element.setAttribute('id', this.elementId);

        utils.attachTo(drawOptions, this.element);

        this.elementId = (document.getElementsByClassName('p-document').length).toString() + '_element'
        this.element.setAttribute('id', this.elementId);

    }


    private moveTop(event: MouseEvent) { // z-index to
        console.log('moveTop!');
        event.stopPropagation();
        event.preventDefault();
        this.selectedElement = this;
        this.parentId = this.selectedElement.getAttribute("parent")! as string;

        const elements = Array.from(document.getElementsByClassName('p-' + this.parentId));

        // 선택한 것을 제외한 다른 요소들 border: none;
        if (elements.length) {
            elements.map((element: HTMLElement) => {
                element.style.border = 'none';
            })
        }


        this.selectedElement.remove();
        this.selectedElement.style.border = '2px solid red';

        document.getElementById(this.parentId).append(this.selectedElement);

    }


    private detectOverlap(element) {

        const selectedElement = element.getBoundingClientRect();

        const Elements = document.getElementsByClassName('p-document')

        // 겹치는 element 검사
        for (let i = 0; i < Elements.length; i++) {
            const elementRect = Elements[i].getBoundingClientRect();
            const _element = Elements[i] as HTMLElement

            if (!_element.getAttribute('selected') &&
                selectedElement.x < elementRect.x + elementRect.width &&
                selectedElement.x + selectedElement.width > elementRect.x &&
                selectedElement.y < elementRect.y + elementRect.height &&
                selectedElement.height + selectedElement.y > elementRect.y
            ) {
                _element.style.border = '2px solid blue'
            } else {
                _element.style.border = 'none'
            }
        }
    }

}

