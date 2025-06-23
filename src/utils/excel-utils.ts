import XLSX from 'xlsx';
// import * as XLSX from 'xlsx';
import { ExcelData, ExportConfig, FieldMapping, ImportParams } from './types';

/**
 * 处理 Excel 文件导入
 * @param evt 文件导入事件对象
 * @param fieldMapping 字段映射表 (中文字段 -> 英文字段)
 * @param callback 导入完成回调函数
 */
export const handleImport = <T = ExcelData>(
  evt: ImportParams,
  fieldMapping: FieldMapping,
  callback: (data: T[]) => void
): void => {
  const [file] = evt.target.files;
  if (!file) return;

  const reader = new FileReader();
  
  reader.onload = (loadEvent) => {
    if (!loadEvent.target) return;
    
    try {
      const data = loadEvent.target.result as ArrayBuffer;
      const workBook = XLSX.read(data, { type: 'buffer' });
      const [sheetName] = workBook.SheetNames;
      
      if (!sheetName) return;
      
      const sheet = workBook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {
        header: 0,
      });

      // 转换字段名
      const translatedData = jsonData.map((row) => {
        const newRow: Record<string, any> = {};
        for (const key in row) {
          if (fieldMapping[key]) {
            newRow[fieldMapping[key]] = row[key];
          }
        }
        return newRow as T;
      });

      callback(translatedData);
      
      // 清空文件输入
      const fileInput = evt.target as unknown as HTMLInputElement;
      fileInput.value = '';
      
    } catch (error) {
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
export const exportToExcel = (config: ExportConfig): void => {
  try {
    const { data, chineseHeader, fieldMapping, fileName } = config;

    // 准备 Excel 数据
    const excelData = data.map((row) => {
      return fieldMapping.map((field) => row[field] ?? '');
    });

    // 添加中文表头
    excelData.unshift(chineseHeader);

    // 创建工作表并导出
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
    
  } catch (error) {
    console.error('Excel导出错误:', error);
    throw new Error('Excel导出失败');
  }
};
