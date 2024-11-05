import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
) {

  try {
    const query = request.nextUrl.searchParams.get("query");

    const response = await fetch(
      `https://rawg.io/api/games?search=${query}&page_size=20&page=1&key=${process.env.RAWG_OFFICIAL_API_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json({ errorMsg: 'Failed to fetch game data' });
    }

    const data = await response.json();
    return NextResponse.json(data)
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch game data'
    }, { status: 500 })
  }
}