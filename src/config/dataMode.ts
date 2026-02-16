// src/config/dataMode.ts
type DataMode = 'static' | 'db';

export const DATA_MODE: DataMode =
  (process.env.NEXT_PUBLIC_DATA_MODE as DataMode) ||
  (process.env.DATA_MODE as DataMode) ||
  'static';

export const IS_DB = DATA_MODE === 'db';

// Exports utiles aux pages
export const PAGE_DYNAMIC = IS_DB ? 'force-dynamic' : ('error' as const);
export const PAGE_RUNTIME = IS_DB ? 'nodejs' : ('edge' as const);
export const PAGE_REVALIDATE = IS_DB ? 0 : (false as const);
