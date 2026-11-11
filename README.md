# Final coding agent templates

Minimal coding agents built with the `@finalai/agents` SDK. Each adds as little configuration as possible so the harness's own behavior does the work.

| Module | Agent | Permission ceiling | Recommended harness |
| --- | --- | --- | --- |
| [`src/nanocode-claude-code/agent.ts`](src/nanocode-claude-code/agent.ts) | Claude Code | `auto` | `serverless-nanocode-claude` |
| [`src/nanocode-codex/agent.ts`](src/nanocode-codex/agent.ts) | Codex | `review` | `serverless-nanocode-codex` |

Each module exports `agent`, a definition that states what the agent needs and nothing about where it runs:

- **Harness.** A permission ceiling and a recommended harness. The recommendation binds nobody, and no model is recommended: whoever starts the agent passes the harness settings, including the model and how inference is paid for.
- **Compute.** `files` (write) and `shell` (execute), provided together by one sandbox.
- **Integrations.** One slot, `final`, for Final's tools and the project's connected apps.

Whoever starts a session provides each of these. For example, with an API key:

```ts
import { createClient } from '@finalai/agents/client';
import { finalCredits, serverlessNanocodeClaude } from '@finalai/agents/harnesses';
import { finalGateway } from '@finalai/agents/integrations';
import { agent } from './src/nanocode-claude-code/agent.ts';

const apiKey = process.env.FINAL_API_KEY;
if (apiKey == null) throw new Error('Set FINAL_API_KEY');

const client = createClient({ auth: { apiKey } });
const project = client.project({ id: 'prj_01JENGINEERING' });
const gateway = await project.integrations.create(finalGateway());

const { response } = await project.sessions.create({
  agent,
  provide: {
    harness: serverlessNanocodeClaude({ model: 'claude-opus-5-5', inference: finalCredits() }),
    integrations: { final: gateway },
  },
  message: 'Add a --verbose flag to the CLI.',
});
console.log(await response?.text());
```

Compute left out of `provide` runs in the process that creates the session, so here the model's files and shell are on this machine. Provide a sandbox for both `files` and `shell` to run them elsewhere.

## Development

Requires Node.js 26.10+ and pnpm 12.14.0.

```sh
pnpm install
pnpm run format:check
pnpm run typecheck
pnpm run print
```

`pnpm run print` loads each agent and checks that it produces a valid document. To see one, run `pnpm exec final-agents print src/nanocode-codex/agent.ts`.

## License

Licensed under the [Apache License, Version 2.0](LICENSE). Copyright 2026 Final, Inc. See [NOTICE](NOTICE).
