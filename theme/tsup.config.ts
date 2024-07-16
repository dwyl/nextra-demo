// Can't find 'tsup' but it runs correctly (for some reason). This may be an issue with how the workspace is define.
// @ts-ignore
import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'nextra-theme-docs',
  entry: ['src/index.tsx'],
  format: 'esm',
  dts: true,
  external: ['nextra'],
  outExtension: () => ({ js: '.js' })
})
