"use strict";
function MoneyF(value, rate) {
    this.value = value;
    this.rate = rate;
}
MoneyF.prototype.get = function () {
    if (this.value instanceof MoneyF) {
        const money = this.value;
        const amount = money.value;
        return amount * this.rate;
    }
    return this.value;
};
MoneyF.prototype.setMod = function (rate) {
    this.rate = rate;
    return this;
};
function ZlotyF(value, rate) {
    MoneyF.call(this, value, rate);
}
function DollarF(value, rate) {
    MoneyF.call(this, value, rate);
}
ZlotyF.prototype = MoneyF.prototype;
DollarF.prototype = MoneyF.prototype;
const pln = new ZlotyF(100);
const dol = new DollarF(pln, 0.25);
console.log(pln.get());
console.log(dol.get());
console.log(dol.setMod(0.5).get());
