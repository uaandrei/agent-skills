# Agent Skills

`initialize-workflow` sets up a Git project for a plan-first workflow: the agent sizes each piece of work, gets your go-ahead on a plan, validates each implementation, asks you to confirm it and approve its commit, and turns what it learned into project standards you approve. Large plans repeat implementation, validation, confirmation, and commit approval for every step. The workflow applies only during a dev session that you start with `start-dev` and end with `end-dev`. It works in Codex and Claude Code.

## Install and initialize

From the target project's root, install the skills and select `initialize-workflow`, `start-dev`, and `end-dev`, then Codex, Claude Code, or both when prompted.

```sh
npx skills add uaandrei/agent-skills
```

Open the project in your agent and invoke `$initialize-workflow` in Codex or `/initialize-workflow` in Claude Code. You can also run the initializer from the project root.

```sh
node .agents/skills/initialize-workflow/scripts/initialize.mjs
```

For a non-interactive install in both agents, run `npx skills add uaandrei/agent-skills --skill initialize-workflow start-dev end-dev --agent codex claude-code -y`.

The initializer creates `WORKFLOW.md`, `DOCUMENTATION.md`, `ARCHITECTURE.md`, `glossary.md`, `.workflow/standards.md`, and `.workflow/backlog.md`, plus folders for work items, architecture notes, and guides. It also creates `AGENTS.md` and `CLAUDE.md` with references to the architecture, documentation, glossary, workflow, and backlog files.

The initializer creates `manifesto.md` with rules that apply to every task and take precedence over other project instructions. It places the manifesto reference first in `AGENTS.md` and `CLAUDE.md`.

The skill seeds the glossary with verified project terms. The workflow keeps it current across work items and asks for your review when names conflict, look similar, or could refer to the same concept.

The skill also reconciles the backlog with requests in the available chat and progress recorded in existing work items.

For existing regular `AGENTS.md` and `CLAUDE.md` files, the initializer prepends the manifesto instruction if needed and appends guidance for other missing references, preserving the original content. It leaves symlinks and all other existing files as they are.

## Start and end dev sessions

The workflow applies only while a dev session is active, so you choose when changes go through it. Outside a dev session, the agent handles requests directly: it doesn't create work items, capture requests in the backlog, update the glossary or standards, or ask for workflow approvals unless you ask. The manifesto applies both in and outside dev sessions.

- **Start:** invoke `$start-dev` in Codex or `/start-dev` in Claude Code, optionally with a request such as `/start-dev fix search case`. The agent reads the workflow, standards, glossary, and backlog, reconciles the backlog with existing work items, and starts or resumes the request. Without a request, it lists work in progress and open entries and asks what to work on.
- **End:** invoke `$end-dev` or `/end-dev`. The agent stops without starting another stage, step, or commit, records where each work item stopped in its records and backlog entry, and reports pending decisions, approvals, and uncommitted changes. It doesn't commit; those records go into the next approved commit in a later dev session.

A dev session lasts until `end-dev` or the end of the conversation, and a new conversation starts outside one. Typing `start-dev` or `end-dev` as plain text also works when the skills aren't installed, because the agent instructions define both. Requests you made before `start-dev` stay out of the backlog unless you bring them into the session. If you ask outside a dev session to continue a work item that's in progress, the agent asks whether to start a dev session first.

## How the workflow runs

[`WORKFLOW.md`](skills/initialize-workflow/assets/project/WORKFLOW.md) takes every change made during a dev session through these stages. Large work is split into plan steps.

