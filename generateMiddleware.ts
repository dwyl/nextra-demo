import { Project } from "ts-morph";
import path from "path";
import fs from "fs";
import { globSync } from "fast-glob";

// Types for the `_meta.json` structure
type PrivateInfo = {
  private: boolean;
  roles?: string[];
};

type MetaJson = {
  [key: string]: string | any | PrivateInfo;
};

type PrivateRoutes = {
  [key: string]: string[];
};

/**
 * This function looks at the file system under a path and goes through each `_meta.json` looking for private roots recursively.
 * It is expecting the `_meta.json` values of keys to have a property called "private" to consider the route as private for specific roles.
 * If a parent is private, all the children are private as well. The roles **are not propagated to the children**.
 * @param pagesDir path to recursively look for.
 * @returns map of private routes as key and array of roles that are permitted to access the route.
 */
function getPrivateRoutes(pagesDir: string): PrivateRoutes {
  let privateRoutes: PrivateRoutes = {};

  // Find all _meta.json files recursively
  const metaFiles = globSync(path.join(pagesDir, "**/_meta.json"));

  // Variable to keep track if parent is private on nested routes and its role
  const rootPrivateSettings: { [key: string]: { private: boolean, roles: string[] } } = {};

  // Iterate over the found meta files
  for (const file of metaFiles) {
    // Get the path of file and read it
    const dir = path.dirname(file);
    const metaJson: MetaJson = JSON.parse(fs.readFileSync(file, "utf-8"));

    // Iterate over the key/value pairs of the "_meta.json" file
    for (const [key, meta] of Object.entries(metaJson)) {
      const route = path.join(dir, key)
                    .replace(pagesDir, '').replace(/\\/g, '/');

      // Check if the current meta has a "private" property
      if (meta.private !== undefined) {
        if (typeof meta.private === 'boolean') {
          if (meta.private) {
            privateRoutes[route] = []
            rootPrivateSettings[dir] = { private: true, roles: [] };
          }
        } 
        // If the "private" property is an object with possible roles
        else if (meta.private.private === true) {
          const roles = meta.private.roles ? meta.private.roles : [];
          privateRoutes[route] = roles
          rootPrivateSettings[dir] = { private: true, roles: roles };
        }
      } else {
        // Check if the parent folder is private and inherit roles
        const parentDir = path.resolve(dir, '..');
        if (rootPrivateSettings[parentDir] && rootPrivateSettings[parentDir].private) {
          const parentRoles = rootPrivateSettings[parentDir].roles;
          privateRoutes[route] = parentRoles;
        }
      }
    }
  }


  // Now let's just do a second pass to clean-up possible unwanted/invalid routes
  for (const route of Object.keys(privateRoutes)) {
    const fullPath = path.join(pagesDir, route);
    const lastSegment = route.split('/').pop();

    // Remove separators or any route that doesn't correspond to an existing file/directory
    if (lastSegment === '---') {
      delete privateRoutes[route];
      continue;
    }
  
    // Check for the existence of .mdx file
    const mdxPath = `${fullPath}.mdx`;
    if (!fs.existsSync(fullPath) && !fs.existsSync(mdxPath)) {
      delete privateRoutes[route];
    }
  }

  return privateRoutes;
}

// - - - - - - - - - - - - - - - - - -  - - - - -
// `middleware.ts` is changed by executing the code below.

const CONST_VARIABLE_NAME = "privateRoutesMap"; // Name of the constant inside `middleware.ts` to be manipulated
const DIRECTORY = "pages"; // Directory to look for the routes (should be `pages`, according to Nextra's file system)

// Get private routes
const pagesDir = path.join(__dirname, DIRECTORY);
const privateRoutes = getPrivateRoutes(pagesDir);

// Initialize the project and source file
const project = new Project();
const sourceFile = project.addSourceFileAtPath(path.resolve(__dirname, "middleware.ts"));

// Find the variable to replace and change it's declaration
const variable = sourceFile.getVariableDeclaration(CONST_VARIABLE_NAME);
if (variable) {
  variable.setInitializer(JSON.stringify(privateRoutes));
  sourceFile.saveSync();
} else {
  console.error("Variable not found in `middleware.ts`. File wasn't changed.");
}
