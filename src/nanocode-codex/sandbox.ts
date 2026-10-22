// Copyright 2026 Final, Inc.
// SPDX-License-Identifier: Apache-2.0

import { computer as computerEnvironment } from '@finalai/agents/sandboxes';

// The organization's default Final computer, with a workspace scoped to this session.
export const computer = computerEnvironment({ workspace: 'session' });
