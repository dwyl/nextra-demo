import fs from "fs";
import path from "path";
import yargs from "yargs";
import ignore from "ignore";
import { glob } from "glob";
import { remark } from "remark";
import { reporter } from "vfile-reporter";
import { hideBin } from "yargs/helpers";
import {read} from 'to-vfile'

// Counter to keep track of total warnings
let totalWarnings = 0;

/**
 * Load and parse the .remarkignore file.
 * @param {string} path path to the ignore file.
 * @returns {Promise<ignore>} A promise that resolves with the ignore instance.
 */
async function loadIgnoreFile(path) {
  try {
    const ignoreFileContent = fs.readFileSync(path, "utf-8");
    const ig = ignore().add(ignoreFileContent);
    return ig;
  } catch (err) {
    console.warn("No .remarkignore file found, proceeding without ignoring files.");
    return ignore();
  }
}

/**
 *  Process a single file with the given preset and formatting flag.
 * @param {string} filePath  The path to the file
 * @param {string} preset  The preset object to use for linting with array of remark plugins
 * @param {boolean} shouldFormat  Flag to indicate whether formatting (changing markdown files) should be applied
 */
async function formatSingleFile(filePath, preset, shouldFormat) {
  try {
    // Create a virtual file with metadata like `stem`.
    // This is needed for rules related to files.
    const vfile = await read(filePath);

    // Process the file with the given preset
    const file = await remark().use(preset).process(vfile);

    // Check if there are any issues
    const issues = file.messages.length;

    // Print the issues
    if (issues === 0) {
      console.log(`${filePath}: no issues found`);
    } else {
      totalWarnings += file.messages.length;
      console.error(reporter(file));
    }

    // Write the file back if formatting is enabled
    if (shouldFormat) {
      fs.writeFileSync(filePath, file.value.toString());
    }
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err);
  }
}

// Main function to handle glob pattern and process files
/**
 * Process files based on the given pattern, preset, and formatting flag.
 * @param {string} pattern The glob pattern to match files.
 * @param {string} pattern The path to the ignore file.
 * @param {string} preset The path to the preset object to use for linting with array of remark plugins.
 * @param {boolean} shouldFormat  Flag to indicate whether formatting (changing markdown files) should be applied.
 * @param {boolean} failOnError Flag to indicate whether to fail command if any error is found.
 * @returns {Promise<void>} A promise that resolves when all files are processed.
 */
export async function processFiles(pattern, ignoreFile, preset, shouldFormat, failOnError) {
  try {
    // Load the ignore file and get the list of files
    const ig = await loadIgnoreFile(ignoreFile);
    const files = await glob(pattern);

    if (files.length === 0) {
      console.log("No files matched the given pattern.");
      return;
    }

    // Filter out files that are ignored
    const filteredFiles = files.filter((file) => !ig.ignores(file));

    if (filteredFiles.length === 0) {
      console.log("All matched files are ignored.");
      return;
    }

    // Process each file
    for (const file of filteredFiles) {
      await formatSingleFile(file, preset, shouldFormat);
    }

    // Print total warnings and fail command if needed
    if (totalWarnings > 0) {
      console.log(`⚠️ Total ${totalWarnings} warning(s)`);
      if (failOnError) {
        process.exit(1);
      }
    }
  } catch (err) {
    console.error("Error during file processing:", err);
  }
}

// Use yargs to handle command-line arguments
const argv = yargs(hideBin(process.argv))
  .option("pattern", {
    alias: "p",
    type: "string",
    description: "Glob pattern to match files",
    demandOption: true,
  })
  .option("preset", {
    alias: "r",
    type: "string",
    description: "Path to the preset file",
    demandOption: true,
  })
  .option("ignoreFile", {
    alias: "i",
    type: "string",
    description: "Path to the ignore file",
    demandOption: false,
  })
  .option("format", {
    alias: "f",
    type: "boolean",
    description: "Flag to indicate whether formatting should be applied",
    default: false,
  })
  .option("failOnError", {
    alias: "e",
    type: "boolean",
    description: "Flag to indicate whether to fail command if any error is found",
    default: false,
  }).argv;

// Dynamically import the preset file
const presetPath = path.resolve(argv.preset);
import(presetPath)
.then((preset) => 
  // Start processing files
  processFiles(argv.pattern, argv.ignoreFile, preset.default, argv.format, argv.failOnError)
);

