// src/app/admin/news/page.tsx

import NewsAdmin from '@/screens/admin/NewsAdmin';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Administration – Actualités' };

export default function NewsAdminPage() {
  return <NewsAdmin />;
}
