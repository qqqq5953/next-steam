import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest
) {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/stores?key=${process.env.RAWG_API_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json({ errorMsg: 'Failed to fetch stores data' });
    }

    const data = await response.json();
    return NextResponse.json(data)
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch stores data'
    }, { status: 500 })
  }
}