/**
 * 判断值是否为空
 * value 需要判断的值
 * fuzzy 是否是模糊匹配，默认为false，值必须为 undefined null '' 才会返回true，当fuzzy值为true时， 0 undefined null false '' '0' 等都会返回true
 */
export declare const isEmpty: (value: string | number | boolean | undefined | null, fuzzy?: boolean, ignoreType?: boolean) => boolean;
export declare const formatStringRender: (value: string | number | boolean | undefined | null, valueEmptyText?: string, fuzzy?: boolean) => import("classnames").Value;
