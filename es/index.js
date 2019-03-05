var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
/*
 * @Author: 李瑞鹿
 * @Date: 2019-02-19 11:31:59
 * @Last Modified by: 李瑞鹿
 * @Last Modified time: 2019-03-05 13:44:28
 */
import React from 'react';
import './index.css';
var CustomTable = /** @class */ (function (_super) {
    __extends(CustomTable, _super);
    function CustomTable(props) {
        var _this = _super.call(this, props) || this;
        _this.renderItem = function (data) {
            var labelWidth = _this.props.labelWidth; //默认120
            return React.createElement("div", { key: data.key, className: "custom-table-item", style: { flex: data.column || 1 } },
                React.createElement("div", { className: 'custom-table-item-label', style: { width: labelWidth || 120 } },
                    data.required && React.createElement("span", { className: 'custom-table-item-label-required' }, "*"),
                    data.label),
                React.createElement("div", { className: 'custom-table-item-value' }, data.value));
        };
        _this.resetColumn = function (column, globalColumn) {
            if (column === void 0) { column = 1; }
            return column > globalColumn ? globalColumn : column;
        };
        /**
         * dataSource 数据源
         * column global列数
         */
        _this.renderContent = function (dataSource, column) {
            var content = []; //用于保存内容的数组
            for (var i = 0, len = dataSource.length; i < len;) { //遍历数据源，进行渲染
                var item = dataSource[i]; //每一行的第一个元素
                item.column = _this.resetColumn(item.column, column);
                var columns = item.column; //用于保存 column 之和
                var index = [i]; //用于保存改行可以显示的元素所有下标
                var isExceed = false; //该行元素总列数是否已经超出全局列数
                for (var j = 1; j <= column; j++) { //遍历全局列数的数据
                    var nextItem = dataSource[i + j];
                    if (!nextItem || isExceed) { //当元素不存在或已经超出全局列数 则退出
                        continue;
                    }
                    nextItem.column = _this.resetColumn(nextItem.column, column);
                    columns += nextItem.column; //累加 列数
                    index.push(i + j);
                    if (columns > column) { //若该行元素总列数大于全局列数时，设置isExceed=true，减去该元素的列数，并将下标去除
                        isExceed = true;
                        columns -= nextItem.column;
                        index.pop();
                        continue;
                    }
                }
                i += index.length; //循环跳过当前行所有元素
                if (index.length < column && columns < column) { //若当前行元素列数之和小于全局列数时，进行补齐
                    for (var ii = 0, len_1 = column - columns; ii < len_1; ii++) {
                        index.push(i + '' + ii + '999');
                    }
                }
                content.push(React.createElement("div", { className: "custom-table-row", key: i + "-" + item.label }, index.map(function (it) { return _this.renderItem(__assign({}, dataSource[it] || {}, { key: it })); }))); //遍历添加改行每个元素
            }
            return content; //返回所有的数据
        };
        return _this;
    }
    CustomTable.prototype.render = function () {
        var _a = this.props, className = _a.className, dataSource = _a.dataSource, _b = _a.column, column = _b === void 0 ? 2 : _b;
        return React.createElement("div", { className: "custom-table-container " + (className || '') }, this.renderContent(dataSource, column));
    };
    return CustomTable;
}(React.Component));
export default CustomTable;
