export function randomString(expect = 16): string {
  let str = Math.random().toString(36).substring(2);
  while (str.length < expect) {
    str += Math.random().toString(36).substring(2);
  }
  return str.substring(0, expect);
}

/**
 * 切分string,默认以中英文逗号,空格,换号,制表符分割
 * @param value
 * @param regexp
 */
export function splitString(value: string, regexp = /[,|，|\t|\n|\r|\s]/): string[] {
  if (!value) {
    return [];
  }
  return value.split(regexp).filter(item => !!item);
}

export function addSeparator(url: string): string {
  if (url.startsWith('/')) {
    return url;
  }
  return `/${url}`;
}

export function normalizeNumber(num: number, length: number): string {
  const intValue = num.toFixed(0);
  if (intValue.length >= length) {
    return intValue;
  }
  const zeroLength = length - intValue.length;
  const zeros = new Array(zeroLength).fill(0).join('');
  return `${zeros}${intValue}`;
}

export const WithoutChineseTextRegexp = /^[^\u4e00-\u9fa5]*$/;

export function containsChineseText(str?: string): boolean {
  if (!str) {
    return true;
  }
  return !WithoutChineseTextRegexp.test(str);
}
