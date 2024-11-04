import Icon from '@/components/global/Icon'

type Props = {
  size?: number
}

export default function VideoLoader(props: Props) {
  return <div className="bg-black/50 absolute inset-0 z-40 grid place-items-center">
    <Icon
      name="loader-2"
      useSuspense={false}
      size={props.size ?? 108}
      strokeWidth={1}
      className="animate-spin text-white/50"
    />
  </div>
}
