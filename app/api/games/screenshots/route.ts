import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
) {
  const nameOrGameId = request.nextUrl.searchParams.get("nameOrGameId")

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${nameOrGameId}/screenshots?key=${process.env.RAWG_API_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json({ errorMsg: 'Failed to fetch game youtube' });
    }

    const data = await response.json();
    return NextResponse.json(data)
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch game youtube'
    }, { status: 500 })
  }
}