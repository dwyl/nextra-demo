const withNextra = require("nextra")({
  theme: "./theme/src/index.tsx",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true
});

module.exports = withNextra();
