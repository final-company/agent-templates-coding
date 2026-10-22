# Final coding agent templates

Minimal coding agents built with the `@finalai/agents` SDK, one per harness and workspace. Each adds as little configuration as possible so the harness's own behavior does the work.

| Directory | Agent | Works on |
| --- | --- | --- |
| [`src/nanocode-claude-code`](src/nanocode-claude-code) | Claude Code | Final computer |
| [`src/nanocode-claude-code-local`](src/nanocode-claude-code-local) | Claude Code Local | Final Device |
| [`src/nanocode-codex`](src/nanocode-codex) | Codex | Final computer |
| [`src/nanocode-codex-local`](src/nanocode-codex-local) | Codex Local | Final Device |

## Development

Requires Node.js 26.10+ and pnpm 12.14.0.

```sh
pnpm install
pnpm run format:check
pnpm run typecheck
pnpm run build
```

## License

Licensed under the [Apache License, Version 2.0](LICENSE). Copyright 2026 Final, Inc. See [NOTICE](NOTICE).
