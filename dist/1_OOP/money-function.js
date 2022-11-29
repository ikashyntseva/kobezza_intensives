"use strict";
function MoneyF(amount) {
    this.amount = amount;
}
MoneyF.prototype.get = function () {
    return this.amount;
};
function ZlotyF(amount) {
    MoneyF.call(this, amount);
}
function DollarF(money, rate) {
    if (money instanceof MoneyF) {
        const { amount } = money;
        MoneyF.call(this, amount);
        this.money = money;
        this.setMod(rate);
    }
    else {
        this.amount = money;
    }
}
DollarF.prototype = MoneyF.prototype;
DollarF.prototype.setMod = function (rate) {
    this.rate = rate;
    this.amount = Math.floor((this.money.amount * 10) / this.rate) / 10;
    return this;
};
const zl = new MoneyF(100);
console.log(zl);
const dollar = new DollarF(zl, 75);
console.log(dollar);
console.log(dollar.setMod(80).get());
