// Copyright 2026 Final, Inc.
// SPDX-License-Identifier: Apache-2.0

import { baseTools, credentials, defineAgent } from '@finalai/agents';
import { serverlessNanocodeClaude } from '@finalai/agents/harnesses';
import { computer } from './sandbox.js';

export default defineAgent({
  name: 'Claude Code',
  description:
    'A minimal coding agent on the nanocode Claude Code harness, working on a Final computer.',
  tools: baseTools({ files: computer, shell: computer }),
  harness: serverlessNanocodeClaude({
    credentials: credentials.chain({
      payer: 'prompting-user',
      tryInOrder: [
        credentials.subscription({ owner: 'payer' }),
        credentials.apiKey({ owner: 'organization' }),
        credentials.platform(),
      ],
    }),
  }),
});
