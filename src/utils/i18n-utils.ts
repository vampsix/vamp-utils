import { TranslateFunction, EmptyObject } from "./types";

/**
 * 翻译枚举
 * @param t 翻译函数
 * @param name i18n中定义的前缀名
 * @param enumValue 枚举
 */
export function translateEnum(
  t: TranslateFunction,
  name: string,
  enumValue: object
) {
  const result: EmptyObject = {};
  Object.keys(enumValue).forEach((key) => {
    result[key] = t(`enum.${name}.${key}`);
  });

  return result;
}
