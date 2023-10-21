import Icon from '@/components/global/Icon'

export default function VideoLoader() {
  return <div className="bg-black/50 absolute inset-0 z-40 grid place-items-center">
    <Icon
      name="loader-2"
      useSuspense={false}
      size={108}
      strokeWidth={1}
      className="animate-spin text-white/50"
    />
  </div>
}
