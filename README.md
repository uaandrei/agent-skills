# Agent Skills

`initialize-workflow` sets up a Git project for tiered plan approval, step-by-step commit review, and a retrospective. `sync-workflow` keeps project docs and agent guidance aligned with the code and the skill's current templates. Both skills work in Codex and Claude Code.

## Install and initialize

From the target project's root, install the skill and select Codex, Claude Code, or both when prompted.

```sh
npx skills add uaandrei/agent-skills
```

Open the project in your agent and invoke `$initialize-workflow` in Codex or `/initialize-workflow` in Claude Code. You can also run the initializer from the project root.

```sh
node .agents/skills/initialize-workflow/scripts/initialize.mjs
```

For a non-interactive install in both agents, run `npx skills add uaandrei/agent-skills --skill initialize-workflow --agent codex claude-code -y`.

The initializer creates `WORKFLOW.md`, `DOCUMENTATION.md`, `ARCHITECTURE.md`, `glossary.md`, `.workflow/standards.md`, and `.workflow/backlog.md`, plus folders for work items, architecture notes, and guides. It also creates `AGENTS.md` and `CLAUDE.md` with references to the architecture, documentation, glossary, and workflow files. `AGENTS.md` also links directly to the backlog.

The initializer creates `manifesto.md` with rules that apply to every task and take precedence over other project instructions. It places the manifesto reference first in `AGENTS.md` and `CLAUDE.md`.

The skill seeds the glossary with verified project terms. The workflow keeps it current across work items and asks for your review when names conflict, look similar, or could refer to the same concept.

For existing regular `AGENTS.md` and `CLAUDE.md` files, the initializer prepends the manifesto instruction if needed and appends guidance for other missing references, preserving the original content. It leaves symlinks and all other existing files as they are.

## Review changes

Each step's review starts with a plain-language brief that explains what changed and why, gives before-and-after examples, and checks the result against the agreed outcomes. It includes check results and evidence, decisions or uncertainty needing your attention, the files to commit, and the proposed commit message. UI changes include screenshots, a preview, or a walkthrough; higher-tier changes also explain affected contracts, permissions, or data and recovery steps.

The full diff is available through a link, an expandable view, or on request. The brief and diff describe the same proposed changes. The agent waits for your explicit approval before committing a step and presents an updated review if those changes differ. Retrospectives use the same format to connect lessons to supporting experience and proposed standards changes.

<details>
<summary>Example reviews</summary>

These examples are illustrative; filenames and check results are fictional.

**Bug fix**

- **What changed and why:** Search now treats uppercase and lowercase letters equally so users can find the same items with either spelling.
- **Before → after:** Searching for `apple` missed `Apple`; both spellings now return the same items.
- **Acceptance checks:** Case-matching and empty-query tests passed. Existing filter behavior passed its regression checks.
- **Needs your attention:** None remaining.
- **Scope and details:** `src/search.js`, `tests/search.test.js`, and the step record. The review includes links to the relevant code; the full diff is available on request.
- **Proposed commit message:** `Fix case-insensitive search`.

The agent asks **“Commit this step?”**

**Documentation correction**

- **What changed and why:** Correct the local development command in the README.
- **Current wording → proposed wording → evidence:** `npm run start` → `npm run dev` → `package.json` defines `dev` and has no `start` script.
- **Acceptance checks:** Inspected the manifest and README references. The development server was not launched.
- **Needs your attention:** None remaining; runtime behavior is unverified.
- **Scope and details:** Only the README is proposed for editing; the full proposed diff is available on request.

The agent asks for approval of those exact edits before applying them.

</details>

For an existing project, merge the updated [step review](skills/initialize-workflow/assets/project/WORKFLOW.md#4-verify-review-and-ask-to-commit) and [retrospective](skills/initialize-workflow/assets/project/WORKFLOW.md#5-retrospective) guidance into its `WORKFLOW.md`. The initializer preserves existing workflow files.

## Track issues and features

Edit `.workflow/backlog.md` directly or ask the agent to update it. The workflow records deferred follow-ups there during work and tracks progress when you select an entry to implement. Each entry has a stable ID, type, status, and space for notes and work-item links.

For a project initialized before the backlog was added, rerun the updated initializer to create the backlog file. Merge the [Backlog section](skills/initialize-workflow/assets/project/WORKFLOW.md#backlog) into your existing `WORKFLOW.md`, or use `sync-workflow` to review the integration.

## Sync an existing project

Install `sync-workflow` and `initialize-workflow` for Codex and Claude Code from your target project. Sync uses the initializer's bundled documentation templates as its reference.

```sh
npx skills add uaandrei/agent-skills --skill initialize-workflow sync-workflow --agent codex claude-code -y
```

Invoke `$sync-workflow` in Codex or `/sync-workflow` in Claude Code. Use it for a general pass over an existing project or give it a specific feature, branch, or range to check after an AI-assisted change.

Every run compares the project's workflow docs with the current skill templates, including the manifesto, agent instructions, workflow, documentation and architecture indexes, glossary guidance, standards guidance, and backlog format. This check also runs for a specific feature or branch, a clean working tree, and a dry run. Sync proposes merges that preserve project-specific content and reports any conflicts or unavailable templates.

The skill also checks relevant project docs against current code, configuration, and tests. It asks about unclear findings and presents verified corrections as current wording → proposed wording → evidence, with check results and the exact proposed diff available as supporting detail. It waits for your approval of those changes before editing and follows any additional project approval rules.

If the project lacks the Code Factory workflow, the skill asks whether to initialize it first or sync the existing docs. Ask for a dry run to review the findings without changing the project.
