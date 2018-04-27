import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

let name = 'to-cache.js';
let plugins = [
    babel({
        exclude: 'node_modules/**'
    })
];
if (process.env.NODE_ENV === 'production') {
    name = 'to-cache.min.js';
    plugins.push(uglify());
}

export default {
    input: './src/to-cache.js',
    output: {
        file: `./dist/${name}`,
        format: 'umd',
        name: 'toCache'
    },
    plugins
};
