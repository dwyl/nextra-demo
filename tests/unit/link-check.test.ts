import { processFiles } from "lint/lint.mjs";
jest.useFakeTimers();

// Test suite for getPrivateRoutes function
describe("testing external routes", async () => {
  it("should succeed with correct links", async () => {
    // Get current directory
    const validPath = `${process.cwd()}/test-valid.mdx`
    const ignorePath = `${process.cwd()}/.sample_ignore`
    const res = await processFiles(validPath, ignorePath, "../../lint/remark-preset.mjs", false, true)

    expect(res).toHaveBeenCalled();
  });

 it("invalid hash should not be included", async () => {
    // Get current directory
    const validPath = `${process.cwd()}/test-invalid.mdx`
    const ignorePath = `${process.cwd()}/.sample_ignore`
    expect(await processFiles(validPath, ignorePath, "../../lint/remark-preset.mjs", false, true)).toThrow()
 });
});
