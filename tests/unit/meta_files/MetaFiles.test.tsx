
import meta1 from "src/pages/_meta";
import meta2 from "src/pages/reference_api/_meta";
import meta3 from "src/pages/reference_api/mega_private/_meta";

describe("MetaFiles", () => {
  it('should exist', () => {
    expect(meta1).toBeDefined()
    expect(meta2).toBeDefined()
    expect(meta3).toBeDefined()
  });
});
