
import withPlugins from 'next-compose-plugins';
import { withContentlayer } from 'next-contentlayer2';
import nextra from 'nextra'
import path from 'node:path'

const sep = path.sep === '/' ? '/' : '\\\\'
const ALLOWED_SVG_REGEX = new RegExp(`theme${sep}src${sep}nextra_icons${sep}.+\\.svg$`)

const withNextra = nextra({
  theme: "./theme/src/index.tsx",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
})

 
export default withPlugins([withNextra({
//webpack(config) {
//  const fileLoaderRule = config.module.rules.find(rule =>
//    rule.test?.test?.('.svg')
//  )
//  fileLoaderRule.exclude = ALLOWED_SVG_REGEX
//
//  config.module.rules.push({
//    test: ALLOWED_SVG_REGEX,
//    use: ['@svgr/webpack']
//  })
//
//  return config
//},
}), withContentlayer]);