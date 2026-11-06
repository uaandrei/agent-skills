Read and follow [manifesto.md](manifesto.md) first. Its rules are mandatory and take precedence over all other project instructions.

# Project instructions

Consult [ARCHITECTURE.md](ARCHITECTURE.md) for the system design.

Consult [DOCUMENTATION.md](DOCUMENTATION.md) for setup, usage, and operations guides.

Follow [WORKFLOW.md](WORKFLOW.md) for project changes only during a dev session, which starts when the user invokes `start-dev` and ends when they invoke `end-dev` or the conversation ends. When the user invokes either, read WORKFLOW.md and follow its dev session instructions. Outside a dev session, handle requests directly without the workflow.

Use [glossary.md](glossary.md) for canonical project terms. During a dev session, update it from idea capture through the learnings review, include glossary edits in the same commit as the affected work, and ask the user to review conflicting, similar, or potentially equivalent names before choosing a term, merging entries, or renaming anything that depends on the decision.

During a dev session, keep the [project backlog](.workflow/backlog.md) current with project change requests from chat, including corrections and deferred follow-ups. Reconcile it with the dev session's conversation and work item records when starting or resuming work. Update scope, status, workflow stage, progress, blockers, and pending decisions throughout the workflow and before waiting for the user.
