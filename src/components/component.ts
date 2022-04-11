import { utils } from '../ts/utils'

export class BaseComponent<T extends HTMLElement>  {

    private element!: T;
    private selectedElement: any;
    private draggedElement: any
    private parentId: string;
    private elementId: string

    constructor(container: HTMLElement, htmlString: string, x: number, y: number, cnt: number) {

        // container의 x, y 위치에 element를 그린다.
        const template = document.createElement('template');
        template.innerHTML = htmlString;

        // 요소를 삽일할 부모 태그
        this.parentId = container.getAttribute('id')

        this.element = template.content.firstElementChild! as T;
        this.element.style.position = 'absolute';
        this.element.style.transform = 'translate(-50%, -50%)'
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;

        this.element.className = 'p-' + this.parentId;


        this.element.style.backgroundColor = 'rgba(255,0,0,0.2)';
        this.element.style.opacity = '1';
        this.element.setAttribute('onMouseOver', 'this.style.backgroundColor = "rgba(255,0,0,0.7)"');
        this.element.setAttribute('onMouseOut', 'this.style.backgroundColor = "rgba(255,0,0,0.2)"');
        this.element.setAttribute('parent', container.getAttribute('id'))
        this.element.addEventListener('click', this.moveTop);

        // 드래그 on
        utils.draggable(this.element, this.detectOverlap, container)

        //this.element.setAttribute('draggable', 'true')
        this.element.setAttribute('id', this.elementId);
        this.attachTo(container, this.element, x, y, cnt);

        this.elementId = (document.getElementsByClassName('p-document').length).toString() + '_element'
        this.element.setAttribute('id', this.elementId);

    }

    attachTo(parent: HTMLElement, element: HTMLElement, x: number, y: number, cnt: number) {
        console.log('attatch!!!', x, y)
        parent.appendChild(element);

    }

    private moveTop(event: MouseEvent) { // z-index to
        console.log('moveTop!');
        event.stopPropagation();
        event.preventDefault();
        this.selectedElement = this;
        this.parentId = this.selectedElement.getAttribute("parent")! as string;

        let elements = Array.from(document.getElementsByClassName('p-' + this.parentId));

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

    // private movePosition(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     console.log('dragend!')
    //     let x: number = e.pageX;
    //     let y: number = e.pageY;

    //     this.draggedElement = this
    //     this.draggedElement.style.left = `${x}px`;
    //     this.draggedElement.style.top = `${y}px`;

    //     this.draggedElement.removeAttribute('selected')
    // }

    private detectOverlap(element) {

        const selectedElement = element.getBoundingClientRect();

        let Elements = document.getElementsByClassName('p-document')

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

