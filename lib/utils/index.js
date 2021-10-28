"use strict";
/**
 * 判断值是否为空
 * value 需要判断的值
 * fuzzy 是否是模糊匹配，默认为false，值必须为 undefined null '' 才会返回true，当fuzzy值为true时， 0 undefined null false '' '0' 等都会返回true
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatStringRender = exports.isEmpty = void 0;
exports.isEmpty = function (value, fuzzy, ignoreType) {
    if (fuzzy === void 0) { fuzzy = false; }
    if (ignoreType === void 0) { ignoreType = false; }
    if (!ignoreType && value !== null && (typeof value === 'object' || typeof value === 'function' || typeof value === 'symbol')) {
        throw (new SyntaxError('isEmpty参数类型错误'));
    }
    if (fuzzy) {
        return !!!value || (Array.isArray(value) ? value.length === 0 : Object.keys(value).length === 0);
    }
    return value === '' || value === undefined || value === null;
};
exports.formatStringRender = function (value, valueEmptyText, fuzzy) {
    if (valueEmptyText === void 0) { valueEmptyText = '-'; }
    if (fuzzy === void 0) { fuzzy = false; }
    return exports.isEmpty(value, fuzzy, true) ? valueEmptyText : value;
};
