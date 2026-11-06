---
name: start-dev
description: Start a dev session so the project's Code Factory workflow (capture idea, plan, review plan, implement with validation) applies to changes until end-dev. User-invoked.
disable-model-invocation: true
---

# Start dev session

1. Identify the project root. For a Git project, use its repository root.
2. If `WORKFLOW.md` is missing there, tell the user to run `initialize-workflow` first, and stop without starting a dev session.
3. Read `manifesto.md` and `WORKFLOW.md`. If `WORKFLOW.md` has no **Dev sessions** section, tell the user the project's workflow predates dev sessions and that rerunning `initialize-workflow` reports the guidance to merge, and stop without starting a dev session.
4. Follow the **Start a dev session** section of `WORKFLOW.md`. Treat any request the user gave with `start-dev` as the request to work on.
