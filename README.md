# Agent Skills

`initialize-workflow` sets up a Git project for tiered plan approval, step-by-step commit review, and a retrospective. The same skill works in Codex and Claude Code.

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

The initializer creates `WORKFLOW.md`, `DOCUMENTATION.md`, `ARCHITECTURE.md`, and `.workflow/standards.md`, plus folders for work items, architecture notes, and guides. It also creates `AGENTS.md` and `CLAUDE.md` so future sessions can find the workflow.

Existing files are kept on setup and on reruns. If you already have agent instructions, add a reference to `WORKFLOW.md` there to enable the workflow in future sessions.
