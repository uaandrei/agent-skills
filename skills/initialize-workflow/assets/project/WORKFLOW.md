# Code Factory workflow

Work from the target repository root in the existing checkout and on its current branch. Keep workflow records in that repository and include them in reviewed Git changes. Read `.workflow/standards.md` before planning. If it is missing, create it with a `# Project standards` heading for standards accepted in retrospectives. Preserve existing standards and work items.

Read [glossary.md](glossary.md) when starting or resuming a work item. Apply the naming review rules from the project instructions during idea refinement, planning, and implementation. Include glossary changes in the same reviewed step as the work that introduces or changes the terms. Check the glossary during step verification and revisit outstanding naming decisions in the retrospective.

## Backlog

Use [`.workflow/backlog.md`](.workflow/backlog.md) to track issues and feature ideas. The user can edit the file directly or ask the agent to maintain it. Handle backlog-only requests as direct edits. Re-read the backlog before editing, update an existing entry when it covers the same work, and preserve unrelated user edits.

During a work item, capture deferred follow-ups with enough context to revisit them and link to the source work item where relevant. Include backlog updates in the relevant step or retrospective review. Use the overall plan revision process for newly discovered work that needs to be done in the current work item.

When the user selects a backlog entry to implement, record its ID in `idea.md` and link to the work item from the entry. Follow the usual plan and approvals. Mark the entry **In progress** in the first implementation step's review. Mark it **Done** in the retrospective once the work is verified and all planned steps are committed.

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

For newly discovered work you intend to take on in the current work item, including small scope additions and documentation changes, propose a revised overall plan before implementing it. Show the new work, why it came up, its tier, and the affected steps. Keep the approved version identifiable while the revision is pending. Pause dependent work and continue independent approved steps where practical. Record the user's decision and apply the usual tier rules after approval.

## 4. Verify, review, and ask to commit

Review the diff against the approved outcome and run the agreed checks. Record the results, review feedback, and lessons worth discussing in the step file. Present a review brief in plain language so the user can understand and assess the change before opening the diff. Scale the explanation to the change's complexity and cover:

- **What changed and why:** Explain the outcome and how it meets the approved step.
- **Before → after:** Give concrete examples of the old and new behavior. For documentation edits, show the current and proposed wording with the reason for the correction.
- **Acceptance checks:** List each agreed outcome with its check result and supporting evidence. Distinguish checks that passed, failed, or were not run, and identify claims checked only by inspection.
- **Needs your attention:** Identify decisions, remaining uncertainty, and material risks. State when none remain.
- **Scope and details:** List the files included in the proposed commit, including relevant work log updates, and link to the code or documentation that supports the explanation. Make the full proposed commit diff available through a working link, an expandable view, or on request.
- **Proposed commit message:** Give the message for the changes being reviewed.

For UI changes, include screenshots, a preview, or a walkthrough the user can follow, and state what was actually inspected. For tiers 4–5, explain affected contracts, permissions, or data and how to recover; for tier 5, include rollout controls. Keep the brief and supporting diff aligned with the same proposed commit. Ask **“Commit this step?”**

After explicit approval, commit only the reviewed changes on the current branch. If the user requests revisions or the reviewed diff changes, verify and present the updated review brief with its supporting diff available for approval again. Record the resulting commit hash in the step file and include it in the next approved log update for the work item.

## 5. Retrospective

After the planned steps are complete, review the lessons with the user. In `retrospective.md`, record which lessons to adopt, revisit, or dismiss and why. Add adopted lessons to `.workflow/standards.md` with what to do, when it applies, and why. Use the review brief format from step 4: for each lesson, show the experience that supports it, the proposed decision, and how adopting it would change future work. Show the current and proposed standards wording where applicable, identify decisions still needing the user, and include the final step's commit reference in the review. List the files to commit, provide the proposed commit message, and make the full retrospective diff available as supporting detail. Ask for approval before committing it on the current branch. If the proposed changes differ after review, update the brief and supporting diff and obtain approval again.
