# vamp-utils

# 工具函数中的依赖开发版本和项目依赖使用版本冲突时：
<!-- 调用的项目中的版本 -->
  "peerDependencies": {
    "dayjs": ">=1.10.7"
  },
  <!-- 工具函数中的开发版本 -->
  "dependencies": {
    "dayjs": "^1.11.13"
  }

  // 打包时rollup/webpack的外部依赖不将dayjs打包进去
  external: ["xlsx","dayjs","axios","dayjs"],
# 将文件导出名为'vamp-utils'
<!-- package.json -->
  "exports": {
    ".": {
      "import": "./dist/vamp-utils.esm.js",
      "require": "./dist/vamp-utils.cjs.js",
      "default": "./dist/vamp-utils.esm.js"
    },
    "./*": "./dist/*"
  }
  <!-- tsconfig.json -->
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "dist",
    "emitDeclarationOnly": true,
    "outDir": "dist"
  }
}
