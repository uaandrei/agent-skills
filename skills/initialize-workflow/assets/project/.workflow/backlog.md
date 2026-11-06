# Project backlog

Add or edit rows to track issues and features. Give each new entry the next available ID in the `B-001` format. Keep the ID when editing an entry and retain finished entries so their references still resolve. Order open entries by priority if useful.

Capture project change requests from chat automatically, including corrections and deferred follow-ups. Re-read the backlog before editing it, update an existing entry when it covers the same outcome, and preserve the user's edits. Reconcile the available conversation and work item records with these entries when starting or resuming work.

Use **Issue** for a defect and **Feature** for an addition or other project change. Start new entries as **Open**. Set **In progress** when stage 1 begins, and keep it through planning, implementation, confirmation, commits, and learnings review. Mark **Done** in the stage 11 commit after all planned work and the learnings review are complete. Use **Closed** for withdrawn or declined items and record the reason. Return an entry to **Open** when the user defers it, or **In progress** when the same outcome needs more work.

Update the notes as work progresses with the requested outcome and constraints, work item link, current workflow stage and plan step, checks and results, remaining work, blockers, pending decisions or approvals, and relevant commit hashes. Update entries before waiting for the user; do not wait for a commit to record progress. A failed check or pending approval stays **In progress** with the next action in the notes. Include backlog edits in the next approved commit.

If a completed work item's directory is deleted, replace its link with the Git commit hash containing its final records. [Workflow instructions](../WORKFLOW.md#backlog)

| ID | Type | Title | Status | Notes and links |
| --- | --- | --- | --- | --- |
