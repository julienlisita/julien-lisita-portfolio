// src/components/ui/Paragraph.tsx

import clsx from 'clsx';
import './Paragraph.css';

type Props = React.HTMLAttributes<HTMLParagraphElement>;
export default function Paragraph({ className, ...rest }: Props) {
  return <p className={clsx('para', className)} {...rest} />;
}
