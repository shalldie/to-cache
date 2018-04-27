const cache = require('../dist/to-cache');
const expect = require('chai').expect;

describe('test cache.', function () {

    beforeEach(function () {
        cache.clear();
    });

    it('set(),get(),set() with expires', function (next) {
        cache.set('name', 'tom');
        expect(cache.get('name')).to.be.equal('tom');

        cache.set('age', 12, 500);
        expect(cache.get('age')).to.be.equal(12);

        setTimeout(() => {
            expect(cache.get('age')).to.be.equal(null);
            next();
        }, 501);
    });

    it('keys()', function () {
        cache.set('name', 'tom');
        cache.set('age', 12);
        expect(cache.keys()).to.deep.equal(['name', 'age']);
    });

    it('has()', function () {
        cache.set('name', 'tom');
        expect(cache.has('name')).to.be.equal(true);
    });

    it('del()', function () {
        cache.set('name', 'tom');
        cache.del('name');
        expect(cache.has('name')).to.be.equal(false);
    });

    it('size()', function () {
        cache.set('name', 'tom');
        cache.set('age', 1);
        cache.set('age', 3);
        expect(cache.size()).to.be.equal(2);
    });

    it('clear()', function () {
        cache.set('name', 'tom');
        cache.set('age', 1);
        cache.set('age', 3);
        cache.clear();
        expect(cache.size()).to.be.equal(0);
    });

    it('getAndCache()', function (next) {
        cache.getAndCache('name', function () {
            return new Promise(res => {
                setTimeout(() => {
                    res('tom');
                }, 100);
            })
        }, 400);

        setTimeout(() => {
            expect(cache.get('name')).to.be.equal('tom');
        }, 100 + 399);

        setTimeout(() => {
            expect(cache.get('name')).to.be.equal(null);
            next();
            // 额外加了10ms，少许误差
        }, 100 + 401 + 10);
    });

});
