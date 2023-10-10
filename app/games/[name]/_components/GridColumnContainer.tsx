import { ReactNode } from 'react'

type Props = {
  title: string
  spanNum: string
  children: ReactNode
  className?: string
}

export default function GridColumnContainer({
  title,
  spanNum,
  children,
  className
}: Props) {
  const spanObj = {
    '1': 'col-span-1',
    '2': 'col-span-2'
  }

  return (
    <div className={spanObj[spanNum as keyof typeof spanObj] || 'col-span-1'}>
      <h4 className="text-neutral-500/60 pb-2 text-sm">{title}</h4>
      <div className={className || 'font-light'}>{children}</div>
    </div>
  )
}
