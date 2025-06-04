export type Values = {
  [keyName: string]: any;
};
export type Label = string | number;
export type StorageName = "localStorage" | "sessionStorage";
export type DataType = {
  value: any;
  updateTime: number;
  expireTime: number;
} | null;
export type DataObject = {
  [keyName: string]: DataType;
};
export interface StorageInterface {
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
