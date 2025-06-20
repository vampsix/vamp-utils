export interface ExcelData {
    [key: string]: any;
}
export interface FieldMapping {
    [chineseField: string]: string;
}
export interface ImportParams {
    target: {
        files: File[];
    };
}
export interface ImportConfig<T = ExcelData> {
    fieldMapping: FieldMapping;
    callback: (data: T[]) => void;
}
export interface ExportConfig {
    data: ExcelData[];
    chineseHeader: string[];
    fieldMapping: string[];
    fileName: string;
}
