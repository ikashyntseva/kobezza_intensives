export {};

declare global {
  interface String {
    capitalize(): string;
  }

  interface Array<T> {
    filterMap(filterCb: (el: T) => boolean, mapCb: (el: T) => T): T[];
  }
}

declare class Money {
  amount: number;
  get(): number;
}

declare class Dollar {
  amount: number;
  money?: Money;
  rate?: number;
  constructor(amount: number);
  constructor(str: Money, rate: number);
}

declare interface IDollar {
  amount: number;
  money?: Money;
  rate?: number;
}
