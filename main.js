class AppStorage {
    constructor(key, options = {}) {
        this.key = key;
        this.storage = (options.storage === 'session') ? sessionStorage : localStorage;
        this.defaultValue = options.defaultValue ?? null;
    }
    get() {
        const value = this.storage.getItem(this.key);
        if (value === null) {
            return this.defaultValue;
        }
        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    }
    set(value) {
        this.storage.setItem(this.key, JSON.stringify(value));
    }
    clear() {
        this.storage.removeItem(this.key);
    }
    isEmpty() {
        const value = this.storage.getItem(this.key);
        return value == null;
    }
};

const names = new AppStorage('names', { storage: 'session' });
names.set('John'); // устанавливает значение для ключа names в localStorage;
console.log(names);
console.log(names.get()); // возвращает значение для ключа names в localStorage;
names.clear(); // очищает значение для ключа names в localStorage;
console.log(names.get());
names.isEmpty(); // вернет true если ключ names в localStorage имеет пустое значение (null || undefined);
names.set('Winston');
console.log(names.get());

const backrooms = new AppStorage('names', { storage: 'local' });
backrooms.set('Found Footage');
console.log(backrooms.get());
console.log(backrooms.storage);
console.log(sessionStorage);
console.log(localStorage);
backrooms.clear();
console.log(localStorage);