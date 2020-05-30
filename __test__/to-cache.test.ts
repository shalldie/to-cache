// const cache = require('../dist/to-cache');
import cache from '../src/to-cache';

describe('test cache.', () => {
    beforeEach(() => {
        cache.clear();
    });

    it('set(),get(),set() with expires', next => {
        cache.set('name', 'tom');
        expect(cache.get('name')).toEqual('tom');

        cache.set('age', 12, 500);
        expect(cache.get('age')).toEqual(12);

        setTimeout(() => {
            expect(cache.get('age')).toEqual(undefined);
            next();
        }, 501);
    });

    it('keys()', () => {
        cache.set('name', 'tom');
        cache.set('age', 12);
        expect(cache.keys()).toEqual(['name', 'age']);
    });

    it('has()', () => {
        cache.set('name', 'tom');
        expect(cache.has('name')).toEqual(true);
    });

    it('del()', () => {
        cache.set('name', 'tom');
        cache.del('name');
        expect(cache.has('name')).toEqual(false);
    });

    it('size()', () => {
        cache.set('name', 'tom');
        cache.set('age', 1);
        cache.set('age', 3);
        expect(cache.size()).toEqual(2);
    });

    it('clear()', () => {
        cache.set('name', 'tom');
        cache.set('age', 1);
        cache.set('age', 3);
        cache.clear();
        expect(cache.size()).toEqual(0);
    });

    it('getAndCache()', next => {
        cache.getAndCache(
            'name',
            function () {
                return new Promise(res => {
                    setTimeout(() => {
                        res('tom');
                    }, 100);
                });
            },
            400
        );

        setTimeout(async () => {
            expect(await cache.get('name')).toEqual('tom');
        }, 399);

        setTimeout(async () => {
            expect(await cache.get('name')).toEqual(undefined);
            next();
        }, 401);
    });
});
