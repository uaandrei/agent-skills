---
name: initialize-workflow
description: Initialize or restore missing files for the Code Factory workflow in a project, including tiered approval rules, documentation and architecture indexes, project standards, and agent instructions.
---

# Initialize workflow

1. Identify the target project root. For a Git project, use its repository root.
2. From that root, run `node` with the absolute path to the bundled [initializer](scripts/initialize.mjs), resolved relative to this skill's `SKILL.md`. It copies the [project templates](assets/project/) to missing paths and appends guidance for missing references to existing regular `AGENTS.md` and `CLAUDE.md` files. If Node is unavailable, copy the templates into missing paths and append the corresponding template paragraphs for missing references to those two files.
3. Report the files created or updated and any conflicts that prevented setup. For a symlinked agent file, report any missing references so the project can decide where to add them.

When the user requests project work after setup, read the project's `WORKFLOW.md` and follow its approval process. Initialization itself is complete once the project files are in place.
