import core from "@actions/core";
import markdownLinkCheck from "markdown-link-check";
import { allDocuments } from "../.contentlayer/generated/index.mjs";

// String to tag internal links to be ignored when checking in `markdown-lint-check`
const ignoreURLTag = "#ignoreURL#";
const localhost = "http://localhost:3000";

const baseUrl = process.argv.find((arg) => arg.includes("--baseUrl"));
const allBody = allDocuments.map(({ body }) => body.raw).join("\n--- NEXT PAGE ---\n");

/**
 * This function checks external links that are present in the markdown files.
 * It checks if they're alive or dead using `markdown-lint-check`.
 */
function checkMarkdownExternalLinks() {
  // Options for `markdown-lint-check`.
  // It catches internal links and external links.
  const configOpts = {
    projectBaseUrl: baseUrl ? baseUrl.replace("--baseUrl=", "https://") : localhost,
    replacementPatterns: [
      // Match links like `[example](/example) and adding tag to later ignore
      {
        pattern: "^/",
        replacement: `${ignoreURLTag}{{BASEURL}}/`,
      },
      // Match links like `[example](./example) and adding tag to later ignore
      {
        pattern: "^./",
        replacement: `${ignoreURLTag}{{BASEURL}}/`,
      },
    ],
  };

  // Runs `markdown-link-check` only on external links.
  // If this step fails, check the output. You should find "input". It shows the link that caused the error.
  // Most likely the reason it's failing is because the link doesn't start with `./` or `/` (e.g. [example](index.md), instead of [example](./index.md)).
  markdownLinkCheck(allBody, configOpts, function (error, linkCheckresults) {
    try {
      if (error) throw new Error(error);

      // Filtering links for only external URLs
      const results = linkCheckresults.map((linkCheckResult) => ({ ...linkCheckResult }));
      const filteredResults = results.filter(function (item) {
        return !item.link.includes(ignoreURLTag);
      });

      // Iterate over URLs and log them
      filteredResults.forEach(({ link, status }) => {
        console.log("%s is %s", link, status === "dead" ? "dead 💀" : "alive 🥳");
      });

      // Check if there is any dead link in the filtered external URLs
      const hasDeadLink = filteredResults.find((result) => result.status.includes("dead"));
      if (hasDeadLink) {
        throw new Error("Dead link found.👆💀");
      } else {
        console.log("All links are valid! 🙌");
      }
    } catch (error) {
      core.setFailed(error.message);
    }
  });
}

checkMarkdownExternalLinks()