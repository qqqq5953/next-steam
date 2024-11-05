import { NextRequest, NextResponse } from "next/server";

// export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
) {
  const query = request.nextUrl.searchParams.get("query");

  try {
    const response = await fetch(
      `https://rawg.io/api/collections?search=${query}&page_size=2&page=1&key=${process.env.RAWG_OFFICIAL_API_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json({ errorMsg: 'Failed to fetch collections data' });
    }

    const data = await response.json();
    return NextResponse.json(data)
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch collections data'
    }, { status: 500 })
  }
}