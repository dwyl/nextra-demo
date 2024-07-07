import { PrivateInfo, MetaJson, PrivateRoutes, ExtendedUser } from "@/src/types";

describe("types", () => {
  it('are defined', () => {
    const info: PrivateInfo = {
        private: true,
    }
    const metaJson: MetaJson = {}
    const routes: PrivateRoutes = {}
    const extendedUser: ExtendedUser = {
      role: "user"
    }
    expect(info).toHaveProperty("private");
    expect(metaJson).toBeDefined();
    expect(routes).toBeDefined();
    expect(extendedUser).toHaveProperty("role", "user");
  });
});
