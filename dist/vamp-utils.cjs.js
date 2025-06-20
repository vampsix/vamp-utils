'use strict';

var XLSX = require('xlsx');

/**
 * 处理 Excel 文件导入
 * @param evt 文件导入事件对象
 * @param fieldMapping 字段映射表 (中文字段 -> 英文字段)
 * @param callback 导入完成回调函数
 */
const handleImport = (evt, fieldMapping, callback) => {
    const [file] = evt.target.files;
    if (!file)
        return;
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
        if (!loadEvent.target)
            return;
        try {
            const data = loadEvent.target.result;
            const workBook = XLSX.read(data, { type: 'buffer' });
            const [sheetName] = workBook.SheetNames;
            if (!sheetName)
                return;
            const sheet = workBook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, {
                header: 0,
            });
            // 转换字段名
            const translatedData = jsonData.map((row) => {
                const newRow = {};
                for (const key in row) {
                    if (fieldMapping[key]) {
                        newRow[fieldMapping[key]] = row[key];
                    }
                }
                return newRow;
            });
            callback(translatedData);
            // 清空文件输入
            const fileInput = evt.target;
            fileInput.value = '';
        }
        catch (error) {
            console.error('Excel导入错误:', error);
            throw new Error('Excel文件处理失败');
        }
    };
    reader.onerror = () => {
        throw new Error('文件读取失败');
    };
    reader.readAsArrayBuffer(file);
};
/**
 * 导出数据到 Excel 文件
 * @param config 导出配置
 */
const exportToExcel = (config) => {
    try {
        const { data, chineseHeader, fieldMapping, fileName } = config;
        // 准备 Excel 数据
        const excelData = data.map((row) => {
            return fieldMapping.map((field) => { var _a; return (_a = row[field]) !== null && _a !== void 0 ? _a : ''; });
        });
        // 添加中文表头
        excelData.unshift(chineseHeader);
        // 创建工作表并导出
        const ws = XLSX.utils.aoa_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    }
    catch (error) {
        console.error('Excel导出错误:', error);
        throw new Error('Excel导出失败');
    }
};

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
exports.exportToExcel = exportToExcel;
exports.formatMoney = formatMoney;
exports.handleImport = handleImport;
exports.randomInt = randomInt;
