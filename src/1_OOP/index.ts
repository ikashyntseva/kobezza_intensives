// 1. Необходимо добавить все строкам в JavaScript метод capitalize, который делает первую букву в строке заглавной

function addCapitalize() {
    if (!String.prototype.capitalize) {
      String.prototype.capitalize = function () {
        return this[0].toUpperCase() + this.slice(1);
      };
    }
  }
  
  // 2. Необходимо добавить все массивам в JavaScript метод filterMap, который принимает 2 функции: фильтр и map
  
  function addFilterMap() {
    if (!Array.prototype.filterMap) {
      Array.prototype.filterMap = function filterMap(filterCb, mapCb) {
        return this.filter(filterCb).map(mapCb);
      };
    }
  }
  
  // 3. Необходимо сделать конкретному массиву метод toString, который возвращает первый элемент .. последний.
  
  function addToString<T>(arr: T[]): T[] {
    const defToString = arr.toString;
  
    arr.toString = function () {
      return this.length <= 1
        ? defToString.call(this)
        : `${this[0]}..${[...this].pop()}`;
    };
  
    return arr;
  }
    