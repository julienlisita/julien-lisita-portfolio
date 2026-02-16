// src/components/ui/Lead.tsx

'use client';
import clsx from 'clsx';
import './Paragraph.css';

type Props = React.HTMLAttributes<HTMLParagraphElement>;
export default function Lead({ className, ...rest }: Props) {
  return <p className={clsx('lead', className)} {...rest} />;
}
