type Platform = {
  platform: {
    id: number
    name: string
    // image_background: string | null
    // year_start: number | null
    // year_end: number | null
  }
  // requirements_en: {
  //   minimum: string
  //   recommended: string
  // }
}
type Genre = {
  id: number
  name: string
  // image_background: string
}

type ShortScreenshot = {
  id: number
  image: string
}

type Game = {
  id: number
  slug: string
  name: string
  released: string
  background_image: string
  rating: number
  platforms: Platform[]
  genres: Genre[]
  short_screenshots: ShortScreenshot[]
  blurDataURL?: string | undefined
}
