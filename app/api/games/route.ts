import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
) {

  try {
    const order = request.nextUrl.searchParams.get("ordering");
    const platform = request.nextUrl.searchParams.get("parent_platforms");
    const page = request.nextUrl.searchParams.get("page");

    const response = await fetch(
      `https://api.rawg.io/api/games?ordering=${order}&parent_platforms=${platform}&page_size=12&page=${page}&key=${process.env.RAWG_API_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch data' });
    }

    const data = await response.json();
    return NextResponse.json(data)
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch about data'
    }, { status: 500 })
  }
}