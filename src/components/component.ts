import { draggable } from '../utils/draggable';
import { elements } from '../utils/attachTo';
import { attachTo } from '../utils/attachTo';
import { detectIntersect } from '../utils/detectIntersect';
import { throttle } from '../utils/throttle';
import { dragInit } from '../utils/dragaInit';


export class BaseComponent<T extends HTMLElement>  {
    
    private element!: T;
    private parent: HTMLElement
    //public isSelected: boolean;
    private mouseMove;
    private isIntersect:boolean = false;

    constructor(drawOptions) {

        // container의 x, y 위치에 element를 그린다.
        const template = document.createElement('template');
        template.innerHTML = drawOptions.htmlString;

        //this.parent = drawOptions.container
        this.parent = document.body

        this.parent = drawOptions.container
        this.element = template.content.firstElementChild! as T;
        this.element.style.position = 'absolute';
        this.element.style.transform = 'translate(-50%, -50%)'
        this.element.style.left = `${drawOptions.x}px`;
        this.element.style.top = `${drawOptions.y}px`;
        
        this.element.style.backgroundColor = 'rgba(255,0,0,0.2)';
        this.element.style.opacity = '1';

        this.element.setAttribute('id', 'test')
        attachTo(drawOptions, this.element);
        elements.push(this.element)
        
        
        this.mouseMove = () => { 
            //console.log('ㅇㅅㅇ : ',throttle(detectIntersect(this.element, elements, this.parent)) )
            throttle(detectIntersect(this.element, elements, this.parent)) 
            
        }

        // 드래그 on
        draggable(this.element, this.parent, elements )
        dragInit(this.element, this.mouseMove, this.parent, elements);
    }

}