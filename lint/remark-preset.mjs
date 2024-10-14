import remarkMdx from "remark-mdx";
import remarkGfm from "remark-gfm";
import remarkLint from "remark-lint";
import remarkValidateLinks from "remark-validate-links";
import remarkLintNoDeadUrls from "remark-lint-no-dead-urls"

// This configuration file is meant to be used in `remark CLI` to check for warnings.
// This means that if any of these fail, the command still succeeds.
// See https://github.com/unifiedjs/unified-engine#options for the options.
const remarkPreset = {
  plugins: [
    // Support `mdx` and GFM
    remarkMdx, // https://mdxjs.com/packages/remark-mdx/
    remarkGfm, // https://github.com/remarkjs/remark-gfm

    // Introduce remark linting rules
    remarkLint,

    // Validating URLs
    remarkValidateLinks, // https://github.com/remarkjs/remark-validate-links
    remarkLintNoDeadUrls // https://github.com/remarkjs/remark-lint-no-dead-urls
  ],
  // Override `remark-stringify` rules when serializing text.
  // See https://github.com/remarkjs/remark/tree/main/packages/remark-stringify#options for options.
  settings: {
    emphasis: "_",
    strong: "*",
    bullet: "-",
  },
};

export default remarkPreset;
