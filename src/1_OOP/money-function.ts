interface IMoney {
  value: number | IMoney;
  rate?: number;
}

function MoneyF(this: any, value: number | IMoney, rate?: number) {
  this.value = value;
  this.rate = rate;
}

MoneyF.prototype.get = function () {
  if (this.value instanceof MoneyF) {
    const money = this.value as IMoney;
    const amount = money.value as number;

    return amount * this.rate;
  }

  return this.value;
};

MoneyF.prototype.setMod = function (rate: number): IMoney {
  this.rate = rate;

  return this;
};

function ZlotyF(this: any, value: number | IMoney, rate?: number) {
  MoneyF.call(this, value, rate);
}

function DollarF(this: any, value: number | IMoney, rate?: number) {
  MoneyF.call(this, value, rate);
}

ZlotyF.prototype = MoneyF.prototype;
DollarF.prototype = MoneyF.prototype;

// @ts-ignore
const pln = new ZlotyF(100);
// @ts-ignore
const dol = new DollarF(pln, 0.25);

console.log(pln.get());
console.log(dol.get());
console.log(dol.setMod(0.5).get());
