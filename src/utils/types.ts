// Excel 数据类型定义
export interface ExcelData {
  [key: string]: any;
}

// 字段映射类型
export interface FieldMapping {
  [chineseField: string]: string;
}

// 导入参数类型
export interface ImportParams {
  target: {
    files: File[];
  };
}

// 导入配置类型
export interface ImportConfig<T = ExcelData> {
  fieldMapping: FieldMapping;
  callback: (data: T[]) => void;
}

// 导出配置类型
export interface ExportConfig {
  data: ExcelData[];
  chineseHeader: string[];
  fieldMapping: string[];
  fileName: string;
}

// 布尔工具函数类型
export declare function parseBoolean(value: any): boolean;
export declare function and(array?: (boolean | undefined)[]): boolean;
export declare function or(array?: (boolean | undefined)[]): boolean;

