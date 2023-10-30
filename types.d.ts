import { type } from "os"

type Platform = {
  platform: {
    id: number
    name: string
    slug: string
  }
  requirements: {
    minimum: string
    recommended: string
  }
}

type Genre = {
  id: number
  name: string
  slug: string
  // image_background: string
}

type Developer = {
  id: number
  name: string
  slug: string
  image: string
  image_background: string
  games_count: number
  games: Game[]
  positions: {
    id: number
    name: string
    slug: string
  }[]
}

type Tag = {
  id: number
  name: string
  slug: string
}

type ShortScreenshot = {
  id: number
  image: string
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

type Store = {
  store: {
    id: number
    name: string
  }
}

type StoreLink = {
  count: number,
  next: string | null,
  previous: string | null,
  results: { store_id: number, url: string }[]
}

type SameSeries = {
  count: number,
  next: string | null,
  previous: string | null,
  results: { id: number, slug: string, name: string }[]
}

type DLC = {
  count: number,
  next: string | null,
  previous: string | null,
  results: { id: number, slug: string, name: string }[]
}

type GameDetails = {
  game: GameSingle | null,
  same_series: SameSeries | null,
  dlc: DLC | null,
  stores_link: StoreLink | null,
  errors: { error: string, name: string }[]
}

type Game = {
  id: number
  slug: string
  name: string
  released: string
  background_image: string
  tba: string
  rating: number
  platforms: Platform[]
  developers: {
    id: number
    name: string
    slug: string
  }[]
  publishers: {
    id: number
    name: string
    slug: string
  }[]
  genres: Genre[]
  short_screenshots: ShortScreenshot[]
  tags: Tag[]
  metacritic: number
  playtime: number
  website: string
  esrb_rating: { id: number, name: string, slug: string }
  blurDataURL?: string | undefined
}

type GameSingle = Game & {
  description: string
  ratings: Rating[],
  stores: Store[]
}