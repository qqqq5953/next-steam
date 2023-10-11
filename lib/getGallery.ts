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

export default async function getGallery(id: string): Promise<{ movies: MoviesResult, screenshots: ScreenshotsResult } | undefined> {
    try {
        const [moviesRes, screenshotsRes] = await Promise.all([
            fetch(`https://api.rawg.io/api/games/${id}/movies?key=${process.env.RAWG_API_KEY}`),
            fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.RAWG_API_KEY}`),
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
