"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: 李瑞鹿
 * @Date: 2019-02-19 11:31:59
 * @Last Modified by: 李瑞鹿
 * @Last Modified time: 2019-03-05 13:44:28
 */
var react_1 = require("react");
var classnames_1 = require("classnames");
var utils_1 = require("./utils");
require("./index.less");
var CustomTable = function (props) {
    var labelWidth = props.labelWidth, _a = props.labelAlias, labelAlias = _a === void 0 ? 'label' : _a, _b = props.valueAlias, valueAlias = _b === void 0 ? 'value' : _b, _c = props.valueEmptyText, valueEmptyText = _c === void 0 ? '-' : _c, border = props.border;
    var renderItem = react_1.useCallback(function (data) {
        var _a = data.hasLabel, hasLabel = _a === void 0 ? true : _a;
        // console.log(data.key)
        return react_1.default.createElement("div", { key: data.key, className: classnames_1.default('lirl-custom-table-item', { 'lirl-custom-table-item-no-border': !border }, data.className), style: __assign({ flex: data.column || 1 }, data.style) },
            hasLabel && react_1.default.createElement("div", { className: classnames_1.default('lirl-custom-table-item-label', { 'lirl-custom-table-item-label-required': !data.isEmpty && data.required, 'lirl-custom-table-item-label-none': !data[labelAlias] }), style: { width: labelWidth } }, data.isEmpty ? '' : data[labelAlias]),
            react_1.default.createElement("div", { className: 'lirl-custom-table-item-value' }, data.isEmpty ? '' : data[labelAlias] ? utils_1.formatStringRender(data[valueAlias], '-') : valueEmptyText));
    }, [props]);
    var resetColumn = react_1.useCallback(function (column, globalColumn) {
        if (column === void 0) { column = 1; }
        return column > globalColumn ? globalColumn : column;
    }, []);
    var renderContent = react_1.useCallback(function (dataSource, column) {
        var content = []; //用于保存内容的数组
        var _loop_1 = function (i, len) {
            var item = dataSource[i]; //每一行的第一个元素
            if (item.show === false) {
                i++;
                return out_i_1 = i, "continue";
            }
            item.column = resetColumn(item.column, column);
            var columns = item.column; //用于保存 column 之和
            var index = [i]; //用于保存改行可以显示的元素所有下标
            var isExceed = false; //该行元素总列数是否已经超出全局列数
            // let num = 0;
            for (var j = 1; j <= column; j++) { //遍历全局列数的数据
                // num ++;
                var nextItem = dataSource[i + j];
                if (!nextItem || isExceed || nextItem.show === false) { //当元素不存在或已经超出全局列数 则退出
                    continue;
                }
                nextItem.column = resetColumn(nextItem.column, column);
                columns += nextItem.column; //累加 列数
                index.push(i + j);
                if (columns > column) { //若该行元素总列数大于全局列数时，设置isExceed=true，减去该元素的列数，并将下标去除
                    isExceed = true;
                    columns -= nextItem.column;
                    index.pop();
                    continue;
                }
            }
            // console.log(num, index.length)
            i += index.length; //循环跳过当前行所有元素
            if (index.length < column && columns < column) { //若当前行元素列数之和小于全局列数时，进行补齐
                for (var ii = 0, len_1 = column - columns; ii < len_1; ii++) {
                    index.push(i + '' + ii + '999');
                }
            }
            content.push(react_1.default.createElement("div", { className: 'lirl-custom-table-row', key: i + "-" + (item.labelAlias || item.label) }, index.map(function (it) { return renderItem(__assign(__assign({}, dataSource[it] || {}), { key: i + " - " + it })); }))); //遍历添加改行每个元素
            out_i_1 = i;
        };
        var out_i_1;
        for (var i = 0, len = dataSource.length; i < len;) {
            _loop_1(i, len);
            i = out_i_1;
        }
        return content; //返回所有的数据
    }, []);
    return react_1.default.createElement("div", { className: classnames_1.default('lirl-custom-table-container', { 'lirl-custom-table-container-no-border': !border }, props.className), style: props.style }, renderContent(props.dataSource, props.columns));
};
CustomTable.defaultProps = {
    labelWidth: 136,
    labelAlias: 'label',
    valueAlias: 'value',
    border: true,
};
exports.default = CustomTable;
