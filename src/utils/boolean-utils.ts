// 布尔工具函数
const trueSet = new Set([true, 'true']);
const falseSet = new Set([
  false,
  'false',
  undefined,
  null,
  'undefined',
  'null',
]);
export function parseBoolean(value: any): boolean {
  if (trueSet.has(value)) {
    return true;
  }
  if(falseSet.has(value)){
    return false
  }
  return !!value
}
export function and(array: (boolean | undefined)[] = []): boolean {
  if (!array.length) {
    return false;
  }
  return array.map(parseBoolean).reduce(
    (previousValue, currentValue) => previousValue && currentValue,
    true
  );
}

export function or(array: (boolean | undefined)[] = []): boolean {
  if (!array.length) {
    return false;
  }
  return array.map(parseBoolean).reduce(
    (previousValue, currentValue) => previousValue || currentValue,
    false
  );
}


