import { GameDetails } from "@/types";

const endpoints = [
  {
    name: "game",
    path: "",
  },
  {
    name: "same_series",
    path: "/game-series",
  },
  {
    name: "dlc",
    path: "/additions",
  },
  {
    name: "stores_link",
    path: "/stores",
  },
]

export default async function getGameDetails(name: string) {
  const apiPromises = endpoints.map((detail) =>
    fetch(`https://api.rawg.io/api/games/${name}${detail.path}?key=${process.env.RAWG_API_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${detail.name}`);
        }
        return response.json();
      })
      .catch((error) => {
        return { error: error.message, name: detail.name };
      })
  );

  const data: GameDetails = {
    game: null,
    same_series: null,
    dlc: null,
    stores_link: null,
    errors: []
  };

  try {
    const responses = await Promise.all(apiPromises);
    responses.forEach((res, index) => {
      if (res.error) {
        data.errors.push(res);
      } else {
        data[endpoints[index].name as keyof GameDetails] = res;
      }
    });
  } catch (error) {
    // Handle any unexpected error
    console.error('An unexpected error occurred:', error);

    if (error instanceof Error) {
      data.errors.push({ error: error.message, name: "unexpected error" });
    }
  }

  return data
}
