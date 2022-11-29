// Необходимо сделать класс денег у которого входным параметром является количество денег.
// Также создать класс для Доллара, Евро и рубля, которые наследуются от денег.
// В качестве параметра конструктор доллара они смогут также принимать не только число,
// но и экземпляр другого класса дочернего от денег - в таком случае, вторым параметром можно будет передать курс конвертации.
// Курс конвертации можно менять с помощью метода.
// Задание нужно сделать 2-мя способами: с помощью ES6 class и с помощью функций.

class Money {
  amount = 0;

  constructor(amount: number) {
    this.amount = amount;
  }

  get() {
    return this.amount;
  }
}

class Zloty extends Money {
  constructor(amount: number) {
    super(amount);
  }
}

class Dollar extends Money {
  money?: Money;
  rate?: number;

  constructor(amount: number);
  constructor(money: Money, rate: number);
  constructor(money: Money | number , rate?: number) {
    if (money instanceof Money) {
      super(money.amount);
      this.money = money;
      this.rate = rate;
      this.amount = Math.floor(this.amount * 10 / this.rate!) / 10
    } else {
      super(money);
    }
  }
  setMod(rate: number) {
    this.rate = rate;
    this.amount = Math.floor(this.money!.amount! * 10 / this.rate) / 10;

    return this;
  }
}

const pln = new Zloty(100);
const dol = new Dollar(pln, 75);

console.log(dol);
console.log(dol.setMod(90).get());
