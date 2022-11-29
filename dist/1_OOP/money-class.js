"use strict";
class Money {
    value;
    rate;
    constructor(value, rate) {
        this.value = value;
        this.rate = rate;
    }
    get() {
        if (this.value instanceof Money) {
            const money = this.value;
            const amount = money.value;
            return amount * this.rate;
        }
        return this.value;
    }
    setMod(rate) {
        this.rate = rate;
        return this;
    }
}
class Zloty extends Money {
}
class Dollar extends Money {
}
