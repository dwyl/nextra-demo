import markdownLinkCheck from "markdown-link-check";
import { allDocuments } from "../.contentlayer/generated/index.mjs";

const baseUrl = process.argv.find((arg) => arg.includes("--baseUrl"));
const allBody = allDocuments.map(({ body }) => body.raw).join("\n--- NEXT PAGE ---\n");

// Options for `markdown-lint-check`
const configOpts = {
  projectBaseUrl: baseUrl ? baseUrl.replace("--baseUrl=", "https://") : "http://localhost:3000",
  replacementPatterns: [
    // Match links like `[example](/example)
    {
      pattern: "^/",
      replacement: "{{BASEURL}}/",
    },
    // Match links like `[example](./example)
    {
      pattern: "^./",
      replacement: "{{BASEURL}}/",
    },
  ],
};

// NOTE:
// Runs `markdown-link-check`
// If this step fails, check the output. You should find "input". It shows the link that caused the error.
// Most likely the reason it's failing is because the link doesn't start with `./` or `/` (e.g. [example](index.md), instead of [example](./index.md)).
markdownLinkCheck(allBody, configOpts, function (error, linkCheckresults) {
  try {
    if (error) throw new Error(error);

    const results = linkCheckresults.map((linkCheckResult) => ({ ...linkCheckResult }));
    const hasDeadLink = results.find((result) => result.status.includes("dead"));

    results.forEach(({ link, status }) => {
      console.log("%s is %s", link, status === "dead" ? "dead 💀" : "alive 🥳");
    });

    if (hasDeadLink) {
      throw new Error("Dead link found.👆💀");
    } else {
      console.log("All links are valid! 🙌");
    }
  } catch (error) {
    console.error(error.message);
  }
});