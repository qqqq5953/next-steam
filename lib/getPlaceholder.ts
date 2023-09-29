import { getPlaiceholder } from 'plaiceholder'

export async function getBase64(url: string) {
  try {
    if (!url) return
    const res = await fetch(url)
    if (!res.ok)
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText} `)
    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const { base64 } = await getPlaiceholder(buffer)

    return base64
  } catch (err) {
    console.log('getBase64 error', err)
  }
}

export async function addBlurredDataURL(games: Game[]): Promise<Game[]> {
  const base64Promise = games.map((game) => getBase64(game.background_image))
  const base64Results = await Promise.all(base64Promise)

  const blurDataURL = games.map((game, i) => {
    game.blurDataURL = base64Results[i]
    return game
  })

  return blurDataURL
}
