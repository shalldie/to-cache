(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.ToCache = void 0;
    /**
     * 缓存模块
     *
     * @export
     * @class ToCache
     */
    var ToCache = /** @class */ (function () {
        function ToCache() {
            /**
             * 存储所有缓存
             *
             * @private
             * @memberof ToCache
             */
            this._map = {};
        }
        /**
         * 是否包含某缓存
         *
         * @param {string} key 缓存的 key
         * @returns
         * @memberof ToCache
         */
        ToCache.prototype.has = function (key) {
            return key in this._map;
        };
        /**
         * 根据key获取缓存值
         *
         * @template T
         * @param {string} key 缓存的 key
         * @returns
         * @memberof ToCache
         */
        ToCache.prototype.get = function (key) {
            if (this.has(key)) {
                return this._map[key].value;
            }
            return undefined;
        };
        /**
         * 从缓存获取数据，如果不存在，则通过方法获取并缓存
         *
         * @template T
         * @param {string} key 缓存的 key
         * @param {() => Promise<T>} fn 如果缓存不存在，获取缓存的方法，返回 promise
         * @param {number} [expires=0] 过期时间，0表示永远
         * @returns
         * @memberof ToCache
         */
        ToCache.prototype.getAndCache = function (key, fn, expires) {
            var _this = this;
            if (expires === void 0) { expires = 0; }
            if (!this.has(key)) {
                var fnp = fn();
                this.set(key, fnp, expires);
                fnp["catch"](function () {
                    _this.del(key);
                });
            }
            return this.get(key);
        };
        /**
         * 设置缓存数据
         *
         * @param {string} key 缓存的key
         * @param {*} value 缓存的值
         * @param {number} [expires=0] 有效期
         * @memberof ToCache
         */
        ToCache.prototype.set = function (key, value, expires) {
            var _this = this;
            if (expires === void 0) { expires = 0; }
            if (this.has(key)) {
                clearTimeout(this._map[key].timer);
            }
            this.del(key);
            this._map[key] = {
                value: value,
                timer: (expires > 0
                    ? setTimeout(function () {
                        _this.del(key);
                    }, expires)
                    : 0)
            };
        };
        /**
         * 根据key删除缓存
         *
         * @param {string} key 缓存的key
         * @memberof ToCache
         */
        ToCache.prototype.del = function (key) {
            var _a;
            clearTimeout((_a = this._map[key]) === null || _a === void 0 ? void 0 : _a.timer);
            delete this._map[key];
        };
        /**
         * 获取所有缓存的key
         *
         * @returns {string[]}
         * @memberof ToCache
         */
        ToCache.prototype.keys = function () {
            return Object.keys(this._map);
        };
        /**
         * 获取缓存数量
         *
         * @returns {number}
         * @memberof ToCache
         */
        ToCache.prototype.size = function () {
            return this.keys().length;
        };
        /**
         * 清空所有缓存
         *
         * @memberof ToCache
         */
        ToCache.prototype.clear = function () {
            for (var _i = 0, _a = this.keys(); _i < _a.length; _i++) {
                var key = _a[_i];
                this.del(key);
            }
        };
        return ToCache;
    }());
    exports.ToCache = ToCache;
    exports["default"] = new ToCache();
});
