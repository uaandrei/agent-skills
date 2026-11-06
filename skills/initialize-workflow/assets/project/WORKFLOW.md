# Code Factory workflow

During a [dev session](#dev-sessions), take every project change through four stages: **capture the idea → plan the idea → review the plan → implement the plan with validation**. Each idea is tracked in a [work item](#work-items). Work in the existing checkout on its current branch.

## Dev sessions

A dev session starts when the user invokes `start-dev` and lasts until they invoke `end-dev` or the conversation ends. A new conversation starts outside one. The [manifesto](manifesto.md) applies both in and outside dev sessions.

Outside a dev session, handle requests directly: don't create or update work items or standards, and don't ask for the workflow's approvals unless the user asks. If a request would continue an **In progress** work item, ask whether to start a dev session first.

### Start a dev session

When the user invokes `start-dev`:

1. Read this workflow and the status lines of the work items in `.workflow/work-items/`. Read this workflow again whenever it is no longer in context, such as after the conversation is summarized.
2. If the user named a request, capture it in stage 1, or resume its work item from the stage in its status line. Otherwise, list the **In progress** work items with their next action and the **Open** ones, and ask what to work on.

If a dev session is already active, say so and continue it.

### End a dev session

When the user invokes `end-dev`:

1. **Stop.** Don't start another stage, plan step, check, or commit.
2. **Record progress.** Update the status line of each work item touched in this session with where it stopped and the next action, so a later session can resume.
3. **Propose learnings.** Review the session's chat from `start-dev` onward; where it was summarized, use the summary and the work items. Look at the user's corrections and feedback, plan revisions, failed checks, and anything that was harder than expected or that the workflow made awkward. Propose each lesson that would change future work, and leave out one-off facts the code or docs already capture. For each learning, state what happened, the lesson, and where it should go:
   - **Standard:** a rule for project work, such as a convention, a testing practice, or a design constraint. Propose its wording for [`.workflow/standards.md`](.workflow/standards.md): what to do, when it applies, and why. Standards are applied when planning.
   - **Workflow:** an improvement to how dev sessions run, such as a stage, a question, or a check. Propose the edit to this file as current wording → proposed wording.

   If a learning overlaps or conflicts with an existing standard or workflow rule, show both. Ask the user to accept, revise, or discard each learning, then apply the accepted ones. If there are no learnings, say so.
4. **Offer to commit.** List the uncommitted changes and ask **"Commit the session records?"** for the standards, workflow, and work item changes. Leave unfinished implementation changes uncommitted unless the user says otherwise. Commit only after explicit approval.
5. Tell the user the dev session has ended, and handle later requests outside the workflow.

If no dev session is active, say so and change nothing.

## 1. Capture the idea

Capture project change requests from the chat as work items without waiting to be asked: fixes, additions, and changes, including corrections and deferred follow-ups. Update the existing work item when a request refines the same outcome; otherwise create one. Under **Idea**, record the request, the intended outcome, and constraints. Questions and discussion don't need work items.

When you start work on an item, mark it **In progress**, ask the user about anything that would change the outcome, and record the answers under **Idea**.

## 2. Plan the idea

Read [`.workflow/standards.md`](.workflow/standards.md) and [glossary.md](glossary.md). Under **Plan** in the work item, state:

- **Outcome:** what will be true when the work is done.
- **Changes:** what to change and in which files, including documentation and glossary updates.
- **Validation:** concrete checks with expected results that show the outcome is reached, such as targeted tests, build or static checks, manual or UI checks, or link review.
- **Standards:** the standards that apply and how the plan follows them. If a standard conflicts with the request, say so.
- **Decisions and risks:** what the user needs to decide, and anything risky or hard to undo, such as changes to public contracts, permissions, or stored data.

If the work should land in more than one commit, split it into ordered steps, each with its own changes and validation.

## 3. Review the plan

Present the plan and ask **"Continue with this plan, or do you have feedback?"** Revise it until the user says to continue, then mark it approved. Don't implement before that.

## 4. Implement the plan with validation

Implement the approved plan, one step at a time if it has steps. Run the plan's validation checks and record each check's expected and actual result under **Results**. Fix failures and rerun the affected checks. If the approach must change, a check can't be run, or you find work outside the plan, stop and return to stage 3 with a revised plan that shows what changed and why. Capture follow-ups you won't handle now as **Open** work items.

When the checks pass, summarize the change so the user can judge it without reading the diff:

- **What changed and why**
- **Before → after:** concrete examples of the old and new behavior or wording.
- **Checks:** each check with its expected and actual result. Identify anything checked only by inspection.
- **Needs your attention:** open decisions and risks, or "None".

For UI changes, include screenshots, a preview, or steps to try it. Offer the full diff on request. List the files to commit and the proposed commit message, and ask **"Commit this?"**, or **"Commit step `<id>`?"** for a plan with steps. If the user asks for changes, make them, rerun the checks, and present the summary again. Commit only after explicit approval of this commit. In the last commit, mark the work item **Done**.

After each commit, record its hash under **Results**; this record goes into the next commit. Start the next step only after the current one is committed.

## Work items

Each idea is one file in `.workflow/work-items/`, named `<id>-<short-name>.md` with the next unused three-digit ID, such as `007-fix-search-case.md`. Give it a title, a status line, and the sections **Idea**, **Plan**, and **Results**, filled in as the stages progress:

```markdown
# 007 Fix search case

**Status:** In progress. Stage 4, step 2; next: run the UI check.

## Idea
## Plan
## Results
```

Keep the status line current as work progresses and before you wait for the user, without asking for approval; these edits go into the next approved commit. Preserve the user's edits to work items.

| Status | Meaning | Status line also gives |
| --- | --- | --- |
| **Open** | Captured but not started, or deferred. | Any reason for deferral. |
| **In progress** | Being worked on in stages 1–4. | Current stage and step, and the next action or pending approval. |
| **Done** | All planned work is validated and committed. | A short summary. |
| **Closed** | Withdrawn or declined. | The reason and any replacement work item. |
