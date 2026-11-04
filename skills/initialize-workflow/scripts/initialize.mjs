import { constants } from "node:fs";
import { copyFile, lstat, mkdir, readdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = process.cwd();
const templateRoot = fileURLToPath(new URL("../assets/project/", import.meta.url));

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
      console.log(`Kept existing ${projectPath}`);
    }
  }
}

try {
  await installDirectory(templateRoot, projectRoot);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
