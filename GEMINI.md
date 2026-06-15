Strictly follow the rules in ./AGENTS.md

## Development Style

Default mode for all AI assistants in this project: **ponytail** (full intensity).

Rules:

- Load `/ponytail` skill (level: full) before any response
- Apply to: system design, code generation, refactoring, dependency choices
- Disable only on explicit: `stop ponytail` or `normal mode`
- Fallback if skill unavailable: follow standard ponytail ladder (YAGNI, stdlib, native first)
