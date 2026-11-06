# Code Factory workflow

During a [dev session](#dev-sessions), take every project change through the stages below. Stages are the parts of this workflow; steps are the parts of a large plan. Work from the repository root in the existing checkout and on its current branch. Keep work item records in the repository through stage 11 and include them in the commits you propose. After the workflow ends, completed work items may be deleted as described below.

Read [`.workflow/standards.md`](.workflow/standards.md) and [glossary.md](glossary.md) before you start or resume a work item. Apply the standards in every stage, from capturing the idea to committing. If a standard conflicts with the user's request, point out the conflict and ask how to proceed. Follow the naming rules in the project instructions whenever you introduce or rename a term, and include glossary edits in the same commit as the work that needs them.

## Dev sessions

Apply this workflow only during a dev session. A dev session starts when the user invokes `start-dev` and lasts until they invoke `end-dev` or the conversation ends. A new conversation starts outside a dev session. The [manifesto](manifesto.md) applies both in and outside dev sessions.

Outside a dev session, handle requests directly. Do not create or update work items, capture requests in the backlog, update the glossary or standards, or ask for the workflow's plan, confirmation, or commit approvals unless the user asks for one of them. If a request would continue an **In progress** work item, ask whether to start a dev session first.

### Start a dev session

When the user invokes `start-dev`:

1. Read this workflow, [`.workflow/standards.md`](.workflow/standards.md), [glossary.md](glossary.md), and [`.workflow/backlog.md`](.workflow/backlog.md). Read them again whenever they are no longer in context during the session, such as after the conversation is summarized.
2. Reconcile the backlog with existing work item records as described in [Backlog](#backlog). Capture requests made earlier in the conversation, before the dev session started, only if the user brings them into the session.
3. If the user named a request with `start-dev`, start or resume its work item at stage 1. Otherwise, list the **In progress** entries with their current stage, step, and pending actions, and the **Open** entries, then ask what to work on.

If a dev session is already active, say so and continue it.

### End a dev session

When the user invokes `end-dev`:

1. Stop at the current point without starting another stage, plan step, check, or commit.
2. Update the records and backlog entry of each work item touched in this session with its current stage and step, completed and remaining work, latest check results, and pending decisions or approvals, so a later dev session can resume from them.
3. Report each of those work items' status and pending decisions or approvals, and list uncommitted changes, including these record updates. Do not commit them; they go into the next commit approved in a later dev session.
4. Tell the user the dev session has ended. Handle later requests in the conversation outside the workflow until the user invokes `start-dev` again.

If no dev session is active, say so and change nothing.

## Backlog

During a dev session, keep [`.workflow/backlog.md`](.workflow/backlog.md) current with project change requests from chat without waiting for the user to ask for a backlog update. Capture requests to fix, add, or change something, including corrections and deferred follow-ups. Update the existing entry when a request refines the same outcome; create separate entries for independently actionable requests. Record the requested outcome and relevant constraints in the notes. Questions or discussion without a requested project change do not need entries.

When starting or resuming work, reconcile the dev session's conversation and work item records with the backlog: capture missing requests, apply the user's latest scope changes, and correct stale progress. Re-read the backlog before editing it and preserve the user's edits, stable IDs, and unrelated entries. Handle backlog-only requests as direct edits without a work item.

When starting a work item, record its backlog ID in `idea.md` and link the work item from the entry. Keep the status and notes current throughout the workflow:

| Status | When to use it | Progress to record in the notes |
| --- | --- | --- |
| **Open** | A request is captured but work has not started, or the user returns it to the backlog. | Requested outcome, constraints, and any reason for deferral. |
| **In progress** | Work starts in stage 1, through planning, implementation, validation, confirmation, commits, and learnings review. | Current stage and implementation or validation phase, current step for a large plan, latest checks and results, completed and remaining work, blockers, and pending user decisions or approvals. |
| **Done** | All planned work is validated, confirmed, and committed, and the learnings review is complete. | Completion summary and relevant commit hashes; include this status in the stage 11 commit. |
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

In `plan.md`, describe the outcome and define two phases: **Implementation**, with the changes and the files they affect, and **Validation**, with concrete checks and the expected results that demonstrate the outcome. Choose validation appropriate to the change, such as targeted tests, build or static checks, manual behavior checks, UI previews, or documentation and link review. Call out decisions the user needs to make and risks such as changes to public contracts, permissions, stored data, or anything hard to undo.

Include documentation and glossary updates in the plan. Follow the project's documentation structure. Where it has none, put architecture topics in `docs/architecture/` and how-to topics in `docs/guides/`, and update the links in `ARCHITECTURE.md` or `DOCUMENTATION.md` in the same commit.

## 4. Large: split into steps and propose a plan

In `plan.md`, state the overall outcome and split the work into ordered steps. Make each step small by the criteria in stage 2 so it can be implemented, validated, confirmed, and committed on its own. For each step, give an ID, its outcome, the steps it depends on, an **Implementation** phase describing its changes, and a **Validation** phase with concrete checks and expected results as in stage 3. Include checks for the combined behavior as steps build on earlier work. Each step must finish validation, implementation confirmation, and its own commit approval before the next step starts. Call out decisions, risks, and documentation updates as in stage 3.

## 5. Present the plan and ask to continue

Show the user the size assessment with its reason and the full plan. Ask **"Continue with this plan, or do you have feedback?"** If the user gives feedback, revise `plan.md` and present it again. Do not start implementing until the user says to continue. Mark the approved version in `plan.md`.

## 6. Implement and validate the plan

For a small plan, complete both phases below for the whole plan. For a large plan, complete both phases for one step at a time in order, then finish stages 7 and 8 for that step before starting the next. Every plan or step implementation includes its own validation phase.

### Implementation phase

Implement the approved small plan or the current step of the approved large plan.

If you find work outside the approved plan, or the approach needs to change, update the backlog, stop, and return to stage 5 with a revised plan that shows what changed and why. Add follow-ups you will not handle in this work item as separate **Open** backlog entries linked to the current work item.

### Validation phase

Run the validation checks defined for this plan or step against the implementation. Record each check, its expected and actual results, and supporting evidence in `plan.md` under the relevant plan or step. Update the backlog with the validation phase, results, and any blockers.

Resolve failures and rerun the affected checks. If a required check cannot be completed, record the blocker and return to stage 5 to agree on a revised validation approach. Required checks must pass before asking for implementation confirmation or commit approval. Repeat validation after any implementation changes requested during review.

## 7. Ask to confirm the implementation

After validation passes, summarize the implemented plan or current step in plain language so the user can judge it without reading the diff. For a large plan, identify the step by its ID and outcome:

- **What changed and why:** the outcome and how it meets the plan.
- **Before → after:** concrete examples of the old and new behavior. For documentation edits, show the current and new wording.
- **Checks:** each planned validation check, its expected and actual results, and supporting evidence. Identify claims checked only by inspection and any optional checks not run, with the reason.
- **Needs your attention:** decisions, remaining uncertainty, and risks, or "None".

For UI changes, include screenshots, a preview, or instructions the user can follow to try it. Offer the full diff on request. Ask **"Does this implementation look right?"** If the user asks for changes, make them, repeat the validation phase in stage 6, and present the updated summary again.

## 8. Ask to commit

After the user confirms the validated implementation, list the files to commit, including work item records and any glossary, backlog, or documentation edits, and the proposed commit message. For a small plan, ask **"Commit this?"** For a large plan, identify the current step and ask **"Commit step `<id>`?"** after every step, including the last. Wait for explicit approval for this commit; approval of the plan or an earlier step does not approve it. After approval, commit only those files on the current branch.

Record the successful commit's hash in `plan.md` and update the backlog; these records go into the next commit. Start the next step only after the current step's validation, confirmation, explicit commit approval, and commit have all completed successfully. If approval is withheld or the commit fails, keep the current step **In progress** with the pending action in the backlog. For a large plan with steps remaining, return to stage 6 for the next step.

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
