import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === "admin@gmail.com" && password === "123456") {
    return NextResponse.json({ message: "Login successful" });
  }

  return NextResponse.json(
    { message: "Invalid credentials" },
    { status: 401 }
  );
}