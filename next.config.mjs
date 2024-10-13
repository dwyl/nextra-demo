
import withPlugins from 'next-compose-plugins';
import { withContentlayer } from 'next-contentlayer2';
import nextra from 'nextra'


const withNextra = nextra({
  theme: "./theme/src/index.tsx",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true
})

 
export default withPlugins([withNextra, withContentlayer]);