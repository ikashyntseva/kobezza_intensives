// Необходимо сделать класс денег у которого входным параметром является количество денег.
// Также создать класс для Доллара, Евро и рубля, которые наследуются от денег.
// В качестве параметра конструктор доллара они смогут также принимать не только число,
// но и экземпляр другого класса дочернего от денег - в таком случае, вторым параметром можно будет передать курс конвертации.
// Курс конвертации можно менять с помощью метода.
// Задание нужно сделать 2-мя способами: с помощью ES6 class и с помощью функций.

class Money {
  value;
  rate?;

  constructor(value: number | Money, rate?: number) {
    this.value = value;
    this.rate = rate;
  }

  get() {
    if (this.value instanceof Money) {
      const money = this.value as Money;
      const amount = money.value as number;

      return amount * this.rate!;
    }

    return this.value;
  }

  setMod(rate: number) {
    this.rate = rate;

    return this;
  }
}

class Zloty extends Money {}

class Dollar extends Money {}

// const pln = new Zloty(100);
// const dol = new Dollar(pln, 0.25);

// console.log(pln.get());
// console.log(dol.get());
// console.log(dol.setMod(0.5).get());
