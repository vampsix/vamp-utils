import dayjs from "dayjs";
export declare function formatDateTime(date: dayjs.ConfigType, template?: string): string;
export declare function formatDate(date: dayjs.ConfigType, template?: string): string;
/**
 * 设置date的时间为23:59:59
 * @param date
 */
export declare function endTimeOfDate(date?: dayjs.ConfigType): Date;
export declare function startTimeOfDay(date?: dayjs.ConfigType): Date;
