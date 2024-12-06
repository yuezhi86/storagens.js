# StorageNS（可以设置命名空间的 Storage）

## 安装

```bash
npm install storagens
# or
yarn add storagens
```

## 使用

### 创建实例

```js
import { LocalStorage, SessionStorage } from "storagens";

const localStorage = new LocalStorage();
const sessionStorage = new SessionStorage();

// 设置命名空间
const userLocalStorage = new LocalStorage("user");
const userSessionStorage = new SessionStorage("user");
```

### 保存数据

```js
userLocalStorage.set("name", "Bean"); // => void
// user.name: "{\"value\":\"Bean\",\"updateTime\":1623985976434,\"expireTime\":0}"
// expireTime default：0
```

### 保存数据并设置过期时间

```js
userLocalStorage.set(
  "token",
  "A8515509F42D80553AE2495DCDBFE9A7",
  Date.now() + 864e5
); // => void
// user.token: "{\"value\":\"A8515509F42D80553AE2495DCDBFE9A7\",\"updateTime\":1623986348117,\"expireTime\":1624072748116}"
```

### 通过数据名称读取包装数据

```js
userLocalStorage.get("name"); // => {value: "Bean", updateTime: 1623986570960, expireTime: 0}
```

### 通过数据名称读取原始数据

```js
userLocalStorage.getValue("name"); // => Bean
```

### 读取全部包装数据

```js
userLocalStorage.all(); // => {name: {value: "Bean", updateTime: 1623987036202, expireTime: 0}, token: {value: "A8515509F42D80553AE2495DCDBFE9A7", updateTime: 1623987036203, expireTime: 1624073436202}}
```

### 读取全部原始数据

```js
userLocalStorage.allValues(); // => {name: "Bean", token: "A8515509F42D80553AE2495DCDBFE9A7"}
```

### 通过数据名称检查数据是否存在

```js
userLocalStorage.has("name"); // => true
userLocalStorage.has("age"); // => false
```

### 通过数据名称检查数据是否已过期

```js
userLocalStorage.expired("token"); // => boolean
```

### 清除全部已过期数据

```js
userLocalStorage.clearExpired(); // => number
```

### 通过数据名称删除数据

```js
userLocalStorage.delete("name"); // => void
```

### 清空全部数据（只会清空属于该命名空间的数据）

```js
userLocalStorage.clear(); // => void
```
