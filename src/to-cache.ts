/**
 * 缓存模块
 *
 * @export
 * @class ToCache
 */
export class ToCache {
    /**
     * 存储所有缓存
     *
     * @private
     * @memberof ToCache
     */
    private _map: Record<string, { value: any; timer: number }> = {};

    /**
     * 是否包含某缓存
     *
     * @param {string} key 缓存的 key
     * @returns
     * @memberof ToCache
     */
    public has(key: string): boolean {
        return key in this._map;
    }

    /**
     * 根据key获取缓存值
     *
     * @template T
     * @param {string} key 缓存的 key
     * @returns
     * @memberof ToCache
     */
    get<T = any>(key: string) {
        if (this.has(key)) {
            return this._map[key].value as T;
        }
        return undefined;
    }

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
    getAndCache<T>(key: string, fn: () => Promise<T>, expires = 0) {
        if (!this.has(key)) {
            const fnp = fn();
            this.set(key, fnp, expires);
            fnp.catch(() => {
                this.del(key);
            });
        }

        return this.get(key);
    }

    /**
     * 设置缓存数据
     *
     * @param {string} key 缓存的key
     * @param {*} value 缓存的值
     * @param {number} [expires=0] 有效期
     * @memberof ToCache
     */
    set(key: string, value: any, expires = 0) {
        if (this.has(key)) {
            clearTimeout(this._map[key].timer);
        }

        this.del(key);

        this._map[key] = {
            value,
            timer: (expires > 0
                ? setTimeout(() => {
                      this.del(key);
                  }, expires)
                : 0) as number
        };
    }

    /**
     * 根据key删除缓存
     *
     * @param {string} key 缓存的key
     * @memberof ToCache
     */
    del(key: string) {
        clearTimeout(this._map[key]?.timer);
        delete this._map[key];
    }

    /**
     * 获取所有缓存的key
     *
     * @returns {string[]}
     * @memberof ToCache
     */
    keys(): string[] {
        return Object.keys(this._map);
    }

    /**
     * 获取缓存数量
     *
     * @returns {number}
     * @memberof ToCache
     */
    size(): number {
        return this.keys().length;
    }

    /**
     * 清空所有缓存
     *
     * @memberof ToCache
     */
    clear() {
        for (const key of this.keys()) {
            this.del(key);
        }
    }
}

export default new ToCache();
