import { constants } from "node:fs";
import { appendFile, chmod, copyFile, lstat, mkdir, readdir, readFile, rename, rm, rmdir, stat, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = process.cwd();
const templateRoot = fileURLToPath(new URL("../assets/project/", import.meta.url));
const lockName = ".initialize-workflow.lock";
const lockPath = join(projectRoot, lockName);
const documentReference = /(?<![\w./-])(?:\.\/)?((?:ARCHITECTURE|DOCUMENTATION|WORKFLOW|\.workflow\/backlog)\.md)(?![\w/-]|\.\w)/g;
const glossaryLink = /\]\(\s*<?(?:\.\/)?glossary\.md>?(?=\s|\))/;

function referencedDocuments(text) {
  const documents = Array.from(text.matchAll(documentReference), ([, filename]) => filename);
  if (glossaryLink.test(text)) documents.push("glossary.md");
  return documents;
}

async function prependManifestoGuidance(template, target) {
  const original = await lstat(target);
  const contents = await readFile(target, "utf8");
  const body = contents.replace(/^\uFEFF/, "");
  const bom = contents.slice(0, contents.length - body.length);
  const newline = body.match(/\r?\n/)?.[0] ?? "\n";
  // The first template paragraph is reserved for the manifesto instruction.
  const [templateParagraph] = (await readFile(template, "utf8")).split(/\r?\n\r?\n/, 1);
  const priority = templateParagraph.replace(/\r?\n/g, newline);
  const [firstParagraph] = body.split(/\r?\n\r?\n/, 1);
  if (firstParagraph.trimEnd() === priority) return false;

  const separator = body ? newline + newline : newline;
  const staged = join(lockPath, "agent-guidance.md");
  try {
    await writeFile(staged, bom + priority + separator + body, { flag: "wx", mode: original.mode });
    await chmod(staged, original.mode);
    const current = await lstat(target);
    if (!current.isFile() || current.dev !== original.dev || current.ino !== original.ino ||
        (await readFile(target, "utf8")) !== contents) {
      throw new Error(`${relative(projectRoot, target)} changed during initialization. Retry to preserve its latest content.`);
    }
    await rename(staged, target);
  } finally {
    await rm(staged, { force: true });
  }
  return true;
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
          console.log(`Kept existing symlink ${projectPath}. Check its target for manifesto guidance at the top and for missing project references.`);
          continue;
        }
        const prependedManifesto = await prependManifestoGuidance(template, target);
        if (prependedManifesto) console.log(`Prepended manifesto guidance to ${projectPath}`);
        if (await appendMissingGuidance(template, target)) {
          console.log(`Appended missing project guidance to ${projectPath}`);
          continue;
        }
        if (prependedManifesto) continue;
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
