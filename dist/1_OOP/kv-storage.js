"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexedDB = exports.LocalStorage = void 0;
class LocalStorage {
    constructor() { }
    set(key, value) {
        localStorage.setItem(key, value);
    }
    get(key) {
        return localStorage.getItem(key);
    }
    getObjectStore() { }
    remove(key) {
        return localStorage.removeItem(key);
    }
}
exports.LocalStorage = LocalStorage;
class IndexedDB {
    storeName;
    db;
    constructor({ dbName, dbStoreName }) {
        this.storeName = dbStoreName;
        const openRequest = window.indexedDB.open(dbName);
        openRequest.onsuccess = () => {
            this.db = openRequest.result;
        };
        openRequest.onupgradeneeded = (event) => {
            this.db = openRequest.result;
            this.db.createObjectStore(this.storeName);
        };
    }
    #getObjectStore(mode) {
        var tx = this.db.transaction(this.storeName, mode);
        return tx.objectStore(this.storeName);
    }
    set(key, value) {
        const store = this.#getObjectStore("readwrite");
        store.add(value, key);
    }
    async get(key) {
        const store = this.#getObjectStore("readonly");
        const valueRequest = store.get(key);
        return new Promise((resolve) => {
            valueRequest.onsuccess = (ev) => {
                resolve(valueRequest.result);
            };
        });
    }
    remove() {
        const store = this.#getObjectStore("readwrite");
        store.clear();
    }
}
exports.IndexedDB = IndexedDB;
class KVStorage {
    static localStorage = new LocalStorage();
    static indexedDB;
    #engine;
    constructor(engine) {
        this.#engine = engine;
    }
    set(key, value) {
        return Promise.resolve(this.#engine.set(key, JSON.stringify(value)));
    }
    async get(key) {
        return Promise.resolve(JSON.parse((await this.#engine.get(key)) ?? "null"));
    }
    remove(key) {
        return this.#engine.remove(key);
    }
}
class KVStorageB extends KVStorage {
    static #engine;
    static #privateBuffer = [];
    static storage(engine) {
        KVStorageB.#engine = engine;
        return {
            set(key, value) {
                KVStorageB.#privateBuffer.push({ key, value });
                return this;
            },
            create() {
                const storage = new KVStorage(KVStorageB.#engine);
                KVStorageB.#privateBuffer.forEach(({ key, value }) => {
                    storage.set(key, value);
                });
                return storage;
            },
        };
    }
    constructor(engine) {
        super(engine);
    }
}
KVStorage.indexedDB = new IndexedDB({
    dbName: "Test_Data_Base2",
    dbStoreName: "store1",
});
KVStorageB.localStorage = new LocalStorage();
KVStorageB.storage(KVStorageB.localStorage)
    .set("foo", { bla: 1 })
    .set("bar", { bla: 2 })
    .create();
