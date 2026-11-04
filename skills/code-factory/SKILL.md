---
name: code-factory
description: Run the Code Factory workflow for a Git project when the user wants tiered plan approvals, per-step commit reviews, or to resume a Code Factory work item.
---

# Code Factory workflow

Work from the target repository root in the existing checkout and on its current branch. Keep workflow records in that repository and include them in reviewed Git changes. Read `.workflow/standards.md` before planning. If it is missing, create it with a `# Project standards` heading for standards accepted in retrospectives. Preserve existing standards and work items.

## 1. Capture and refine the idea

Create `.workflow/work-items/<stable-id>-<short-name>/` for a new item. In `idea.md`, capture the original request, the current brief, and open questions. Clarify material uncertainties with the user and record changes to the brief with their reasons. When resuming, read the existing brief, plan, and relevant step records to recover the approved scope and the next pending decision.

## 2. Build and review the overall plan

In `plan.md`, list reviewable steps with stable IDs, expected outcomes, verification methods, dependencies, tiers, and tier rationales. Use the highest tier that applies across complexity, impact, and uncertainty.

| Tier | Criteria | Approval |
| --- | --- | --- |
| 1 · Routine | Localized change with an obvious approach and a quick check. | Overall plan |
| 2 · Contained | Small behavior change in one area with a known test. | Overall plan |
| 3 · Coordinated | Change across several areas with a clear design and a practical way to verify and reverse it. | Overall plan |
| 4 · Consequential | Change to a public contract, permissions, or stored data, or a design decision that could materially change the outcome. | Overall plan and detailed step plan |
| 5 · High impact | Change with broad consequences or difficult recovery. | Overall plan and detailed step plan with rollout and recovery |

Show the full plan and wait for the user's approval before implementing any step. Record revisions, decisions, and the approved version. Set tiers 1–3 to **Approved** and keep tiers 4–5 at **Needs attention** until the user approves their detailed step plans.

Include known documentation changes in the overall plan. Follow the project's documentation structure. Where it has none, use `docs/architecture/` for architecture topics and `docs/guides/` for how-to topics. Add or update the corresponding link in `ARCHITECTURE.md` or `DOCUMENTATION.md` in the same reviewed step when using that layout.

## 3. Plan and implement each step

Pick a step whose dependencies are satisfied. Write its detailed plan in `steps/<step-id>-<short-name>.md` within the work item and check it against the approved overall plan. For tiers 1–3, proceed after this check. For tiers 4–5, show the changes, decisions for the user, affected areas, and verification method. For tier 5, include how to limit rollout impact and how to recover. Record feedback and wait for the user to approve the detailed plan before implementing it.

Pause a step if it rises to tier 4 or 5 or if its approved detailed plan materially changes. Record why and obtain approval for the revised detailed plan before continuing. If it adds work, follow the overall plan revision process first.

For newly discovered work, including small scope additions and documentation changes, propose a revised overall plan before implementing it. Show the new work, why it came up, its tier, and the affected steps. Keep the approved version identifiable while the revision is pending. Pause dependent work and continue independent approved steps where practical. Record the user's decision and apply the usual tier rules after approval.

## 4. Verify, review, and ask to commit

Review the diff against the approved outcome and run the agreed checks. Record the results, review feedback, and lessons worth discussing in the step file. Show the proposed commit diff, including relevant work log updates, the check results, and the proposed commit message. Describe the changes in plain words in at most two sentences. Ask **“Commit this step?”**

After explicit approval, commit only the reviewed changes on the current branch. If the user requests revisions or the reviewed diff changes, verify and present the updated diff for approval. Record the resulting commit hash in the step file and include it in the next approved log update for the work item.

## 5. Retrospective

After the planned steps are complete, review the lessons with the user. In `retrospective.md`, record which lessons to adopt, revisit, or dismiss and why. Add adopted lessons to `.workflow/standards.md` with what to do, when it applies, and why. Show the retrospective diff, including any standards updates and the final step's commit reference. Ask for approval before committing it on the current branch.
