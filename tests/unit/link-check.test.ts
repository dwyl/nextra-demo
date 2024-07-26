import { findDeadExternalLinksInMarkdown } from "scripts/link-check.mjs";
jest.useFakeTimers()


// Mock contentlayer2
jest.mock("contentlayer2/client", () => ({
  isType: jest.fn(),
}));

// Test suite for getPrivateRoutes function
describe("testing external routes", () => {
  it("should succeed with correct links", async () => {
    const markdownBody = "[external_link](https://www.example.com/)";

    const deadLinks = await findDeadExternalLinksInMarkdown(markdownBody);

    expect(deadLinks).toEqual([]); // or w

    //await new Promise(process.nextTick);
});
});
