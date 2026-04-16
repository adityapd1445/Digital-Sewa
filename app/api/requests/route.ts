import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Request from "@/models/Request";

export async function GET() {
  await connectDB();
  const requests = await Request.find();
  return NextResponse.json({ requests });
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const { title, description, category } = body as {
    title?: string;
    description?: string;
    category?: string;
  };

  if (!title || !description || !category) {
    return NextResponse.json(
      { message: "Title, description, and category are required" },
      { status: 400 }
    );
  }

  const newRequest = await Request.create({ title, description, category });
  return NextResponse.json({
    message: "Request saved",
    data: newRequest,
  });
}

