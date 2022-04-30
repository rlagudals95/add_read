import { Logger } from "./Logger";
import { DELAY_TIME } from "../config/constants";

export const throttle = (callback, limit = DELAY_TIME) => {
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


