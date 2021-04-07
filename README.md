# to-cache

[![NPM version](https://img.shields.io/npm/v/to-cache.svg?logo=npm&style=flat-square)](https://www.npmjs.com/package/to-cache)
[![Build Status](https://img.shields.io/github/workflow/status/shalldie/to-cache/ci?label=build&logo=github&style=flat-square)](https://github.com/shalldie/to-cache/actions)

Just to cache.

# Installation

    npm install to-cache

# Usage

```js
// var toCache = window.toCache;
// const toCache = require('to-cache');
import toCache from 'to-cache';

toCache.set(
    'userInfo',
    {
        name: 'tom',
        age: 12
    },
    1000
);

console.log(toCache.get('userInfo').name); // 'tom'

setTimeout(() => {
    console.log(toCache.get('userInfo')); // undefined
}, 1001);

// from async function data
// ...
let asyncData = await toCache.getAndCache('asyncData', () => http.get('http://xxx'));
console.log(asyncData === await toCache.get('asyncData')); //  true

// a new instance.
let newCache = new toCache.ToCache();
// ... balabala
```

# API

```ts
/**
 * 缓存模块
 *
 * @class ToCache
 */
declare class ToCache {
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
    get<T>(key: string): T | undefined;
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
    getAndCache<T>(key: string, fn: () => Promise<T>, expires?: number): Promise<T>;
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
    /**
     * 原始构造函数
     *
     * @memberof ToCache
     */
    ToCache: typeof ToCache;
}
declare const _default: ToCache;
export default _default;
```

# Enjoy it.

\>\_<#@!
