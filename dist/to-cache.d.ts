/**
 * 缓存模块
 *
 * @export
 * @class ToCache
 */
export declare class ToCache {
    /**
     * 存储所有缓存
     *
     * @private
     * @memberof ToCache
     */
    private _map;
    /**
     * 是否包含某缓存
     *
     * @param {string} key 缓存的 key
     * @returns
     * @memberof ToCache
     */
    has(key: string): boolean;
    /**
     * 根据key获取缓存值
     *
     * @template T
     * @param {string} key 缓存的 key
     * @returns
     * @memberof ToCache
     */
    get<T = any>(key: string): T | undefined;
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
    getAndCache<T>(key: string, fn: () => Promise<T>, expires?: number): any;
    /**
     * 设置缓存数据
     *
     * @param {string} key 缓存的key
     * @param {*} value 缓存的值
     * @param {number} [expires=0] 有效期
     * @memberof ToCache
     */
    set(key: string, value: any, expires?: number): void;
    /**
     * 根据key删除缓存
     *
     * @param {string} key 缓存的key
     * @memberof ToCache
     */
    del(key: string): void;
    /**
     * 获取所有缓存的key
     *
     * @returns {string[]}
     * @memberof ToCache
     */
    keys(): string[];
    /**
     * 获取缓存数量
     *
     * @returns {number}
     * @memberof ToCache
     */
    size(): number;
    /**
     * 清空所有缓存
     *
     * @memberof ToCache
     */
    clear(): void;
}
declare const _default: ToCache;
export default _default;
