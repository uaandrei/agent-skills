import { constants } from "node:fs";
import { appendFile, copyFile, lstat, mkdir, readdir, readFile, rmdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = process.cwd();
const templateRoot = fileURLToPath(new URL("../assets/project/", import.meta.url));
const lockName = ".initialize-workflow.lock";
const lockPath = join(projectRoot, lockName);
const documentReference = /(?<![\w./-])(?:\.\/)?((?:ARCHITECTURE|DOCUMENTATION|WORKFLOW)\.md)(?![\w/-]|\.\w)/g;

function referencedDocuments(text) {
  return Array.from(text.matchAll(documentReference), ([, filename]) => filename);
}

async function appendMissingGuidance(template, target) {
  const contents = await readFile(target, "utf8");
  const references = new Set(referencedDocuments(contents));
  const guidance = await readFile(template, "utf8");
  // Each document's guidance is a separate paragraph in the templates.
  const missing = guidance.trim().split(/\r?\n\r?\n/).filter(paragraph =>
    referencedDocuments(paragraph).some(filename => !references.has(filename))
  );
  if (missing.length === 0) return false;

  const newline = contents.match(/\r?\n/)?.[0] ?? "\n";
  let separator = "";
  if (contents.length > 0 && !contents.endsWith(newline + newline)) {
    separator = contents.endsWith(newline) ? newline : newline + newline;
  }
  const section = ["## Code Factory workflow", ...missing].join("\n\n");
  const addition = separator + section.replace(/\r?\n/g, newline) + newline;
  await appendFile(target, addition, {
    flag: constants.O_WRONLY | constants.O_APPEND | constants.O_NOFOLLOW,
  });
  return true;
}

async function installDirectory(source, destination) {
  for (const entry of await readdir(source, { withFileTypes: true })) {
    const template = join(source, entry.name);
    const target = join(destination, entry.name);
    const projectPath = relative(projectRoot, target);

    if (entry.isDirectory()) {
      try {
        await mkdir(target);
      } catch (error) {
        if (error.code !== "EEXIST") throw error;
        if (!(await lstat(target)).isDirectory()) {
          throw new Error(`Cannot create directory ${projectPath} because that path is already in use.`);
        }
      }
      await installDirectory(template, target);
      continue;
    }

    try {
      await copyFile(template, target, constants.COPYFILE_EXCL);
      console.log(`Created ${projectPath}`);
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
      if (!(await stat(target)).isFile()) {
        throw new Error(`Cannot create file ${projectPath} because that path is already in use.`);
      }
      if (projectPath === "AGENTS.md" || projectPath === "CLAUDE.md") {
        if ((await lstat(target)).isSymbolicLink()) {
          console.log(`Kept existing symlink ${projectPath}. Check its target for missing project references.`);
          continue;
        }
        if (await appendMissingGuidance(template, target)) {
          console.log(`Appended missing project guidance to ${projectPath}`);
          continue;
        }
      }
      console.log(`Kept existing ${projectPath}`);
    }
  }
}

try {
  try {
    await mkdir(lockPath);
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
    throw new Error(`Initialization is locked by ${lockName}. If an earlier run was interrupted, remove the lock and retry.`);
  }
  try {
    await installDirectory(templateRoot, projectRoot);
  } finally {
    await rmdir(lockPath);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
