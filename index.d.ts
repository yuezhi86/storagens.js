type Label = string | number;
type StorageName = "localStorage" | "sessionStorage";
type DataType = {
    value: any;
    updateTime: number;
    expireTime: number;
} | null;
type DataObject = {
    [keyName: string]: DataType;
};
interface StorageInterface {
    readonly apiName: StorageName;
    readonly namespace: Label;
    set(key: Label, value: any, expireTime?: number): void;
    all(): DataObject;
    allValues(): any;
    get(key: Label, includeExpired?: boolean): DataType;
    getValue(key: Label, includeExpired?: boolean): any;
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
    allValues: () => any;
    get: (key: Label, includeExpired?: boolean) => DataType;
    getValue: (key: Label, includeExpired?: boolean) => any;
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
    constructor(namespace?: string);
}
declare class SessionStorage extends BaseStorage {
    constructor(namespace?: string);
}

export { LocalStorage, SessionStorage };
