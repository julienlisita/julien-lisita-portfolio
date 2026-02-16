// src/types/next.d.ts

import type { NextRequest } from 'next/server';
import type { JwtPayload } from '@/lib/jwt';

export type AuthedRequest = NextRequest & { user?: JwtPayload };
