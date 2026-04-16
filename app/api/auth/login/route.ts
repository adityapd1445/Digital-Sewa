import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  return NextResponse.json({ message: "Login endpoint available" });
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const { password: _, ...publicUser } = user.toObject();
  return NextResponse.json({ message: "Login successful", user: publicUser });
}