import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageType {

    /**
     * Session storage, which maintained while the browser is opened.
     */
    Session,

    /**
     * Local storage, which maintained even when the browser is closed.
     */
    Local,

}

export class CachedStorage<TValue, TStore = TValue> {

    private cachedValue: TValue | undefined;
    private readonly key: string;
    private readonly storage: Storage | undefined;
    private readonly toStore: ((value: TValue) => TStore) | undefined;
    private readonly toValue: ((store: TStore) => TValue) | undefined;

    public constructor({
        key,
        toStore,
        toValue,
        type,
    }: {
        key:        string;
        toStore?:   (value: TValue) => TStore;
        toValue?:   (store: TStore) => TValue;
        type:       StorageType;
    }) {
        this.key = key;
        if(type === StorageType.Session)
            this.storage = sessionStorage;
        else if(type === StorageType.Local)
            this.storage = localStorage;
        
        this.toStore = toStore;
        this.toValue = toValue;
    }

    private load() {
        const json = this.storage?.getItem(this.key);
        if(!json || json === 'undefined') {
            this.cachedValue = undefined;
            return;
        }
        const store = JSON.parse(json) as TStore;
        this.cachedValue = this.toValue ? this.toValue(store) : store as any;
    }

    public read() {
        if(this.cachedValue !== undefined)
            return this.cachedValue;
        this.load();
        return this.cachedValue;
    }

    private async readValueAsync() {
        const json = await AsyncStorage.getItem(this.key);
        if(json)
            this.cachedValue = JSON.parse(json);
        else
            this.cachedValue = undefined;
    }

    public async fetchValueAsync() {
        if(this.cachedValue !== undefined)
            return this.cachedValue;
        await this.readValueAsync();
        return this.cachedValue;
    }

    public hasValue() {
        return this.read() !== undefined;
    }

    public async hasValueAsync() {
        return (await this.fetchValueAsync()) !== undefined;
    }

    public async storeValueAsync(value: TValue) {
        const json = JSON.stringify(value);
        await AsyncStorage.setItem(this.key, json);
        this.cachedValue = value;
    }

    public write(value: TValue) {
        const store: TStore = this.toStore ? this.toStore(value) : value as any;
        const json = JSON.stringify(store);
        this.storage?.setItem(this.key, json);
        this.cachedValue = value;
    }

    public delete() {
        this.storage?.removeItem(this.key);
        this.cachedValue = undefined;
    }

}