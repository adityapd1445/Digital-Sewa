import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";

export async function GET() {
  await connectDB();
  const donations = await Donation.find();
  return NextResponse.json({ donations });
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const { amount, message } = body as {
    amount?: number;
    message?: string;
  };

  if (typeof amount !== "number") {
    return NextResponse.json(
      { message: "Donation amount is required and must be a number" },
      { status: 400 }
    );
  }

  const donation = await Donation.create({ amount, message });
  return NextResponse.json({
    message: "Donation received",
    donation,
  });
}