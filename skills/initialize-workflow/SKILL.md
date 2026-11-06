---
name: initialize-workflow
description: "Initialize or restore missing files for the Code Factory workflow in a project: a mandatory project manifesto; a four-stage workflow (capture the idea, plan it, review the plan, implement it with validation) tracked in work items, which applies during dev sessions started with start-dev and ended with end-dev, where end-dev proposes learnings that become project standards or workflow improvements; a project glossary; project standards; and agent instructions."
---

# Initialize workflow

1. Identify the target project root. For a Git project, use its repository root.
2. From that root, run `node` with the absolute path to the bundled [initializer](scripts/initialize.mjs), resolved relative to this skill's `SKILL.md`. It copies the [project templates](assets/project/) to missing paths, puts the manifesto instruction first in regular `AGENTS.md` and `CLAUDE.md` files, and appends guidance for other missing references. If Node is unavailable, copy the templates into missing paths, prepend the first template paragraph to each existing regular agent file that lacks it at the top, and append the corresponding template paragraphs for other missing references.
3. When the initializer creates or finds a regular root `glossary.md`, use existing project docs and relevant code to seed it with verified terms and definitions. Preserve existing entries. Ask the user to review conflicting, similar, or potentially equivalent names before resolving them, and record pending naming decisions in the glossary.
4. Report the files created or updated, any pending naming decisions, and any conflicts that prevented setup. If the project already had a `manifesto.md`, compare its rules with the [manifesto template](assets/project/manifesto.md) and report any missing or conflicting rule for the user to resolve. For a symlinked agent file, report missing manifesto guidance at the top and other missing references. For a symlinked glossary, report missing entries. If an existing `WORKFLOW.md`, standards, or agent file lacks or conflicts with guidance in its [project template](assets/project/), such as dev sessions, the four workflow stages, or end-of-session learnings, report that guidance for a reviewed merge while preserving project-specific content.

After setup, `manifesto.md` applies to every task, and `WORKFLOW.md` applies only during a dev session, which the user starts with `start-dev` and ends with `end-dev`. Tell the user how to start and end one. Initialization itself is complete once the project files are in place.
