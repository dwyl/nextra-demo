// @ts-check
const options = {

  // Overriding default configs
  config: {
    default: true,
    MD041: false,             // https://github.com/DavidAnson/markdownlint/blob/main/doc/md041.md
    MD013: false,             // https://github.com/DavidAnson/markdownlint/blob/main/doc/md013.md
    "no-inline-html": {
      // Add React components we want to allow here
      allowed_elements: ["LoginOrUserInfo", "Info"],
    },
    "relative-links": true,   // Setting the custom `markdownlint-reule-relative-links` rule
  },

  // Run the lint in the following directory
  globs: ["src/pages/**/*.{md,mdx}"],

  // Don't run lint in these directories
  ignores: ["**/node_modules", "theme", "scripts"],

  // Import custom rules
  customRules: ["markdownlint-rule-relative-links"],
};

export default options;