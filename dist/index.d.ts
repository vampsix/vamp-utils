/**
 * 生成随机整数
 * @param min 最小值
 * @param max 最大值
 * @returns 随机整数
 */
export declare function randomInt(min: number, max: number): number;
/**
 * 格式化金额
 * @param amount 金额数字
 * @param symbol 货币符号
 * @returns 格式化后的字符串
 */
export declare function formatMoney(amount: number, symbol?: string): string;
/**
 * 深拷贝对象
 * @param obj 要拷贝的对象
 * @returns 深拷贝后的对象
 */
export declare function deepClone<T>(obj: T): T;
/**
 * 防抖函数
 * @param fn 要执行的函数
 * @param delay 延迟时间(ms)
 * @returns 防抖函数
 */
export declare function debounce(fn: (...args: any[]) => void, delay?: number): (this: any, ...args: any[]) => void;
export * from './utils/types';
export * from "./utils/excel-utils";
