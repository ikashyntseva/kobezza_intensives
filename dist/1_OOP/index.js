"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectCreate3 = exports.objectCreate2 = exports.objectCreate = exports.User2 = exports.User = exports.addToString = exports.addFilterMap = exports.addCapitalize = void 0;
const addCapitalize = function () {
    if (!String.prototype.capitalize) {
        String.prototype.capitalize = function () {
            return this[0]?.toUpperCase() + this.slice(1);
        };
    }
};
exports.addCapitalize = addCapitalize;
const addFilterMap = function () {
    if (!Array.prototype.filterMap) {
        Array.prototype.filterMap = function filterMap(filterCb, mapCb) {
            const res = [];
            for (const [i, el] of this.entries()) {
                if (filterCb(el, i, this)) {
                    res.push(mapCb(el, i, this));
                }
            }
            return res;
        };
    }
};
exports.addFilterMap = addFilterMap;
const addToString = function (arr) {
    const defToString = arr.toString;
    arr.toString = function () {
        return this.length <= 1
            ? defToString.call(this)
            : `${this[0]}..${this.at(-1)}`;
    };
    return arr;
};
exports.addToString = addToString;
function User(name, surname, age) {
    if (new.target !== User) {
        throw new Error("You should use this function with new");
    }
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
const objectCreate2 = (proto, propertiesObject) => Object.setPrototypeOf({
    ...propertiesObject,
}, proto);
exports.objectCreate2 = objectCreate2;
const objectCreate3 = function (proto) {
    function tmp() { }
    tmp.prototype = proto;
    return new tmp();
};
exports.objectCreate3 = objectCreate3;
