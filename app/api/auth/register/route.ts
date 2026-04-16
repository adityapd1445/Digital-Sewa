import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    // later we will save to MongoDB
    return NextResponse.json({
      message: "User registered successfully",
      user: { name, email },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error in registration" },
      { status: 500 }
    );
  }
}