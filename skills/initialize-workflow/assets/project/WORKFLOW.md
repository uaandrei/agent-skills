# Code Factory workflow

Take every project change through the stages below. Stages are the parts of this workflow; steps are the parts of a large plan. Work from the repository root in the existing checkout and on its current branch. Keep work item records in the repository through stage 11 and include them in the commits you propose. After the workflow ends, completed work items may be deleted as described below.

Read [`.workflow/standards.md`](.workflow/standards.md) and [glossary.md](glossary.md) before you start or resume a work item. Apply the standards in every stage, from capturing the idea to committing. If a standard conflicts with the user's request, point out the conflict and ask how to proceed. Follow the naming rules in the project instructions whenever you introduce or rename a term, and include glossary edits in the same commit as the work that needs them.

## Backlog

Keep [`.workflow/backlog.md`](.workflow/backlog.md) current with project change requests from chat without waiting for the user to ask for a backlog update. Capture requests to fix, add, or change something, including corrections and deferred follow-ups. Update the existing entry when a request refines the same outcome; create separate entries for independently actionable requests. Record the requested outcome and relevant constraints in the notes. Questions or discussion without a requested project change do not need entries.

When starting or resuming work, reconcile the available conversation and work item records with the backlog: capture missing requests, apply the user's latest scope changes, and correct stale progress. Re-read the backlog before editing it and preserve the user's edits, stable IDs, and unrelated entries. Handle backlog-only requests as direct edits without a work item.

When starting a work item, record its backlog ID in `idea.md` and link the work item from the entry. Keep the status and notes current throughout the workflow:

| Status | When to use it | Progress to record in the notes |
| --- | --- | --- |
| **Open** | A request is captured but work has not started, or the user returns it to the backlog. | Requested outcome, constraints, and any reason for deferral. |
| **In progress** | Work starts in stage 1, through planning, implementation, confirmation, commits, and learnings review. | Current stage, current step for a large plan, latest checks and results, completed and remaining work, blockers, and pending user decisions or approvals. |
| **Done** | All planned work is confirmed and committed, and the learnings review is complete. | Completion summary and relevant commit hashes; include this status in the stage 11 commit. |
| **Closed** | The user withdraws or declines a request. | Reason for closure and any replacement entry. |

Update the entry as each stage or plan step progresses, when feedback changes the scope, when checks or commits change the result, and before pausing for the user. A failed check or pending approval stays **In progress** with the blocker or next action in the notes. Reopen a finished entry when the same outcome needs more work, or link a new entry for a separate follow-up.

Make these backlog updates as the events happen, without a separate approval step or waiting for a commit. Include them in the next commit approved under stage 8 or 11. Capturing a request in the backlog does not bypass the workflow's plan, implementation, or commit approvals.

## 1. Capture the idea

Create `.workflow/work-items/<id>-<short-name>/` using the next available three-digit ID, such as `007-fix-search-case`. Check existing work items and Git history so IDs from deleted work items are not reused. In `idea.md`, record the original request, the intended outcome, open questions, and the corresponding backlog ID. Create or update the backlog entry, link this work item, and mark it **In progress** with stage 1 in the notes. Ask the user about anything that would change the outcome and record their answers in the work item and backlog. When resuming, read the work item's files to find where it stopped and reconcile its backlog entry.

## 2. Assess whether the work is small or large

- **Small:** a focused change with a clear approach that fits in one commit.
- **Large:** work that should be reviewed in more than one commit, such as a change across several areas, a feature with separable parts, or work whose approach depends on earlier results.

If you are unsure, treat the work as large. Record the assessment and the reason in `plan.md`.

## 3. Small: propose a plan

In `plan.md`, describe the outcome, the changes and the files they affect, and how you will verify the result. Call out decisions the user needs to make and risks such as changes to public contracts, permissions, stored data, or anything hard to undo.

