import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Request from "@/models/Request";

export async function GET() {
  try {
    await connectDB();
    const requests = await Request.find();
    return NextResponse.json({ requests });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to load requests." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
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
  } catch (error) {
    console.error("Request create error:", error);
    return NextResponse.json(
      { message: "Unable to save the request." },
      { status: 500 }
    );
  }
}

