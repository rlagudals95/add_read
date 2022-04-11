"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
exports.__esModule = true;
exports.SquareComponent = void 0;
var component_1 = require("./component");
var SquareComponent = /** @class */ (function (_super) {
    __extends(SquareComponent, _super);
    function SquareComponent(SquareComponentOptions) {
        var initOptions = __assign(__assign({}, SquareComponent.defaultOptions), SquareComponentOptions);
        return _super.call(this, initOptions) || this;
    }
    Object.defineProperty(SquareComponent, "defaultOptions", {
        get: function () {
            return {
                container: document.createElement('div'),
                htmlString: '',
                x: 0,
                y: 0,
                cnt: 0
            };
        },
        enumerable: false,
        configurable: true
    });
    return SquareComponent;
}(component_1.BaseComponent));
exports.SquareComponent = SquareComponent;
