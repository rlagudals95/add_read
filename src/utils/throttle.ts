export const throttle = (callback, limit = 300) => {
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