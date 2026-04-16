import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  return NextResponse.json({ message: "Register endpoint available" });
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, password } = body as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already registered" },
        { status: 409 }
      );
    }

    const newUser = await User.create({ name, email, password });
    const { password: _, ...publicUser } = newUser.toObject();

    return NextResponse.json({
      message: "User registered successfully",
      user: publicUser,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error in registration" },
      { status: 500 }
    );
  }
}