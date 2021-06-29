declare type Label = string | number;
declare type StorageName = "localStorage" | "sessionStorage";
declare type DataType = {
    value: any;
    updateTime: number;
    expireTime: number;
} | null;
declare type DataObject = {
    [keyName: string]: DataType;
};
interface StorageInterface {
    readonly apiName: StorageName;
    readonly namespace: Label;
    set(key: Label, value: any, expireTime?: number): void;
    all(): DataObject;
    allValue(): any;
    get(key: Label): DataType;
    getValue(key: Label): any;
    has(key: Label): boolean;
    delete(key: Label): void;
    clear(): void;
    expired(key: Label): boolean;
    clearExpired(): number;
}

declare class BaseStorage implements StorageInterface {
    readonly apiName: StorageName;
    readonly namespace: Label;
    constructor(apiName: StorageName, namespace?: Label);
    set: (key: Label, value: any, expireTime?: number) => void;
    all: () => DataObject;
    allValue: () => any;
    get: (key: Label) => DataType;
    getValue: (key: Label) => any;
    has: (key: Label) => boolean;
    delete: (key: Label) => void;
    clear: () => void;
    expired: (key: Label) => boolean;
    clearExpired: () => number;
    protected _hasKey: (key: string) => boolean;
    protected _getKeyName: (key: Label) => string;
    protected _delNamespace: (key: Label) => string;
}
declare class LocalStorage extends BaseStorage {
    constructor(namespace: string);
}
declare class SessionStorage extends BaseStorage {
    constructor(namespace: string);
}

export { LocalStorage, SessionStorage };
