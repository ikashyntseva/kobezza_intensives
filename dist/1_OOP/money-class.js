"use strict";
class Money {
    amount = 0;
    constructor(amount) {
        this.amount = amount;
    }
    get() {
        return this.amount;
    }
}
class Zloty extends Money {
    constructor(amount) {
        super(amount);
    }
}
class Dollar extends Money {
    money;
    rate;
    constructor(money, rate) {
        if (money instanceof Money) {
            super(money.amount);
            this.money = money;
            this.rate = rate;
            this.amount = Math.floor(this.amount * 10 / this.rate) / 10;
        }
        else {
            super(money);
        }
    }
    setMod(rate) {
        this.rate = rate;
        this.amount = Math.floor(this.money.amount * 10 / this.rate) / 10;
        return this;
    }
}
const pln = new Zloty(100);
const dol = new Dollar(pln, 75);
console.log(dol);
console.log(dol.setMod(90).get());
