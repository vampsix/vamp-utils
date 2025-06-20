import { randomInt, formatMoney, deepClone, debounce } from '../index';

describe('vamp-utils', () => {
  test('randomInt generates number in range', () => {
    const num = randomInt(5, 10);
    expect(num).toBeGreaterThanOrEqual(5);
    expect(num).toBeLessThanOrEqual(10);
  });

  test('formatMoney formats correctly', () => {
    expect(formatMoney(1234.56)).toBe('¥1,234.56');
    expect(formatMoney(1000, '$')).toBe('$1,000.00');
  });

  test('deepClone creates independent copy', () => {
    const obj = { a: 1, b: { c: 2 } };
    const clone = deepClone(obj);
    clone.b.c = 3;
    expect(obj.b.c).toBe(2);
  });

  test('debounce delays execution', done => {
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