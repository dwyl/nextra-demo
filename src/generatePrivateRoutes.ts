import { Project, SyntaxKind, ObjectLiteralExpression, PropertyAssignment } from "ts-morph";
import path from "path";
import fs from "fs";
import { globSync } from "glob";
import { PrivateRoutes } from './types';

/**
 * This function looks at the file system under a path 
 * and goes through each `_meta.ts` looking for private routes recursively.
 * It is expecting the `_meta.ts` values of keys to have a property 
 * called "private" to consider the route as private for specific roles.
 * If a parent is private, all the children are private as well. 
 * The children inherit the roles of their direct parent.
 * @param pagesDir path to recursively look for.
 * @returns map of private routes as key and array of roles that 
 * are permitted to access the route.
 */
export function getPrivateRoutes(pagesDir: string): PrivateRoutes {
  let privateRoutes: PrivateRoutes = {};

  // Find all _meta.ts files recursively
  const metaFiles = globSync(path.join(pagesDir, "**/_meta.ts"));

  // Variable to keep track if parent is private on nested routes and its role
  const rootPrivateSettings: { 
    [key: string]: { private: boolean; roles: string[] } 
  } = {};

  // Initialize ts-morph Project for reading the _meta.ts files
  const project = new Project();

  // Iterate over the found meta files
  for (const file of metaFiles) {
    // Get the path of the file and parse it using ts-morph
    const dir = path.dirname(file);
    const sourceFile = project.addSourceFileAtPath(file);

    // Get the default export assignment from the _meta.ts file
    const defaultExport = sourceFile.getExportAssignments();
    
    if (!defaultExport) {
      console.error(`No export assignment found in ${file}`);
      continue;
    }

    const metaObject = defaultExport[0].getExpression();

    // If the expression is an object literal, we can process it
    if (metaObject?.getKind() === SyntaxKind.ObjectLiteralExpression) {
      const objectLiteral = metaObject as ObjectLiteralExpression;
      
      // Iterate over the properties of the object literal
      objectLiteral.getProperties().forEach(prop => {
        if (prop.getKind() === SyntaxKind.PropertyAssignment) {
          const propertyAssignment = prop as PropertyAssignment;
          const key = propertyAssignment.getName();
          const initializer = propertyAssignment.getInitializer();

          if (!key || !initializer) {
            return;
          }

          const route = path.join(dir, key).replace(pagesDir, "").replace(/\\/g, "/");

          // Check if the current meta has a "private" property
          if (initializer.getKind() === SyntaxKind.ObjectLiteralExpression) {
            const metaInitializer = initializer as ObjectLiteralExpression;

            // Check for "private" property inside the object
            const privateProp = metaInitializer.getProperty("private") as PropertyAssignment;
            if (privateProp) {
              const privateValue = privateProp.getInitializer();

              if (privateValue?.getKind() === SyntaxKind.TrueKeyword) {
                privateRoutes[route] = [];
                rootPrivateSettings[dir] = { private: true, roles: [] };
              }
              // If the "private" property is an object with possible roles
              else if (privateValue?.getKind() === SyntaxKind.ObjectLiteralExpression) {
                const privateObject = privateValue as ObjectLiteralExpression;
                const rolesProp = privateObject.getProperty("roles") as PropertyAssignment;
                const roles = rolesProp ? rolesProp.getInitializer()?.getText().replace(/[\[\]\s"]/g, "").split(",") as string[] : [] as string[];
                privateRoutes[route] = roles;
                rootPrivateSettings[dir] = { private: true, roles: roles };
              }
            }
          } else {
            // Check if the parent folder is private and inherit roles
            const parentDir = path.resolve(dir, "..");
            if (rootPrivateSettings[parentDir] && rootPrivateSettings[parentDir].private) {
              const parentRoles = rootPrivateSettings[parentDir].roles;
              privateRoutes[route] = parentRoles;
            }
          }
        }
      });
    }
  }

  // Second pass to clean-up possible unwanted/invalid routes
  for (const route of Object.keys(privateRoutes)) {
    const fullPath = path.join(pagesDir, route);
    const lastSegment = route.split("/").pop();

    // Remove separators or any route that doesn't match existing file/directory
    if (lastSegment === "---") {
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

const CONST_VARIABLE_NAME = "privateRoutesMap"; // const inside `middleware.ts` 
const DIRECTORY = "pages"; // Dir to look for the routes (should be `pages`, according to Nextra's file system)

export function changeMiddleware() {

  // Get private routes
  const pagesDir = path.join(__dirname, DIRECTORY);
  const privateRoutes = getPrivateRoutes(pagesDir);
  
  // Initialize the project and source file
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(
      path.resolve(__dirname, "middleware.ts")
    );
  
  // Find the variable to replace and change its declaration
  const variable = sourceFile.getVariableDeclaration(CONST_VARIABLE_NAME);
  if (variable) {
    variable.setInitializer(JSON.stringify(privateRoutes));
    sourceFile.saveSync();
  } else {
    console.error("Variable not found in `middleware.ts`. File not changed.");
  }  
}

export default {
  /* c8 ignore next */
  changeMiddleware: () => changeMiddleware()
}
