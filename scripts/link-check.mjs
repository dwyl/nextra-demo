import core from "@actions/core";
import markdownLinkCheck from "markdown-link-check";
import { allDocuments } from "../.contentlayer/generated/index.mjs";

// String to tag internal links to be ignored when checking in `markdown-lint-check`
const ignoreURLTag = "#ignoreURL#";
const localhost = "http://localhost:3000";
const baseUrl = process.argv.find((arg) => arg.includes("--baseUrl"));

/**
 * This function checks external links that are present in the markdown files.
 * It checks if they're alive or dead using `markdown-lint-check`.
 * @param {string} markdownAllBody all of the markdowns text
 * @returns array of dead links
 */
export async function findDeadExternalLinksInMarkdown(markdownAllBody) {
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

  // Initialize the array to store dead links
  let deadLinks = [];

  // Runs `markdown-link-check` only on external links.
  // If this step fails, check the output. You should find "input". It shows the link that caused the error.
  // Most likely the reason it's failing is because the link doesn't start with `./` or `/` (e.g. [example](index.md), instead of [example](./index.md)).
  return new Promise((resolve, reject) => {
    // Runs `markdown-link-check` only on external links.
    // If this step fails, check the output. You should find "input". It shows the link that caused the error.
    // Most likely the reason it's failing is because the link doesn't start with `./` or `/` (e.g. [example](index.md), instead of [example](./index.md)).
    markdownLinkCheck(markdownAllBody, configOpts, function (error, linkCheckresults) {
      if (error) {
        return reject(new Error(error));
      }

      // Filtering links for only external URLs
      const results = linkCheckresults.map((linkCheckResult) => ({ ...linkCheckResult }));
      const filteredResults = results.filter(function (item) {
        return !item.link.includes(ignoreURLTag);
      });

      // Collecting dead links
      const deadLinks = filteredResults.filter(result => result.status === "dead").map(result => result.link);

      resolve(deadLinks);
    });
  });
}

// This is used to be called from `package.json`.
// This "if" statement checks if the script is being run from the command line rather than being imported as module - it's the entry point of the script.
if (process.argv[1] === new URL(import.meta.url).pathname) {
  (async () => {
    const allBody = allDocuments.map(({ body }) => body.raw).join("\n--- NEXT PAGE ---\n");
    const deadLinks = await findDeadExternalLinksInMarkdown(allBody);

    if (deadLinks.length > 0) {
      console.error("Dead links found:", deadLinks);
      core.setFailed();
    } else {
      console.log("All links are valid! 🙌");
    }
  })();
}
