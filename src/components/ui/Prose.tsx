// src/components/ui/Prose.tsx

import clsx from 'clsx';
import './Prose.css';

type Props = React.HTMLAttributes<HTMLDivElement>;
export default function Prose({ className, ...rest }: Props) {
  return <div className={clsx('prose-content', className)} {...rest} />;
}
