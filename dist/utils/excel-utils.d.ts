import { ExcelData, ExportConfig, FieldMapping, ImportParams } from './types';
/**
 * 处理 Excel 文件导入
 * @param evt 文件导入事件对象
 * @param fieldMapping 字段映射表 (中文字段 -> 英文字段)
 * @param callback 导入完成回调函数
 */
export declare const handleImport: <T = ExcelData>(evt: ImportParams, fieldMapping: FieldMapping, callback: (data: T[]) => void) => void;
/**
 * 导出数据到 Excel 文件
 * @param config 导出配置
 */
export declare const exportToExcel: (config: ExportConfig) => void;
