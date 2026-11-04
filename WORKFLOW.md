# AI agent workflow

Use the existing checkout and its current branch for all work and commits. Read the [project standards](.workflow/standards.md) before planning. Keep records specific to this project and track them in Git.

## 1. Capture and refine the idea

Create a folder under [.workflow/work-items/](.workflow/work-items/) with a stable ID and a short name. In `idea.md`, capture the original request, the current brief, and any open questions. Clarify the intended outcome with the user and record material changes with their reasons.

## 2. Build and review the overall plan

In `plan.md`, list every reviewable step. For each step, record the expected outcome, verification method, dependencies, tier, and tier rationale. Classify each step by the highest tier that applies across complexity, impact, and uncertainty.

| Tier | Criteria | Approval |
| --- | --- | --- |
| 1 · Routine | Localized change with an obvious approach and a quick check. | Approved with the overall plan. |
| 2 · Contained | Small behavior change in one area with a known way to test it. | Approved with the overall plan. |
| 3 · Coordinated | Change across several areas with a clear design and a practical way to verify and reverse it. | Approved with the overall plan. |
| 4 · Consequential | Change to a public contract, permissions, or stored data, or a design decision that could materially change the outcome. | Needs attention. The user approves the detailed step plan. |
| 5 · High impact | Change with broad consequences or difficult recovery. | Needs attention. The user approves the detailed step plan, including rollout and recovery. |

Show the user the full plan and wait for approval before starting any step. Record requested revisions, decisions, and the approved plan version. Once approved, tiers 1–3 are **Approved** and tiers 4–5 remain **Needs attention** until the user approves their detailed step plans.

## 3. Plan and implement each step

Pick a step whose dependencies are satisfied. Write its plan in `steps/<step-id>-<short-name>.md` and review it against the approved overall plan. For tiers 1–3, the agent can proceed after this review.

For tiers 4–5, show the user what will change, which decisions need their judgment, what could be affected, and how the result will be verified. For tier 5, also show how the rollout will limit impact and what recovery options exist. Record feedback and wait for the user to approve the detailed plan before implementing it.

Pause a step if its tier rises to 4 or 5 or if its approved detailed plan materially changes. Record the reason and get the user's approval of the revised detailed plan before continuing. If the change adds work, follow the overall plan review below first.

### New work discovered mid-plan

Get the user's approval for every newly discovered task before starting it, including small additions within an approved step. Propose a revised overall plan that highlights the new work, why it came up, its tier, and the steps it affects. Record the user's decision. Pause dependent work while the decision is pending. Independent approved steps can continue. Once the revised plan is approved, the usual tier rules apply.

### Project documentation

Include known documentation changes in the overall plan. Organize detailed files by project topic under `docs/architecture/` or `docs/guides/`, and add or update the link in [ARCHITECTURE.md](ARCHITECTURE.md) or [DOCUMENTATION.md](DOCUMENTATION.md) in the same reviewed step. Bring newly discovered documentation work through overall plan review.

## 4. Verify, review, and ask to commit

After implementing the step, review the diff against the approved outcome and run the agreed checks. Record results, review feedback, and any lesson worth taking to the retrospective. Show the user the diff, including the relevant work log updates, the check results, and the proposed commit message. Use plain words and at most two sentences to describe the changes. Ask **“Commit this step?”**

After explicit approval, commit only the reviewed changes on the current branch. If the user requests revisions, update the step, verify the revised diff, and ask again. Record the resulting hash in the step file and include it in the next approved log update.

## 5. Retrospective

Review the lessons with the user after the planned steps are complete. In `retrospective.md`, record which lessons to adopt, revisit, or dismiss, and why. Add adopted lessons to the project standards. Show the user the retrospective diff, including any standards updates and the final step's commit reference, and ask for approval before committing it on the current branch.
