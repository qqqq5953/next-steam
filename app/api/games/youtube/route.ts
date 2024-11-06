import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
) {
  const name = request.nextUrl.searchParams.get("name")

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${name}/youtube?page_size=12&key=${process.env.RAWG_OFFICIAL_API_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch game youtube' });
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