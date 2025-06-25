export declare function randomString(expect?: number): string;
/**
 * 切分string,默认以中英文逗号,空格,换号,制表符分割
 * @param value
 * @param regexp
 */
export declare function splitString(value: string, regexp?: RegExp): string[];
export declare function addSeparator(url: string): string;
export declare function normalizeNumber(num: number, length: number): string;
export declare const WithoutChineseTextRegexp: RegExp;
export declare function containsChineseText(str?: string): boolean;
