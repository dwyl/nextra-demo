import { findDeadExternalLinksInMarkdown } from "scripts/link-check.mjs";
jest.useFakeTimers();

// Mock contentlayer2
jest.mock("contentlayer2/client", () => ({
  isType: jest.fn(),
}));

// Test suite for getPrivateRoutes function
describe("testing external routes", () => {
  it("should succeed with correct links", async () => {
    const markdownBody = "[external_link](https://www.example.com/)";
    const deadLinks: string[] = await findDeadExternalLinksInMarkdown(markdownBody);

    expect(deadLinks).toEqual([]);
  });

  it("should succeed and show dead links", async () => {
    const markdownBody = "[external_link](https://localhost/)";
    const deadLinks: string[] = await findDeadExternalLinksInMarkdown(markdownBody);

    expect(deadLinks.length).toEqual(1);
  });

  it("invalid hash should not be included", async () => {
    const markdownBody = "[external_link](invalid:https://localhost/)";
    const deadLinks: string[] = await findDeadExternalLinksInMarkdown(markdownBody);

    expect(deadLinks.length).toEqual(0);
  });
});
