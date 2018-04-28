# to-cache

[![NPM version](https://img.shields.io/npm/v/to-cache.svg)](https://www.npmjs.com/package/to-cache)
[![Build Status](https://travis-ci.org/shalldie/to-cache.svg?branch=master)](https://travis-ci.org/shalldie/to-cache)

Just to cache.

# Installation

    npm install to-cache

# Usage

```js
// var cache = window.toCache;
// const cache = require('to-cache');
import cache from 'to-cache';

cache.set(
    'userInfo',
    {
        name: 'tom',
        age: 12
    },
    1000
);

console.log(cache.get('userInfo').name); // 'tom'

setTimeout(() => {
    console.log(cache.get('userInfo')); // null
}, 1001);

// a new instance.
let newCache = new cache.Cache();
// ... balabala
```

# API

```js
/**
 * 是否包含某缓存
 *
 * @param {string} key 缓存的key
 * @returns {boolean}
 * @memberof Cache
 */
has(key: string): boolean;
/**
 * 根据key获取缓存值
 *
 * @param {string} key 缓存的key
 * @returns {any}
 * @memberof Cache
 */
get(key: string): any;
/**
 * 从缓存获取数据，如果不存在，则通过方法获取并缓存
 *
 * @param {string} key 缓存的key
 * @param { ()=> Promise<any> } fn 生成缓存的回掉
 * @param {number} [expires=0] 有效期
 * @returns {Promise<any>}
 * @memberof Cache
 */
getAndCache(key: string, fn: ()=> Promise<any>, expires?: number): any;
/**
 * 设置缓存数据
 *
 * @param {string} key 缓存的key
 * @param {any} value 缓存的值
 * @param {number} [expires=0] 有效期
 * @memberof Cache
 */
set(key: string, value: any, expires?: number): void;
/**
 * 根据key删除缓存
 *
 * @param {string} key 缓存的key
 * @returns {boolean}
 * @memberof Cache
 */
del(key: string): boolean;
/**
 * 获取所有缓存的key
 *
 * @returns {Array<string>}
 * @memberof Cache
 */
keys(): string[];
/**
 * 获取缓存数量
 *
 * @returns {number}
 * @memberof Cache
 */
size(): number;
/**
 * 清空所有缓存
 *
 * @memberof Cache
 */
clear(): void;
/**
 * 获取缓存的构造函数
 *
 * @memberof Cache
 */
Cache: typeof Cache;
```

# Enjoy it.

\>\_<#@!
