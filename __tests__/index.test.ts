import { randomInt, formatMoney, deepClone, debounce } from "../src/index";

describe("vamp-utils", () => {
  test("randomInt generates number in range", () => {
    const num = randomInt(5, 10);
    expect(num).toBeGreaterThanOrEqual(5);
    expect(num).toBeLessThanOrEqual(10);
  });

  test("formatMoney formats correctly", () => {
    expect(formatMoney(1234.56)).toBe("¥1,234.56");
    expect(formatMoney(1000, "$")).toBe("$1,000.00");
  });

  test("deepClone creates independent copy", () => {
    const obj = { a: 1, b: { c: 2 } };
    const clone = deepClone(obj);
    clone.b.c = 3;
    expect(obj.b.c).toBe(2);
  });

  test("debounce delays execution", (done) => {
    const mockFn = jest.fn();
    const debounced = debounce(mockFn, 100);

    debounced();
    debounced();
    debounced();

    expect(mockFn).not.toHaveBeenCalled();

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
      done();
    }, 200);
  });
});

import { exportToExcel } from "../src/utils/excel-utils";

const testData = [
  // { name: "Alice", age: 25 },
  // { name: "Bob", age: 30 },
  {
    boxCode: "11-1-2U000001",
    weight: 10,
    length: 10,
    width: 10,
    height: 10,
  },
];

try {
  exportToExcel({
    data: testData,
    // chineseHeader: ['姓名', '年龄'],
    // fieldMapping: ['name', 'age'],
    chineseHeader: ["箱码", "实重", "长", "宽", "高"],
    fieldMapping: ["boxCode", "weight", "length", "width", "height"],
    fileName: "test-export",
  });
  console.log("Export successful!");
} catch (error) {
  console.error("Export failed:", error);
}

// 布尔函数