Include documentation and glossary updates in the plan. Follow the project's documentation structure. Where it has none, put architecture topics in `docs/architecture/` and how-to topics in `docs/guides/`, and update the links in `ARCHITECTURE.md` or `DOCUMENTATION.md` in the same commit.

## 4. Large: split into steps and propose a plan

In `plan.md`, state the overall outcome and split the work into ordered steps. Make each step small by the criteria in stage 2 so it can be implemented, confirmed, and committed on its own. For each step, give an ID, its outcome, the changes, how you will verify it, and the steps it depends on. Call out decisions, risks, and documentation updates as in stage 3.

## 5. Present the plan and ask to continue

Show the user the size assessment with its reason and the full plan. Ask **"Continue with this plan, or do you have feedback?"** If the user gives feedback, revise `plan.md` and present it again. Do not start implementing until the user says to continue. Mark the approved version in `plan.md`.

## 6. Implement the plan

Implement the approved plan and run the verification it describes. For a large plan, implement one step at a time in order and finish stages 7 and 8 for each step before starting the next.

If you find work outside the approved plan, or the approach needs to change, update the backlog, stop, and return to stage 5 with a revised plan that shows what changed and why. Add follow-ups you will not handle in this work item as separate **Open** backlog entries linked to the current work item.

## 7. Ask to confirm the implementation

Summarize the change in plain language so the user can judge it without reading the diff:

- **What changed and why:** the outcome and how it meets the plan.
- **Before → after:** concrete examples of the old and new behavior. For documentation edits, show the current and new wording.
- **Checks:** each planned check and its result. Say which checks passed, failed, or were not run, and which claims you checked only by reading the code.
- **Needs your attention:** decisions, remaining uncertainty, and risks, or "None".

For UI changes, include screenshots, a preview, or instructions the user can follow to try it. Offer the full diff on request. Ask **"Does this implementation look right?"** If the user asks for changes, make them and present the updated summary again.

## 8. Ask to commit

List the files to commit, including work item records and any glossary, backlog, or documentation edits, and the proposed commit message. Ask **"Commit this?"** After the user's explicit approval, commit only those files on the current branch.

Record the commit hash in `plan.md`; it goes into the next commit. For a large plan with steps remaining, return to stage 6 for the next step.

## 9. Study the context and extract learnings

After the last planned commit, review the whole work item: the conversation, the user's feedback and corrections, plan revisions, failed checks, and anything that was harder than expected. Extract learnings that would change how future work is done. For each, record in `learnings.md` what happened, the lesson, and how it would change future work. Leave out one-off facts that the code or docs already capture. Revisit any pending naming decisions in the glossary.

If there are no learnings, say so and continue to stage 11 to commit the remaining records.

## 10. Ask whether to standardize or discard each learning

Present the learnings and ask, for each one, whether to **standardize** or **discard** it. For each learning to standardize, propose a standard for `.workflow/standards.md` that states what to do, when it applies, and why. If it overlaps or conflicts with an existing standard, show both and ask whether to merge, replace, or keep them separate. Record each decision in `learnings.md`.

Standards are applied throughout this workflow, so a new standard takes effect from the next work item onward.

## 11. Ask to review and commit

Present the decisions in `learnings.md`, the standards changes as current wording → proposed wording, the backlog completion summary, the files to commit, and the proposed commit message. Ask **"Commit these learnings?"** If the user asks for changes, revise and ask again. After explicit approval, mark the backlog entry **Done** and commit on the current branch. If the commit fails, restore **In progress** and record the failure and next action in the notes.

## Completed work item cleanup

After a work item finishes stage 11, its directory under `.workflow/work-items/` may be deleted. Keep records for unfinished work items, including those whose implementation is done but whose confirmation, commits, or learnings review is still pending.

Keep adopted standards, glossary entries, project documentation, and backlog entries in their shared files. Before deleting a completed work item's directory, replace links to it in retained files with the Git commit hash containing its final records, so the history remains accessible. Include the deletions and reference updates in the next commit proposed and approved under stage 8.
