# AI agent workflow

Code Factory is a portable Codex skill for taking a project change from idea and tiered plan approval through step-by-step review, commits, and a retrospective. [Workflow instructions](skills/code-factory/SKILL.md)

## Install in a project

From the root of the target Git repository, copy the skill folder into the project's `.agents/skills/` directory. Replace the source path with the location of this checkout.

```sh
mkdir -p .agents/skills &&
  cp -R "/path/to/code-factory/skills/code-factory" .agents/skills/
```

Open the target project in Codex and start a chat with the skill.

```text
$code-factory Plan and implement <your change>.
```

On first use, the skill creates the workflow records it needs under `.workflow/` in the target project. To pick up an existing item, invoke `$code-factory` with its work-item ID.
