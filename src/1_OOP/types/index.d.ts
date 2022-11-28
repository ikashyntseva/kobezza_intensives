export {};

declare global {
  interface String {
    capitalize(): string;
  }

  interface Array<T> {
    filterMap(filterCb: (el: T) => boolean, mapCb: (el: T) => T): T[];
  }
}
