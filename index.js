/**
 * 缓存模块
 *
 * @class Cache
 */
class Cache {

    constructor() {
        this._map = {};
    }

    /**
     * 是否包含某缓存
     *
     * @param {string} key 缓存的key
     * @returns {boolean}
     * @memberof Cache
     */
    has(key) {
        return this._map.hasOwnProperty(key);
    }

    /**
     * 根据key获取缓存值
     *
     * @param {string} key 缓存的key
     * @returns {any}
     * @memberof Cache
     */
    get(key) {
        if (this.has(key)) {
            return this._map[key].value;
        }
        return null;
    }

    /**
     * 从缓存获取数据，如果不存在，则通过方法获取并缓存
     *
     * @param {string} key 缓存的key
     * @param {number} expires 有效期
     * @param {Function} fn 生成缓存的回掉
     * @returns {Promise<any>}
     * @memberof Cache
     */
    getAndCache(key, expires, fn) {
        if (this.has(key)) {
            return this.get(key);
        }
        return Promise.resolve(fn()).then(value => {
            this.set(key, value, expires);
            return value;
        });
    }

    /**
     * 设置缓存数据
     *
     * @param {string} key 缓存的key
     * @param {any} value 缓存的值
     * @param {number} [expires=0] 有效期
     * @memberof Cache
     */
    set(key, value, expires = 0) {
        this.del(key);
        let item = { value };
        if (expires > 0) {
            item.timer = setTimeout(() => {
                this.del(key);
            }, expires);
        }
        this._map[key] = item;
    }

    /**
     * 根据key删除缓存
     *
     * @param {string} key 缓存的key
     * @returns
     * @memberof Cache
     */
    del(key) {
        if (!this.has(key)) {
            return;
        }
        clearTimeout(this._map[key].timer);
        delete this._map[key];
    }
}

module.exports = new Cache();
