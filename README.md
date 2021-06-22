# StorageNamespace

可以设置命名空间的 Storage

## 安装

```bash
npm install storagens
# or
yarn add storagens
```

## 用法

### 创建实例

```js
import { LocalStorage, SessionStorage } from "storagens";

// 不带命名空间的localStorage
const localStorage = new LocalStorage();

// 带命名空间的localStorage
const userLocalStorage = new LocalStorage("user");

// 不带命名空间的sessionStorage
const sessionStorage = new SessionStorage();

// 带命名空间的sessionStorage
const userSessionStorage = new SessionStorage("user");
```

### 写入数据

**JS 代码：**

```js
userLocalStorage.set("name", "Bean");
// user.name: "{\"value\":\"Bean\",\"updateTime\":1623985976434,\"expireTime\":0}"
// expireTime 默认：0
```

### 设置过期时间（Timestamp）

**JS 代码：**

```js
userLocalStorage.set(
  "token",
  "A8515509F42D80553AE2495DCDBFE9A7",
  Date.now() + 864e5
);
// user.token: "{\"value\":\"A8515509F42D80553AE2495DCDBFE9A7\",\"updateTime\":1623986348117,\"expireTime\":1624072748116}"
```

### 读取指定 key 数据

**JS 代码：**

```js
userLocalStorage.get("name");
// => {value: "Bean", updateTime: 1623986570960, expireTime: 0}
```

### 读取指定 key 的 value

**JS 代码：**

```js
userLocalStorage.getValue("name");
// => Bean
```

### 读取全部数据

**JS 代码：**

```js
userLocalStorage.all();
// => {name: {value: "Bean", updateTime: 1623987036202, expireTime: 0}, token: {value: "A8515509F42D80553AE2495DCDBFE9A7", updateTime: 1623987036203, expireTime: 1624073436202}}
```

### 读取全部 value 数据

**JS 代码：**

```js
userLocalStorage.allValue();
// => {name: "Bean", token: "A8515509F42D80553AE2495DCDBFE9A7"}
```

### 查看指定 key 是否存在

**JS 代码：**

```js
userLocalStorage.has("name");
// => true
userLocalStorage.has("age");
// => false
```

### 查看指定 key 是否过期

**JS 代码：**

```js
userLocalStorage.expired("token");
```

### 清空所有过期数据

**JS 代码：**

```js
userLocalStorage.clearExpired();
// => 0
```

### 删除指定 key 及 value

**JS 代码：**

```js
userLocalStorage.delete("name");
```

### 清空全部数据（只清空改命名空间下的数据）

**JS 代码：**

```js
userLocalStorage.clear();
```
