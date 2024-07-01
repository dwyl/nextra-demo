const withNextra = require("nextra")({
  theme: "./theme/src/index.tsx",
  themeConfig: "./theme.config.jsx",
  defaultShowCopyCode: true
});

module.exports = withNextra();
