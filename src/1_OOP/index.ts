// 1. Необходимо добавить все строкам в JavaScript метод capitalize, который делает первую букву в строке заглавной

export const addCapitalize = function () {
  if (!String.prototype.capitalize) {
    String.prototype.capitalize = function () {
      return this[0].toUpperCase() + this.slice(1);
    };
  }
};

// 2. Необходимо добавить все массивам в JavaScript метод filterMap, который принимает 2 функции: фильтр и map

export const addFilterMap = function () {
  if (!Array.prototype.filterMap) {
    Array.prototype.filterMap = function filterMap(filterCb, mapCb) {
      return this.filter(filterCb).map(mapCb);
    };
  }
};

// 3. Необходимо сделать конкретному массиву метод toString, который возвращает первый элемент .. последний.

export const addToString = function <T>(arr: T[]): T[] {
  const defToString = arr.toString;

  arr.toString = function () {
    return this.length <= 1
      ? defToString.call(this)
      : `${this[0]}..${[...this].pop()}`;
  };

  return arr;
}

// 4. Необходимо создать функцию-конструктор, которая создает пользователя с заданным именем (имя и фамилия) и возрастом.
// А также, необходимо определить функции, sayName (возвращает полное имя) и has18 (true, если есть 18)

export function User(this: any, name: string, surname: string, age: number) {
  this.name = name;
  this.surname = surname;
  this.age = age;
}

User.prototype.has18 = function () {
  return this.age >= 18;
};

User.prototype.sayName = function () {
  return this.name + " " + this.surname;
};

// 5. Необходимо создать функцию-конструктор, которая создает пользователя с заданным именем (имя и фамилия) и возрастом.
// А также, необходимо определить функции, sayName (возвращает полное имя) и has18 (true, если есть 18)

export type U = { fname: string; lname: string; age: number };

export function User2(this: any, user: U) {
  this.user = user;
}

User2.prototype.has18 = function () {
  return this.user.age >= 18;
};

User2.prototype.sayName = function () {
  return this.user.fname + " " + this.user.lname;
};

// 6. Необходимо написать аналог Object.create с использованием __proto__

export const objectCreate = (
  proto: object | null,
  propertiesObject?: object
) => ({
  __proto__: proto,
  ...propertiesObject,
});
