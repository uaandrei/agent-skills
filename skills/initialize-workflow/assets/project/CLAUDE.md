Read and follow the imported manifesto first. Its rules are mandatory and take precedence over all other project instructions.
@manifesto.md

# Project instructions

Follow [WORKFLOW.md](WORKFLOW.md) for project changes only during a dev session, which starts when the user invokes `start-dev` and ends when they invoke `end-dev` or the conversation ends. When the user invokes either, read WORKFLOW.md and follow its dev session instructions. Outside a dev session, handle requests directly without the workflow.

Use [glossary.md](glossary.md) for canonical project terms. Include glossary edits in the same commit as the affected work, and ask the user to review conflicting, similar, or potentially equivalent names before choosing a term, merging entries, or renaming anything that depends on the decision.
