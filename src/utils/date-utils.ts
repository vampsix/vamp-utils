import dayjs from "dayjs";
// import * as dayjs from 'dayjs';

export function formatDateTime(
  date: dayjs.ConfigType, 
  template: string = 'YYYY-MM-DD HH:mm:ss'
): string {
  if (!date) return '';
  return dayjs(date).format(template);
}

export function formatDate(
  date: dayjs.ConfigType, 
  template: string = 'YYYY-MM-DD'
): string {
  if (!date) return '';
  return dayjs(date).format(template);
}

/**
 * 设置date的时间为23:59:59
 * @param date
 */
export function endTimeOfDate(date: dayjs.ConfigType = new Date()): Date {
  return dayjs(date).endOf('day').toDate();
}

export function startTimeOfDay(date: dayjs.ConfigType = new Date()): Date {
  return dayjs(date).startOf('day').toDate();
}