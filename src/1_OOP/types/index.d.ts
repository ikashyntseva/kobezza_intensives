export {};

declare global {
  interface String {
    capitalize(): string;
  }

  interface Array<T> {
    filterMap(
      filterCb: (el: T, i: number, this: T[]) => boolean,
      mapCb: (el: T, i: number, this: T[]) => T
    ): T[];
  }
}

declare class Money {
  value: number | Money;
  rate?: number;
  get(): number;
  setMod(rate: number): Money;
}
