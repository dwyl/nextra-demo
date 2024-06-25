import { getPrivateRoutes } from "@/src/generatePrivateRoutes";
import { readFileSync } from "fs";
import path from "path";

// Mock path module
jest.mock("path", () => ({
  ...jest.requireActual("path"),
  join: (...args: string[]) => args.join("/"),
  resolve: (...args: string[]) => args.join("/"),
}));

// Mock ts-morph module
jest.mock("ts-morph", () => {
  const actualTsMorph = jest.requireActual("ts-morph");

  class MockSourceFile {
    getVariableDeclaration = jest.fn();
    saveSync = jest.fn();
  }

  class MockProject {
    addSourceFileAtPath = jest.fn().mockReturnValue(new MockSourceFile());
  }

  return {
    ...actualTsMorph,
    Project: MockProject,
  };
});

// Mock fast-glob
jest.mock("fast-glob", () => ({
  globSync: jest.fn(() => ["pages/dir1/_meta.json"]),
}));

// Mock fs module
jest.mock("fs", () => {
  const actualFs = jest.requireActual("fs");

  // Mock realpathSync and realpathSync.native
  return {
    ...actualFs,
    realpathSync: jest.fn().mockReturnValue({ native: "" }),
    existsSync: jest.fn().mockReturnValue(true),
    readFileSync: jest.fn().mockReturnValue(`{
  "index": {
    "title": "Homepage",
    "display": "hidden"
  },
  "reference_api": {
    "title": "API Reference",
    "type": "page",
    "private": {
      "private": true,
      "roles": ["user"]
    }
  },
  "about": {
    "title": "About Us",
    "private": true
  },
  "contact": {
    "title": "Contact Us",
    "type": "page"
  },
  "---": {
    "type": "separator",
    "private": true
  },
  "github_link": {
    "title": "Github",
    "href": "https://github.com/shuding/nextra",
    "newWindow": true,
    "display": "hidden"
  }
}
`),
  };
});

describe("getPrivateRoutes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the correct private routes", () => {
    const privateRoutes = getPrivateRoutes(path.join(__dirname, "pages"));

    expect(privateRoutes).toEqual({
      "pages/dir1/reference_api": ["user"],
      "pages/dir1/about": [],
    });
  });
});
