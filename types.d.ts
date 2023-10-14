import { type } from "os"

type Platform = {
  platform: {
    id: number
    name: string
    // image_background: string | null
    // year_start: number | null
    // year_end: number | null
  }
  requirements: {
    minimum: string
    recommended: string
  }
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
  metacritic: number
  blurDataURL?: string | undefined
}

type GameSingle = Game & {
  description: string
  ratings: Rating[]
}

type Rating = {
  id: number,
  title: string,
  count: number,
  percent: number
}

type RatingColor = {
  exceptional: string,
  recommended: string,
  meh: string,
  skip: string,
}

type AgeRatingPrefix = {
  "Everyone": string,
  "Everyone 10+": string,
  "Teen": string,
  "Mature": string,
  "Adults only": string,
}

type Trailer = {
  id: number
  name: string
  preview: string
  data: {
    "480": string
    "max": string
  }
}