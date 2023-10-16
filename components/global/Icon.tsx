import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { Suspense } from 'react';

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
  useSuspense?: boolean;
}

const fallback = <div className='bg-neutral-500 rounded-lg w-6 h-6' />

export default function Icon({ name, useSuspense = true, ...props }: IconProps) {
  const LucideIcon = dynamic(dynamicIconImports[name])

  if (useSuspense) {
    return <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  } else {
    return <LucideIcon {...props} />
  }
};