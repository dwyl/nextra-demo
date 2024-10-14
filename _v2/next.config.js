
const withPlugins = require('next-compose-plugins');
const withNextra = require("nextra")({
  theme: "./theme/src/index.tsx",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true
});
const { withContentlayer } = require('next-contentlayer2');

module.exports = withPlugins([withNextra, withContentlayer]);
