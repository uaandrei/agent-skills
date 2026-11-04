---
name: sync-workflow
description: Review workflow files, glossary entries, and relevant project docs against verified project evidence, then propose fixes for approval. Use for an existing project or after a code change, including AI-assisted work, when project docs or Code Factory workflow references may have drifted.
---

# Sync workflow

## Set the scope

- Identify the target repository and any requested package or feature. Read the applicable agent instructions, `WORKFLOW.md`, and `.workflow/standards.md` where present. If there is an active work item for this change, read its approved scope and pending decisions.
- For a sync in a project without an established Code Factory workflow, ask whether to run `initialize-workflow` first or continue with the existing docs. Wait for the answer before syncing. If the user chooses setup, use the installed initializer and read the resulting workflow rules before continuing. If the initializer is unavailable, explain how to install it and wait for setup or a decision to proceed with the existing docs. For an audit, report, or dry run, keep the work read-only and report whether setup is missing.
- For a recent change, use the requested branch, commits, or work item to bound the audit. Inspect relevant committed, staged, unstaged, and untracked changes. Use the working tree as the current state unless the user specifies another snapshot. If no reliable comparison point exists, inspect the current implementation in scope. For a general sync, review the project's documentation against its current implementation even when Git is clean.
- Use the project's existing documentation structure. Check workflow files for stale factual references, including `AGENTS.md`, `CLAUDE.md`, `WORKFLOW.md`, and `.workflow/standards.md` where present. Review `ARCHITECTURE.md`, `DOCUMENTATION.md`, the relevant architecture notes and guides they link to, and other relevant docs such as the README. Read the root `glossary.md` or the glossary named by the project. Report a missing glossary when the workflow expects one.

## Establish what changed

- Match each suspected mismatch to current evidence. Trace user-facing behavior through its real entry point and relevant tests. Check commands against manifests and task definitions, options and defaults against configuration and code, and architecture claims against module boundaries and data flow. Look for renamed or removed paths, commands, interfaces, and settings across the affected docs and examples. Treat an AI summary or a commit message as a pointer to evidence.
- Validate the glossary against its documented format and current project usage in code, configuration, tests, and docs. Check that entries have a canonical term and definition, and flag stale or unsupported definitions and aliases. Review all entries in a general sync. In a scoped sync, validate the affected terms and compare them with the full glossary.
- Check for repeated canonical terms, reused aliases, and names that appear as both a canonical term and an alias. Compare names ignoring case and extra whitespace, and look for similar names or different names that may describe the same concept. Cite the glossary entries and relevant usage. Ask the user to resolve ambiguous naming before choosing a canonical term, merging entries, or renaming references. Hold dependent edits and include any pending naming records required by the project in the proposed diff.
- Separate factual drift from project decisions. Preserve approval rules, accepted standards, and historical work items. For active workflow records, capture verified facts only when the existing process calls for them. Record approvals, completion, or commit references only when the underlying events are confirmed.
- Report a missing `.workflow/backlog.md` when the project workflow expects it. If a Code Factory project has that file, check that `WORKFLOW.md` covers direct backlog edits, capturing deferred follow-ups during work, and taking entries through the usual plan and reviews. Verify the backlog statuses and work-item links in scope against the project's rules and recorded work. Preserve user-entered items and priorities, and ask about ambiguous statuses before proposing edits.
- Ask concise clarifying questions when the answer could change an edit. For example, ask about a missing comparison point that affects scope, conflicting code and tests, a behavior that may be a regression, or a deployment-specific fact you cannot verify locally. Cite the conflicting evidence and explain the decision needed. Hold the affected edits while the answer is pending and continue independent checks.

## Propose changes and wait for approval

- If nothing is stale, report the checks and leave the working tree alone. For a read-only request, report the findings and show a proposed diff if requested. Otherwise, show a proposed unified diff for verified drift with the evidence for each change. Include any required planning records in the proposal. Prepare the diff without writing to the target project. Ask for explicit approval of the diff and wait before editing, even if an existing plan covers the work.
- After diff approval, follow any remaining project gates before applying the fixes. Create required planning records at this stage and use an existing approved plan if it covers the sync. If scope needs an extension, follow the project's revision process. Recheck the affected files before editing. If the proposed changes differ, show the revised diff and wait for approval again.

## Apply and verify

- Make focused edits that preserve existing guidance and unrelated working-tree changes. Keep indexes and their linked pages consistent in the same update. Use the project's generation process when the affected docs are generated. Leave source code and configuration changes for separately scoped work.
- Re-read each edited claim against its evidence. Recheck edited glossary entries against current usage and the full glossary. Check affected links, paths, and anchors, and run focused project checks or documented commands when they can be run safely and locally. Review the final diff against what the user approved and check for unrelated edits and stale references.
- Report what changed or what the audit found, with file references and checks run. Identify any unresolved questions, pending approvals, or claims that could only be checked by inspection. Stage or commit only with explicit authorization.
