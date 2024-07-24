import markdownLinkCheck from "markdown-link-check";
import { allDocuments } from "../.contentlayer/generated/index.mjs";

const baseUrl = process.argv.find((arg) => arg.includes("--baseUrl"));
const allBody = allDocuments.map(({ body }) => body.raw).join("\n--- NEXT ARTICLE ---\n");

const configOpts = {
  projectBaseUrl: baseUrl ? baseUrl.replace("--baseUrl=", "https://") : "http://localhost:3000",
  replacementPatterns: [
    {
      pattern: "^/",
      replacement: "{{BASEURL}}/",
    },
  ],
};

markdownLinkCheck(allBody, configOpts, function (error, linkCheckresults) {
  try {
    if (error) throw new Error(error);

    const results = linkCheckresults.map((linkCheckResult) => ({ ...linkCheckResult }));
    console.log(results)
    const hasDeadLink = results.find((result) => result.status.includes("dead"));

    results.forEach(({ link, status}) => {
      console.log("%s is %s", link, status === "dead" ? "dead 💀" : "alive 🥳");
    });

    if (hasDeadLink) {
      throw new Error("Dead link found.👆💀");
    } else {
      console.log("All links are valid! 🙌")
    }

  } catch(error) {
    throw Error(error.message)
  }
});
