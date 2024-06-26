import { changeMiddleware, getPrivateRoutes } from "@/src/generatePrivateRoutes";
import { globSync } from "fast-glob";
import { existsSync, readFileSync } from "fs";
import path, { resolve } from "path";
import { Project } from "ts-morph";


// MOCK AND TEST SUITES FOR `getPrivateRoutes` ----------------------------

// Mock path module
jest.mock("path", () => ({
  ...jest.requireActual("path"),
  join: (...args: string[]) => args.join("/"),
  resolve: jest.fn(),
}));

// Mock fast-glob
jest.mock("fast-glob", () => ({
  globSync: jest.fn(),
}));

// Mock fs module
jest.mock("fs", () => ({
  realpathSync: jest.fn().mockReturnValue({ native: "" }),
  existsSync: jest.fn().mockReturnValue(true),
  readFileSync: jest.fn(),
}));

// Redefine mocks to avoid TypeScript errors
const pathResolveMock = resolve as jest.Mock;
const globSyncMock = globSync as jest.Mock;
const readFileSyncMock = readFileSync as jest.Mock;

// Test suite for getPrivateRoutes function
describe("getPrivateRoutes", () => {
  it("should return the correct private routes", () => {
    globSyncMock.mockReturnValue(["pages/dir1/_meta.json"]);
    readFileSyncMock.mockReturnValue(`{
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
    }`);
    const privateRoutes = getPrivateRoutes(path.join(__dirname, "pages"));
    expect(privateRoutes).toEqual({
      "pages/dir1/reference_api": ["user"],
      "pages/dir1/about": [],
    });
  });

  it("should return the correct nested private routes", () => {
    globSyncMock.mockReturnValue([
      "pages/dir1/_meta.json",
      "pages/dir1/reference_api/_meta.json",
      "pages/dir1/reference_api/mega_private/_meta.json",
    ]);
    readFileSyncMock.mockReturnValueOnce(`
    {
      "reference_api": {
        "title": "API Reference",
        "type": "page",
        "private": {
          "private": true,
          "roles": ["user"]
        }
      }
    }
    `)
    .mockReturnValueOnce(`
    {
      "about": "about",
      "---": {
        "type": "separator"
      },
      "users": "users",
      "mega_private": {
        "title": "Mega Private Section",
        "private": {
          "private": true,
          "roles": ["cant_enter"]
        }
      }
    }
    `).mockReturnValueOnce(`
    {
      "hello": "Hello page"
    }
    `);
    pathResolveMock.mockImplementation((path: string, second: string) => {
      const index = path.lastIndexOf("/");
      return path.substring(0, index);
    });

    const privateRoutes = getPrivateRoutes(path.join(__dirname, "pages"));
    expect(privateRoutes).toEqual({
      "pages/dir1/reference_api": ["user"],
      "pages/dir1/reference_api/about": ["user"],
      "pages/dir1/reference_api/users": ["user"],
      "pages/dir1/reference_api/mega_private": ["cant_enter"],
      "pages/dir1/reference_api/mega_private/hello": ["cant_enter"],
    });
  });
});


// MOCK AND TEST SUITES FOR `changeMiddleware` ----------------------------

// Mock objects for ts-morph
const MockGetVariableDeclaration = {
  setInitializer: jest.fn(),
};
const MockSourceFile = {
  getVariableDeclaration: jest
    .fn()
    .mockReturnValueOnce(MockGetVariableDeclaration)
    .mockReturnValueOnce(false),
  saveSync: jest.fn(),
};
const MockProject = {
  addSourceFileAtPath: jest.fn().mockReturnValue(MockSourceFile),
};

// Mock ts-morph module
jest.mock("ts-morph", () => {
  const actualTsMorph = jest.requireActual("ts-morph");
  return {
    ...actualTsMorph,
    Project: jest.fn().mockImplementation(() => {
      return MockProject;
    }),
  };
});

// Test suite for changeMiddleware function
describe("changeMiddleware", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully change the middleware.ts file with correct private routes (happy path) and fail on the second one (bad path)", () => {
    // Call the function
    changeMiddleware();

    // Expectations
    expect(MockProject.addSourceFileAtPath).toHaveBeenCalled();
    expect(MockSourceFile.getVariableDeclaration).toHaveBeenCalled();
    expect(MockSourceFile.saveSync).toHaveBeenCalled();
    expect(MockGetVariableDeclaration.setInitializer).toHaveBeenCalled();

    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    // Call the function a second time
    changeMiddleware();

    // Expectations
    expect(errorSpy).toHaveBeenCalled();
  });
});
