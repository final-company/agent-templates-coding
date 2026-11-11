// Copyright 2026 Final, Inc.
// SPDX-License-Identifier: Apache-2.0

import { defineAgent, markdown } from '@finalai/agents';
import { FinalHarness } from '@finalai/agents/harnesses';

export const agent = defineAgent({
  name: 'Codex',
  description: 'A coding agent on the Codex harness.',
  instructions: markdown('./instructions.md', { from: import.meta.url }),
  require: {
    // No model is recommended: whoever starts the agent picks one.
    harness: {
      permissionMode: 'review',
      recommended: { harness: FinalHarness.ServerlessNanocodeCodex },
    },
    compute: { files: 'write', shell: 'execute' },
    integrations: { final: { description: "Final's tools and the project's connected apps." } },
  },
});
