// Copyright 2026 Final, Inc.
// SPDX-License-Identifier: Apache-2.0

import { baseTools, credentials, defineAgent } from '@finalai/agents';
import { serverlessNanocodeCodex } from '@finalai/agents/harnesses';
import { device } from './sandbox.js';

export default defineAgent({
  name: 'Codex Local',
  description:
    "A minimal coding agent on the nanocode Codex harness, working on the person's Final Device.",
  tools: baseTools({ files: device, shell: device }),
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
