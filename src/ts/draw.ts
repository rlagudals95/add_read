import { SquareComponent } from "../components/square.js"

export const drawOptions = {

    pos: {
        x: -1,
        y: -1
    },

    isDraw: false,

    getPosition: (event, pos) => {
        pos.x = event.pageX
        pos.y = event.pageY
    },

    drawOn() {

        let cnt: number = 0; // 생성한 요소 개수

        const drawSwitch = document.getElementById('drawSwitch');
        const drawingSpace: HTMLElement = document.getElementById('document')!;


        let isDraw = this.isDraw

        drawSwitch.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const switchBtn: HTMLElement = this
            isDraw = !isDraw
            if (isDraw) {
                switchBtn.style.background = '#f7685b';
                switchBtn.style.border = '1px solid #e54839';
                drawingSpace.style.cursor = 'crosshair'
            } else {
                switchBtn.style.background = 'gray';
                switchBtn.style.border = '1px solid black';
                drawingSpace.style.cursor = 'not-allowed'
            }
        })

        const _getPosition = this.getPosition
        let _pos = this.pos
        document.addEventListener('mousemove', function (e) {
            _getPosition(e, _pos)
        });
        document.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('생성!')
            if (isDraw) {
                cnt++ // 생성한 요소 갯수 카운팅
                new SquareComponent(drawingSpace, `<div style="width: 200px; height: 200px;"><div>`, this.pos.x, this.pos.y, cnt);
            } else {
                alert('상자추가하기 버튼을 클릭해주세요😀 ');
            }
        })
    }
}





