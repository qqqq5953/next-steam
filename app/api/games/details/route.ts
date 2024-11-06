import { NextRequest, NextResponse } from "next/server";

// export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest
) {
  const name = request.nextUrl.searchParams.get("name")

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${name}?key=${process.env.RAWG_API_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json({ errorMsg: 'Failed to fetch game detail' });
    }

    const data = await response.json();
    return NextResponse.json(data)
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch game detail'
    }, { status: 500 })
  }
}