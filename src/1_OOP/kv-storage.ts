// Необходимо написать класс KVStorage, который бы реализовывал базовый CRUD API для работы с локальным хранилищем.
// Первым параметром конструктор класса должен получать "движок" или "стратегию", где именно хранить данные.
// Движки следует хранить как статические свойства класса. Методы класса должны возвращать Promise.
// Следует реализовать 2 движка: localStorage и IndexedDB.

class LocalStorage {
  constructor() {}

  set(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  get(key: string): any {
    return localStorage.getItem(key);
  }
  getObjectStore() {}
  remove(key: string): any {
    return localStorage.removeItem(key);
  }
}

type DB = { dbName: string; dbStoreName: string };

class IndexedDB {
  // @ts-ignore
  #value?;
  storeName;
  db: any;

  constructor({ dbName, dbStoreName }: DB) {
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

  #getObjectStore(mode?: string) {
    var tx = this.db.transaction(this.storeName, mode);

    return tx.objectStore(this.storeName);
  }

  set(key: string, value: any) {
    const store = this.#getObjectStore("readwrite");

    store.add(value, key);
  }

  async get(key: string) {
    const store = this.#getObjectStore("readonly");
    const valueRequest = store.get(key);

    return new Promise((resolve) => {
      valueRequest.onsuccess = (ev: any) => {
        resolve(valueRequest.result);
      };
    });
  }

  remove() {
    const store = this.#getObjectStore("readwrite");
    store.clear();
  }
}

class KVStorage {
  static localStorage = new LocalStorage();
  static indexedDB: IndexedDB;

  #engine;

  constructor(engine: LocalStorage | IndexedDB) {
    this.#engine = engine;
  }

  set(key: string, value: any) {
    return Promise.resolve(this.#engine.set(key, JSON.stringify(value)));
  }

  async get(key: string) {
    return Promise.resolve(JSON.parse((await this.#engine.get(key)) ?? "null"));
  }

  remove(key: string) {
    return this.#engine.remove(key);
  }
}

KVStorage.indexedDB = new IndexedDB({
  dbName: "Test_Data_Base2",
  dbStoreName: "store1",
});
