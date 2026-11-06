# Agent Skills

Skills for a plan-first workflow in Codex and Claude Code. You start a dev session with `start-dev`; during it, every change goes through four stages: **capture the idea → plan the idea → review the plan → implement the plan with validation**. You end the session with `end-dev`, and the agent proposes learnings from the session that you can promote to project standards or use to improve the workflow.

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

The initializer creates these files, keeping any that already exist:

- `manifesto.md`: mandatory rules for every task, in and outside dev sessions. They take precedence over other project instructions.
- `WORKFLOW.md`: the dev session and four-stage workflow.
- `.workflow/work-items/`: one file per idea, holding its status, the idea, the plan, and check results.
- `.workflow/standards.md`: project standards promoted from learnings and applied when planning.
- `AGENTS.md` and `CLAUDE.md`, which reference the manifesto first, then the workflow and glossary.

The skill seeds the glossary with verified project terms. For existing regular `AGENTS.md` and `CLAUDE.md` files, the initializer prepends the manifesto instruction if needed and appends guidance for other missing references, preserving the original content. It leaves symlinks and all other existing files as they are.

## Dev sessions

- **Start:** invoke `$start-dev` in Codex or `/start-dev` in Claude Code, optionally with a request such as `/start-dev fix search case`. Without a request, the agent lists work items in progress and open ideas and asks what to work on.
- **End:** invoke `$end-dev` or `/end-dev`. The agent stops, records where each item stopped, proposes learnings from the session, applies the ones you accept, and offers to commit the session records.

Outside a dev session, the agent handles requests directly, without the workflow. A session lasts until `end-dev` or the end of the conversation, and a new conversation starts outside one. Learnings are proposed only when you invoke `end-dev`. Typing `start-dev` or `end-dev` as plain text also works when the skills aren't installed, because the agent instructions define both.

## The workflow

[`WORKFLOW.md`](skills/initialize-workflow/assets/project/WORKFLOW.md) takes every change made during a dev session through four stages:

1. **Capture the idea.** The agent records change requests from chat as work items in `.workflow/work-items/` without being asked, including corrections and deferred follow-ups, and asks about anything that would change the outcome.
2. **Plan the idea.** Applying the project standards and glossary, the agent adds a plan to the work item with the outcome, the changes, validation checks with expected results, the standards it follows, and decisions and risks. Work that needs several commits is split into steps.
3. **Review the plan.** You approve or revise the plan. Nothing is implemented before you approve it.
4. **Implement the plan with validation.** The agent implements the plan, runs its checks, and records the results. It then summarizes what changed and why, before → after examples, each check and its result, and anything that needs your attention, and asks **"Commit this?"** A plan with steps goes through this one step at a time.

## Learnings

At `end-dev`, the agent reviews the session's chat, including your corrections and feedback, plan revisions, failed checks, and anything that was harder than expected, and proposes learnings. Each learning goes to one of two places:

- **Standard:** a rule for project work, added to `.workflow/standards.md` and applied in every later plan.
- **Workflow:** an improvement to how dev sessions run, applied as an edit to the project's `WORKFLOW.md`.

You accept, revise, or discard each learning before anything changes.

## Upgrade a project

For a project initialized with an earlier version, merge the updated [workflow](skills/initialize-workflow/assets/project/WORKFLOW.md) and [standards](skills/initialize-workflow/assets/project/.workflow/standards.md) templates and the [agent templates](skills/initialize-workflow/assets/project/) into the project's files. In `CLAUDE.md`, replace any `@WORKFLOW.md` import with the workflow link so the workflow isn't loaded outside dev sessions. The workflow no longer uses `.workflow/backlog.md` or `ARCHITECTURE.md`: move open backlog entries into work items, then keep or delete those files as you prefer. Existing work item folders can stay as they are; new work items use one file each. The initializer doesn't overwrite existing files, but rerunning `initialize-workflow` reports the guidance to merge.
