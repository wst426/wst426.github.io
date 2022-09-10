import typescript from '@rollup/plugin-typescript';

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
    input: "src/ts/index.ts",
    output: {
        file: "docs/origin.umd.js",
        format: "umd",
        name: "origin"
    },
    plugins: [typescript({
        target: "ES5"
    })]
}