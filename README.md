# Agent Skills

`initialize-workflow` sets up a Git project for a plan-first workflow: the agent sizes each piece of work, gets your go-ahead on a plan, asks you to confirm each change before committing it, and turns what it learned into project standards you approve. It works in Codex and Claude Code.

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

## How the workflow runs

[`WORKFLOW.md`](skills/initialize-workflow/assets/project/WORKFLOW.md) takes every change through these stages. Large work is split into plan steps.

1. **Capture the idea** in a work item under `.workflow/work-items/`.
2. **Assess whether it is small or large.** Small work fits in one commit; large work needs several.
3. **Small:** propose a plan.
4. **Large:** split the work into steps that can each be committed on their own, then propose a plan.
5. **Present the plan** and ask whether to continue or revise it.
6. **Implement the plan.** Large work goes one plan step at a time, repeating stages 6–8 for each step.
7. **Ask you to confirm the implementation.**
8. **Ask to commit.**
9. **Study the context and extract learnings** from your feedback, corrections, and anything that was harder than expected.
10. **Ask whether to standardize or discard each learning.** Standardized learnings go into `.workflow/standards.md`, which the agent applies in every stage of later work.
11. **Ask you to review and commit** the learnings and standards changes.

## Confirm changes

When implementation is done, the agent summarizes the change in plain language so you can judge it without reading the diff: what changed and why, before-and-after examples, each check and its result, and anything that needs your attention. UI changes include screenshots, a preview, or instructions to try it. The full diff is available on request.

After you confirm the implementation, the agent lists the files to commit and the proposed commit message and waits for your explicit approval before committing.

<details>
<summary>Example</summary>

This example is illustrative; filenames and check results are fictional.

- **What changed and why:** Search now treats uppercase and lowercase letters equally so users can find the same items with either spelling.
- **Before → after:** Searching for `apple` missed `Apple`; both spellings now return the same items.
- **Checks:** Case-matching and empty-query tests passed. Existing filter tests passed.
- **Needs your attention:** None.

The agent asks **“Does this implementation look right?”** After you confirm, it lists `src/search.js`, `tests/search.test.js`, and the work item records, proposes `Fix case-insensitive search`, and asks **“Commit this?”**

</details>

For a project initialized with an earlier version, merge the updated [workflow template](skills/initialize-workflow/assets/project/WORKFLOW.md) into its `WORKFLOW.md`. The initializer doesn't overwrite existing workflow files.

## Track issues and features

Edit `.workflow/backlog.md` directly or ask the agent to update it. The workflow records deferred follow-ups there during work and tracks progress when you select an entry to implement. Each entry has a stable ID, type, status, and space for notes and work-item links.

For a project initialized before the backlog was added, rerun the updated initializer to create the backlog file and merge the [Backlog section](skills/initialize-workflow/assets/project/WORKFLOW.md#backlog) into your existing `WORKFLOW.md`.
