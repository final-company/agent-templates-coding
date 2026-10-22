// Copyright 2026 Final, Inc.
// SPDX-License-Identifier: Apache-2.0

import { baseTools, credentials, defineAgent } from '@finalai/agents';
import { serverlessNanocodeCodex } from '@finalai/agents/harnesses';
import { computer } from './sandbox.js';

export default defineAgent({
  name: 'Codex',
  description: 'A minimal coding agent on the nanocode Codex harness, working on a Final computer.',
  tools: baseTools({ files: computer, shell: computer }),
  harness: serverlessNanocodeCodex({
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
