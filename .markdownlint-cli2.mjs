// @ts-check

const options = {
  config: {
    default: true,
    "relative-links": true,
    MD041: false,
    MD013: false,
    "no-inline-html": {
      // Add React components we want to allow here
      allowed_elements: ["LoginOrUserInfo", "Info"],
    },
  },
  globs: ["src/pages/**/*.{md,mdx}"],
  ignores: ["**/node_modules", "theme", "scripts"],
  customRules: ["markdownlint-rule-relative-links"],
};

export default options;