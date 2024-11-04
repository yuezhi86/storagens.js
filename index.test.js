/**
 * @jest-environment jsdom
 */

const { LocalStorage } = require("./index");

describe("LocalStorage Test", () => {
  const testLocalStorage = new LocalStorage("testLocalStorage");
  const localStorage = new LocalStorage();

  beforeEach(() => {
    testLocalStorage.clear();
    localStorage.clear();
  });

  it("Set name and token", () => {
    testLocalStorage.set("name", "Bean");
    localStorage.set("name", "Bean2");
    expect(testLocalStorage.has("name")).toBe(true);
    expect(localStorage.has("name")).toBe(true);
    expect(testLocalStorage.getValue("name")).toBe("Bean");
    expect(testLocalStorage.get("name")).toMatchObject({ value: "Bean" });
    expect(testLocalStorage.allValues()).toMatchObject({ name: "Bean" });
    expect(testLocalStorage.all()).toMatchObject({ name: { value: "Bean" } });
    expect(localStorage.all()).toMatchObject({
      "testLocalStorage.name": { value: "Bean" },
      name: { value: "Bean2" },
    });
  });

  it("Test expired", () => {
    expect(testLocalStorage.expired("name")).toBe(false);
    testLocalStorage.set(
      "token",
      "A8515509F42D80553AE2495DCDBFE9A7",
      Date.now()
    );
    jest.useFakeTimers();
    jest.setSystemTime(Date.now() + 100);
    expect(testLocalStorage.clearExpired()).toBe(1);
  });

  it("Test delete", () => {
    testLocalStorage.delete("name");
    expect(testLocalStorage.has("name")).toBe(false);
  });
});