1. **Capture the idea** in a work item under `.workflow/work-items/`, linked to a backlog entry marked **In progress**.
2. **Assess whether it is small or large.** Small work fits in one commit; large work needs several.
3. **Small:** propose a plan with implementation and validation phases, including concrete checks and expected results.
4. **Large:** split the work into steps that can each be committed on their own, each with implementation and validation phases, then propose a plan.
5. **Present the plan** and ask whether to continue or revise it.
6. **Implement and validate the plan.** Record validation results for the small plan or current large-plan step. Large work repeats stages 6–8 for each step.
7. **Ask you to confirm the implementation.**
8. **Ask to commit.** For a large plan, ask after every validated and confirmed step, including the last, and wait for approval and a successful commit before starting the next step.
9. **Study the context and extract learnings** from your feedback, corrections, and anything that was harder than expected.
10. **Ask whether to standardize or discard each learning.** Standardized learnings go into `.workflow/standards.md`, which the agent applies in every stage of later work.
11. **Ask you to review and commit** the learnings, standards changes, and backlog completion summary, marking the entry **Done** in that commit.

After stage 11, completed work item folders may be deleted. Standards and other shared project records stay in place, and links to deleted work items are replaced with commit hashes so their history remains accessible. Unfinished work items are retained, and deleted item IDs are not reused.

## Confirm changes

Every small plan and every step of a large plan has a validation phase after implementation. The agent runs the agreed checks, records expected and actual results in `plan.md`, and updates the backlog. Required checks must pass before confirmation or commit approval; changes requested during review go through validation again.

After validation, the agent summarizes the change in plain language so you can judge it without reading the diff: what changed and why, before-and-after examples, each check and its result, and anything that needs your attention. UI changes include screenshots, a preview, or instructions to try it. The full diff is available on request.

After you confirm the implementation, the agent lists the files to commit and the proposed commit message and waits for your explicit approval before committing. For a large plan, it identifies the step and asks **“Commit step `<id>`?”** every time. Each step completes validation, confirmation, approval, and its commit before the next starts.

<details>
<summary>Example</summary>

This example is illustrative; filenames and check results are fictional.

- **What changed and why:** Search now treats uppercase and lowercase letters equally so users can find the same items with either spelling.
- **Before → after:** Searching for `apple` missed `Apple`; both spellings now return the same items.
- **Checks:** Case-matching and empty-query tests passed. Existing filter tests passed.
- **Needs your attention:** None.

The agent asks **“Does this implementation look right?”** After you confirm, it lists `src/search.js`, `tests/search.test.js`, and the work item records, proposes `Fix case-insensitive search`, and asks **“Commit this?”**

</details>

For a project initialized with an earlier version, merge the updated [workflow template](skills/initialize-workflow/assets/project/WORKFLOW.md) into its `WORKFLOW.md`, including the [Dev sessions section](skills/initialize-workflow/assets/project/WORKFLOW.md#dev-sessions), and merge the dev session paragraphs of the [agent templates](skills/initialize-workflow/assets/project/) into its `AGENTS.md` and `CLAUDE.md`. In `CLAUDE.md`, replace the `@WORKFLOW.md` import with the workflow link so the workflow isn't loaded outside dev sessions. The initializer doesn't overwrite existing workflow files.

## Track issues and features

During a dev session, the agent automatically captures project change requests from chat in `.workflow/backlog.md`, including corrections and deferred follow-ups. Requests that refine the same outcome update the existing entry; separate work gets its own entry. You can also edit the backlog directly. When work starts or resumes, the agent reconciles the dev session's conversation and work item records with existing entries while preserving your edits and stable IDs.

Entries stay **Open** until work starts, then **In progress** from idea capture through the final learnings review. The agent updates notes throughout each stage and plan step with progress, check results, blockers, pending decisions or approvals, and commit hashes, including before it waits for you. These edits happen as work progresses and go into the next approved commit. Entries become **Done** in the stage 11 commit, or **Closed** if you withdraw or decline the request; deferred work returns to **Open**.

For an existing project, rerun the updated initializer to create any missing files, then merge the [Backlog section](skills/initialize-workflow/assets/project/WORKFLOW.md#backlog), the [backlog guidance](skills/initialize-workflow/assets/project/.workflow/backlog.md), and the backlog instructions in the [agent templates](skills/initialize-workflow/assets/project/) into the corresponding project files. The initializer preserves existing workflow and backlog files and agent guidance that already links to them.
