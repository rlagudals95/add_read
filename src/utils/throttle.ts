const DELAYTIME:number = 300;

export const throttle = (callback, limit = DELAYTIME) => {
    return function () {
        if (!this.waiting) {
            callback.apply(this, arguments)
            this.waiting = true
            setTimeout(() => {
                this.waiting = false
            }, limit)
        }
    }
}