import { ShortScreenshot, Trailer } from "@/types";

type MoviesResult = {
  "count": number,
  "next": null | string,
  "previous": null | string,
  "results": Trailer[]
}

type ScreenshotsResult = {
  "count": number,
  "next": null | string,
  "previous": null | string,
  "results": ShortScreenshot[]
}

export default async function getGallery({ id, name }: { id?: number, name?: string }): Promise<{ movies: MoviesResult, screenshots: ScreenshotsResult } | undefined> {
  try {
    const [moviesRes, screenshotsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/games/movies?nameOrGameId=${id ?? name}`),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/games/screenshots?nameOrGameId=${id ?? name}`),
    ]);

    if (!moviesRes.ok || !screenshotsRes.ok) {
      throw new Error('One or more requests failed');
    }

    const [movies, screenshots] = await Promise.all([moviesRes.json(), screenshotsRes.json()]);
    // console.log('movies:', movies);
    // console.log('screenshots:', screenshots);

    return { movies, screenshots }
  } catch (error) {
    if (error instanceof Error) console.log(error.stack)
  }
}
