import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
) {
  const name = request.nextUrl.searchParams.get("name")
  const gameId = request.nextUrl.searchParams.get("gameId")

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${name ?? gameId}/development-team?page_size=5&key=${process.env.RAWG_API_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch game movie' });
    }

    const data = await response.json();
    return NextResponse.json(data)
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch game movie'
    }, { status: 500 })
  }
}