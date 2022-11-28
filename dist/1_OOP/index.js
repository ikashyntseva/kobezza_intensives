"use strict";
function addCapitalize() {
    if (!String.prototype.capitalize) {
        String.prototype.capitalize = function () {
            return this[0].toUpperCase() + this.slice(1);
        };
    }
}
function addFilterMap() {
    if (!Array.prototype.filterMap) {
        Array.prototype.filterMap = function filterMap(filterCb, mapCb) {
            return this.filter(filterCb).map(mapCb);
        };
    }
}
function addToString(arr) {
    const defToString = arr.toString;
    arr.toString = function () {
        return this.length <= 1
            ? defToString.call(this)
            : `${this[0]}..${[...this].pop()}`;
    };
    return arr;
}
