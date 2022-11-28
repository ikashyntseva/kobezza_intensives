"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectCreate = exports.User2 = exports.User = exports.addToString = exports.addFilterMap = exports.addCapitalize = void 0;
const addCapitalize = function () {
    if (!String.prototype.capitalize) {
        String.prototype.capitalize = function () {
            return this[0].toUpperCase() + this.slice(1);
        };
    }
};
exports.addCapitalize = addCapitalize;
const addFilterMap = function () {
    if (!Array.prototype.filterMap) {
        Array.prototype.filterMap = function filterMap(filterCb, mapCb) {
            return this.filter(filterCb).map(mapCb);
        };
    }
};
exports.addFilterMap = addFilterMap;
const addToString = function (arr) {
    const defToString = arr.toString;
    arr.toString = function () {
        return this.length <= 1
            ? defToString.call(this)
            : `${this[0]}..${[...this].pop()}`;
    };
    return arr;
};
exports.addToString = addToString;
function User(name, surname, age) {
    this.name = name;
    this.surname = surname;
    this.age = age;
}
exports.User = User;
User.prototype.has18 = function () {
    return this.age >= 18;
};
User.prototype.sayName = function () {
    return this.name + " " + this.surname;
};
function User2(user) {
    this.user = user;
}
exports.User2 = User2;
User2.prototype.has18 = function () {
    return this.user.age >= 18;
};
User2.prototype.sayName = function () {
    return this.user.fname + " " + this.user.lname;
};
const objectCreate = (proto, propertiesObject) => ({
    __proto__: proto,
    ...propertiesObject,
});
exports.objectCreate = objectCreate;
