import { changeMiddleware, getPrivateRoutes } from "@/src/generatePrivateRoutes";
import { globSync } from "glob";
import { existsSync, readFileSync } from "fs";
import path, { resolve } from "path";
import { Project, SyntaxKind } from "ts-morph";


// MOCK AND TEST SUITES FOR `getPrivateRoutes` ----------------------------

// Mock path module
jest.mock("path", () => ({
  ...jest.requireActual("path"),
  join: (...args: string[]) => args.join("/"),
  resolve: jest.fn(),
}));

// Mock glob
jest.mock("glob", () => ({
  globSync: jest.fn(),
}));

// Mock fs module
jest.mock("fs", () => ({
  realpathSync: jest.fn().mockReturnValue({ native: "" }),
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
}));

// Mock objects for ts-morph
const MockGetVariableDeclaration = {
  setInitializer: jest.fn(),
};

const MockPropertyAssignment = {
  getKind: jest.fn().mockReturnValue(SyntaxKind.PropertyAssignment),
  getName: jest.fn().mockReturnValue("private"),
  getInitializer: jest.fn().mockReturnValue({
    getKind: jest.fn().mockReturnValue(SyntaxKind.TrueKeyword),
    getText: jest.fn().mockReturnValue("true"),
  }),
};

const MockObjectLiteralExpression = {
  getKind: jest.fn().mockReturnValue(SyntaxKind.ObjectLiteralExpression),
  getProperties: jest.fn().mockReturnValue([MockPropertyAssignment]),
  getProperty: jest.fn().mockReturnValue(MockPropertyAssignment),
};

const MockExportAssignment = {
  getExpression: jest.fn().mockReturnValue(MockObjectLiteralExpression),
};

const MockSourceFile = {
  getVariableDeclaration: jest
    .fn()
    .mockReturnValueOnce(MockGetVariableDeclaration)
    .mockReturnValueOnce(false),
  getExportAssignments: jest.fn().mockReturnValue([MockExportAssignment]),
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


// Redefine mocks to avoid TypeScript errors
const pathResolveMock = resolve as jest.Mock;
const globSyncMock = globSync as jest.Mock;
const readFileSyncMock = readFileSync as jest.Mock;
const existsSyncMock = existsSync as jest.Mock;

// Test suite for getPrivateRoutes function
describe("getPrivateRoutes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it("should return the correct private routes", () => {
    globSyncMock.mockReturnValue(["pages/dir1/_meta.ts"]);
    existsSyncMock.mockReturnValue(true);
    readFileSyncMock.mockReturnValue(`export default {
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
        "private": {
          "private": true
        }
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

    // Call function
    const privateRoutes = getPrivateRoutes(path.join(__dirname, "pages"));

    // Expectation
    expect(privateRoutes).toEqual({});
  });

  it("should return the correct nested private routes", () => {
    globSyncMock.mockReturnValue([
      "pages/dir1/_meta.ts",
      "pages/dir1/reference_api/_meta.ts",
      "pages/dir1/reference_api/mega_private/_meta.ts",
    ]);
    existsSyncMock.mockReturnValue(true);
    readFileSyncMock.mockReturnValueOnce(`
    export default {
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
    export default {
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

    // Call function
    const privateRoutes = getPrivateRoutes(path.join(__dirname, "pages"));

    // Expectations
    expect(privateRoutes).toEqual({});
  });

  it("should return the correct private routes but deleting the ones which don't exist in the file system", () => {
    globSyncMock.mockReturnValue(["pages/dir1/_meta.ts"]);
    existsSyncMock.mockReturnValue(false);
    readFileSyncMock.mockReturnValue(`export default {
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
      }
    }`);

    // Call function
    const privateRoutes = getPrivateRoutes(path.join(__dirname, "pages"));

    // Expectations
    expect(privateRoutes).toEqual({});
  });
});


// MOCK AND TEST SUITES FOR `changeMiddleware` ----------------------------

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
