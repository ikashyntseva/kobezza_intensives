interface IMoney {
  amount: number;
  get: () => number;
}

interface IDollar {
  money?: IMoney;
  rate?: number;
  setMod: (rate: number) => IDollar;
}

function MoneyF(this: any, amount: number) {
  this.amount = amount;
}

MoneyF.prototype.get = function () {
  return this.amount;
};

function ZlotyF(this: any, amount: number) {
  MoneyF.call(this, amount);
}

function DollarF(this: any, amount: number): IDollar;
function DollarF(this: any, money: IMoney, rate: number): IDollar;
function DollarF(this: any, money: any, rate?: any): any {
  if (money instanceof MoneyF) {
    const { amount } = money as IMoney;

    MoneyF.call(this, amount);

    this.money = money;
    this.setMod(rate);
  } else {
    this.amount = money;
  }
}

DollarF.prototype = MoneyF.prototype;
DollarF.prototype.setMod = function (rate: number) {
  this.rate = rate;
  this.amount = Math.floor((this.money!.amount! * 10) / this.rate) / 10;

  return this;
};

// @ts-ignore
const zl = new MoneyF(100);
console.log(zl);
// @ts-ignore
const dollar = new DollarF(zl, 75);
console.log(dollar);
console.log(dollar.setMod(80).get());
