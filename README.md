# StorageNamespace

## Install

```bash
npm install storagens
# or
yarn add storagens
```

## Using

### Create instance

```js
import { LocalStorage, SessionStorage } from "storagens";

const localStorage = new LocalStorage();
const sessionStorage = new SessionStorage();

// set namespace
const userLocalStorage = new LocalStorage("user");
const userSessionStorage = new SessionStorage("user");
```

### Set value

```js
userLocalStorage.set("name", "Bean"); // => void
// user.name: "{\"value\":\"Bean\",\"updateTime\":1623985976434,\"expireTime\":0}"
// expireTime default：0
```

### Set value and set expireTime

```js
userLocalStorage.set(
  "token",
  "A8515509F42D80553AE2495DCDBFE9A7",
  Date.now() + 864e5
); // => void
// user.token: "{\"value\":\"A8515509F42D80553AE2495DCDBFE9A7\",\"updateTime\":1623986348117,\"expireTime\":1624072748116}"
```

### Get data by key

```js
userLocalStorage.get("name"); // => {value: "Bean", updateTime: 1623986570960, expireTime: 0}
```

### Get value by key

```js
userLocalStorage.getValue("name"); // => Bean
```

### Get all data

```js
userLocalStorage.all(); // => {name: {value: "Bean", updateTime: 1623987036202, expireTime: 0}, token: {value: "A8515509F42D80553AE2495DCDBFE9A7", updateTime: 1623987036203, expireTime: 1624073436202}}
```

### Get all values

```js
userLocalStorage.allValues(); // => {name: "Bean", token: "A8515509F42D80553AE2495DCDBFE9A7"}
```

### Check if the key exists in the storage

```js
userLocalStorage.has("name"); // => true
userLocalStorage.has("age"); // => false
```

### Check if the key has expired

```js
userLocalStorage.expired("token"); // => boolean
```

### Clear all expired data

```js
userLocalStorage.clearExpired(); // => number
```

### Delete one data by key

```js
userLocalStorage.delete("name"); // => void
```

### Clear all data

```js
userLocalStorage.clear(); // => void
```
