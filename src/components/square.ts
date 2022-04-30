import { BaseComponent } from "./component";

interface SquareComponentOptions {
    container: HTMLElement, // 삽입할 html의 부모태그
    htmlString: string, // 삽입할 html
    x: number, // 삽입할 위치 x좌표
    y: number, // 삽입할 위치 y좌표
    cnt: number // 삽입한 요소의 갯수
}

export class SquareComponent<T extends HTMLElement> extends BaseComponent<T> {


    constructor(SquareComponentOptions: SquareComponentOptions) {
        const initOptions = {
            ...SquareComponent.defaultOptions,
            ...SquareComponentOptions
        }

        super(initOptions);
    }

    public static get defaultOptions(): SquareComponentOptions {
        return {
            container: document.createElement('div'),
            htmlString: '',
            x: 0,
            y: 0,
            cnt: 0,
        };
    }
} 