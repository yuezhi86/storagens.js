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

**JS Code：**

```js
userLocalStorage.set("name", "Bean"); // => void
// user.name: "{\"value\":\"Bean\",\"updateTime\":1623985976434,\"expireTime\":0}"
// expireTime default：0
```

### Set value and set expireTime

**JS Code：**

```js
userLocalStorage.set(
  "token",
  "A8515509F42D80553AE2495DCDBFE9A7",
  Date.now() + 864e5
); // => void
// user.token: "{\"value\":\"A8515509F42D80553AE2495DCDBFE9A7\",\"updateTime\":1623986348117,\"expireTime\":1624072748116}"
```

### Get data by key

**JS Code：**

```js
userLocalStorage.get("name"); // => {value: "Bean", updateTime: 1623986570960, expireTime: 0}
```

### Get value by key

**JS Code：**

```js
userLocalStorage.getValue("name"); // => Bean
```

### Get all data

**JS Code：**

```js
userLocalStorage.all(); // => {name: {value: "Bean", updateTime: 1623987036202, expireTime: 0}, token: {value: "A8515509F42D80553AE2495DCDBFE9A7", updateTime: 1623987036203, expireTime: 1624073436202}}
```

### Get all values

**JS Code：**

```js
userLocalStorage.allValues(); // => {name: "Bean", token: "A8515509F42D80553AE2495DCDBFE9A7"}
```

### Check if the key exists in the storage

**JS Code：**

```js
userLocalStorage.has("name"); // => true
userLocalStorage.has("age"); // => false
```

### Check if the key has expired

**JS Code：**

```js
userLocalStorage.expired("token"); // => boolean
```

### Clear all expired data

**JS Code：**

```js
userLocalStorage.clearExpired(); // => number
```

### Delete one data by key

**JS Code：**

```js
userLocalStorage.delete("name"); // => void
```

### Clear all data

**JS Code：**

```js
userLocalStorage.clear(); // => void
```
