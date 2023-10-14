import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  title?: string
  spanNum: string
  children: ReactNode
  className?: string
  style?: object
}

export default function GridColumnContainer({
  title,
  spanNum,
  children,
  className,
  style
}: Props) {
  const spanObj = {
    '1': 'col-span-1',
    '2': 'col-span-2'
  }

  return (
    <div className={twMerge(spanObj[spanNum as keyof typeof spanObj] || 'col-span-1', className)} style={style}>
      <h4 className="text-neutral-500/60 pb-2 text-sm">{title}</h4>
      <div className='font-light'>{children}</div>
    </div>
  )
}
