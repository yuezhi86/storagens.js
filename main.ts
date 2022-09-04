import {
  DataObject,
  DataType,
  Label,
  StorageInterface,
  StorageName,
  Values,
} from "./types";

class BaseStorage implements StorageInterface {
  readonly apiName: StorageName;
  readonly namespace: Label;

  constructor(apiName: StorageName, namespace: Label = "") {
    this.apiName = apiName;
    this.namespace = namespace;
  }

  set = (key: Label, value: any, expireTime = 0): void => {
    window[this.apiName].setItem(
      this._getKeyName(key),
      JSON.stringify({
        value,
        updateTime: Date.now(),
        expireTime,
      })
    );
  };

  all = (): DataObject => {
    const storageData = window[this.apiName];
    const keys = Object.keys(storageData);

    return keys.reduce((values: DataObject, key: string) => {
      if (this._hasKey(key)) {
        values[this._delNamespace(key)] = JSON.parse(storageData[key]);
      }
      return values;
    }, {});
  };

  allValues = (): any => {
    const all = this.all();
    const values: Values = {};

    for (let key in all) {
      if (!Object.prototype.hasOwnProperty.call(all, key)) continue;
      const item = all[key];

      if (item !== null) {
        values[this._delNamespace(key)] = item.value;
      }
    }

    return values;
  };

  get = (key: Label): DataType =>
    JSON.parse(window[this.apiName].getItem(this._getKeyName(key)) as string);

  getValue = (key: Label): any => {
    const value = this.get(key);
    if (value === null) return null;
    return value.value;
  };

  has = (key: Label): boolean => this._getKeyName(key) in window[this.apiName];

  delete = (key: Label): void => {
    window[this.apiName].removeItem(this._getKeyName(key));
  };

  clear = (): void => {
    Object.keys(this.all()).forEach((key) => {
      this.delete(key);
    });
  };

  expired = (key: Label): boolean => {
    const value = this.get(key);
    if (value === null) return false;
    return value.expireTime > 0 && Date.now() > value.expireTime;
  };

  clearExpired = (): number => {
    let count = 0;
    const all = this.all();

    for (let key in all) {
      if (!Object.prototype.hasOwnProperty.call(all, key)) continue;
      const item = all[key];

      if (
        item !== null &&
        item.expireTime > 0 &&
        Date.now() > item.expireTime
      ) {
        count++;
        this.delete(key);
      }
    }

    return count;
  };

  protected _hasKey = (key: string): boolean => {
    const regx = this.namespace ? `^${this.namespace}\\.` : `^${key}$`;
    return new RegExp(regx).test(key);
  };

  protected _getKeyName = (key: Label): string => {
    return this.namespace ? `${this.namespace}.${key}` : `${key}`;
  };

  protected _delNamespace = (key: Label): string => {
    const keyStr = `${key}`;
    return this.namespace
      ? keyStr.replace(new RegExp(`^${this.namespace}\\.`), "")
      : keyStr;
  };
}

export class LocalStorage extends BaseStorage {
  constructor(namespace?: string) {
    super("localStorage", namespace);
  }
}

export class SessionStorage extends BaseStorage {
  constructor(namespace?: string) {
    super("sessionStorage", namespace);
  }
}
