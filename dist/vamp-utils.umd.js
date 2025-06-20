(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vampUtils = {}));
})(this, (function (exports) { 'use strict';

    /**
     * 生成随机整数
     * @param min 最小值
     * @param max 最大值
     * @returns 随机整数
     */
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * 格式化金额
     * @param amount 金额数字
     * @param symbol 货币符号
     * @returns 格式化后的字符串
     */
    function formatMoney(amount, symbol = '¥') {
        // 处理无效数值
        if (isNaN(amount) || !isFinite(amount)) {
            return `${symbol}0.00`;
        }
        // 处理负数
        const isNegative = amount < 0;
        const absoluteValue = Math.abs(amount);
        // 格式化为两位小数
        const parts = absoluteValue.toFixed(2).split('.');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const decimalPart = parts[1];
        return `${isNegative ? '-' : ''}${symbol}${integerPart}.${decimalPart}`;
    }
    /**
     * 深拷贝对象
     * @param obj 要拷贝的对象
     * @returns 深拷贝后的对象
     */
    function deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    /**
     * 防抖函数
     * @param fn 要执行的函数
     * @param delay 延迟时间(ms)
     * @returns 防抖函数
     */
    // 更新 debounce 函数声明
    function debounce(fn, delay = 300) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    exports.debounce = debounce;
    exports.deepClone = deepClone;
    exports.formatMoney = formatMoney;
    exports.randomInt = randomInt;

}));
