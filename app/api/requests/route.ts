import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  return NextResponse.json({
    message: "Request submitted",
    data,
  });
}

export async function GET() {
  return NextResponse.json({
    requests: [],
  });
}