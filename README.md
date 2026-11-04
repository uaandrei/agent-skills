# Agent Skills

`initialize-workflow` sets up a Git project for tiered plan approval, step-by-step commit review, and a retrospective. `sync-workflow` keeps project docs and agent guidance aligned with the code. Both skills work in Codex and Claude Code.

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

The skill seeds the glossary with verified project terms. The workflow keeps it current across work items and asks for your review when names conflict, look similar, or could refer to the same concept.

For existing `AGENTS.md` and `CLAUDE.md` files, the initializer appends guidance for missing references and preserves the original content. It leaves symlinks and all other existing files as they are.

## Track issues and features

Edit `.workflow/backlog.md` directly or ask the agent to update it. The workflow records deferred follow-ups there during work and tracks progress when you select an entry to implement. Each entry has a stable ID, type, status, and space for notes and work-item links.

For a project initialized before the backlog was added, rerun the updated initializer to create the backlog file. Merge the [Backlog section](skills/initialize-workflow/assets/project/WORKFLOW.md#backlog) into your existing `WORKFLOW.md`, or use `sync-workflow` to review the integration.

## Sync an existing project

Install `sync-workflow` for Codex and Claude Code from your target project.

```sh
npx skills add uaandrei/agent-skills --skill sync-workflow --agent codex claude-code -y
```

Invoke `$sync-workflow` in Codex or `/sync-workflow` in Claude Code. Use it for a general pass over an existing project or give it a specific feature, branch, or range to check after an AI-assisted change.

The skill checks workflow files and relevant project docs against current code, configuration, and tests. It asks about unclear findings and shows a proposed diff for verified fixes. It waits for your approval before editing and follows any additional project approval rules.

If the project lacks the Code Factory workflow, the skill asks whether to initialize it first or sync the existing docs. Ask for a dry run to review the findings without changing the project.
