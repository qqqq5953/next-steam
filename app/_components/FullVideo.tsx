import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/base-ui/Sheet'

export default function FullVideo() {
  return <SheetContent className="bg-white rounded-2xl text-black">
    <SheetHeader className="relative">
      <SheetTitle className="text-2xl text-left">Home</SheetTitle>
      <SheetTitle className="text-2xl text-left">Browse</SheetTitle>
    </SheetHeader>
  </SheetContent>
}
