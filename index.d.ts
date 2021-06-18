import BaseStorage, {LocalStorage, SessionStorage} from "./main";

export type Label = string | number;
export type StorageName = "localStorage" | "sessionStorage";
export type DataType = {
  value: any;
  updateTime: number;
  expireTime: number;
} | null;

export type Values = {
  [keyName: string]: any;
};

export type DataObject = {
  [keyName: string]: DataType;
};

export interface StorageInterface {
  apiName: StorageName;
  namespace: Label;

  set(key: Label, value: any, expireTime?: number): void;
  all(): DataObject;
  allValue(): any;
  get(key: Label): DataType;
  getValue(key: Label): any;
  has(key: Label): boolean;
  delete(key: Label): void;
  clear(): void;
  expired(key: Label): boolean | null;
  clearExpired(): number;
}

export default BaseStorage;
export { LocalStorage, SessionStorage};
