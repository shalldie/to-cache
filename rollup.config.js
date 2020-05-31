import { rollupGenerator } from '@nosaid/rollup';

export default rollupGenerator([
    {
        input: 'src/to-cache.ts', // 入口文件
        output: {
            name: 'toCache', // library 名称
            file: 'dist/to-cache.js', // 产出文件名
            format: 'umd' // umd 格式
        },
        typescript: true, // 是否使用 typescript，默认 false
        polyfill: false, // 是否需要 polyfill，默认 false
        uglify: false // 是否需要压缩，默认 false
    }
]);
