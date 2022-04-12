import { utils } from '../ts/utils'

export class BaseComponent<T extends HTMLElement>  {

    private element!: T;
    private selectedElement: any;
    private parentId: string;
    private elementId: string
    private parent: HTMLElement
    public isSelected: boolean
    private DELAYTIME: number = 300;
    private mouseMove

    constructor(drawOptions) {

        // container의 x, y 위치에 element를 그린다.
        const template = document.createElement('template');
        template.innerHTML = drawOptions.htmlString;

        this.parent = drawOptions.container
        // 요소를 삽일할 부모 태그
        this.parentId = drawOptions.container.getAttribute('id')

        this.element = template.content.firstElementChild! as T;
        this.element.style.position = 'absolute';
        this.element.style.transform = 'translate(-50%, -50%)'
        this.element.style.left = `${drawOptions.x}px`;
        this.element.style.top = `${drawOptions.y}px`;

        // class name 지정형식 지양
        // 컴포넌트 위주 개발자라면 더더욱 지양
        this.element.className = 'p-' + this.parentId;

        this.element.style.backgroundColor = 'rgba(255,0,0,0.2)';
        this.element.style.opacity = '1';

        // attribute 사용시양
        this.element.setAttribute('parent', drawOptions.container.getAttribute('id'))

        utils.dragInit(this.element)

        this.element.addEventListener('click', this.moveTop);

        this.mouseMove = () => { utils.throttle(this.detectOverlap(this.element, this.parent), this.DELAYTIME) }


        // this, bind, call, apply 함수 찾아보기 중요!
        // init 함수로 모듈화 
        this.element.addEventListener('mousedown', () => {
            this.isSelected = true
            this.element.addEventListener('mousemove', this.mouseMove)
        })

        this.element.addEventListener('mouseup', () => {
            console.log('remove Event')
            this.isSelected = false

            this.element.removeEventListener('mousemove', this.mouseMove)
        })

        // 드래그 on
        utils.draggable(this.element, this.parent)

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

    private detectOverlap(element: T, container: HTMLElement) {

        const selectedElement = this.element.getBoundingClientRect();

        const childNodes: NodeList = container.childNodes

        // class 없이 container의 자식 노드들을 array에 담는다.
        let childArr = [];
        for (let i = 0; i < childNodes.length; i++) {
            if (childNodes[i] instanceof HTMLDivElement) {
                childArr.push(childNodes[i])
            }
        }

        for (let i = 0; i < childArr.length; i++) {

            const elementRect = childArr[i].getBoundingClientRect();
            const _element = childArr[i] as HTMLElement
            //!_element.getAttribute('selected')

            if (
                this.isSelected &&
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

