// rollup.config.js
const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs").default;
const typescript = require("@rollup/plugin-typescript").default;

module.exports = {
  input: "./src/index.ts",
  output: [
    {
      format: "cjs",
      file: "dist/vamp-utils.cjs.js",
      exports: "auto",
    },
    {
      format: "es",
      file: "dist/vamp-utils.esm.js",
    },
    {
      format: "umd",
      file: "dist/vamp-utils.umd.js",
      name: "vampUtils",
      sourcemap: true, // 添加 sourcemap
      globals: {
        xlsx: "XLSX", // 明确指定 xlsx 的全局变量名
      },
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: true, // 启用 TypeScript sourcemap
      exclude: ["node_modules/**"],
    }),
  ],
  external: ["xlsx"],
};
