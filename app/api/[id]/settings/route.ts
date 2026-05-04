/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Settings from "@/core/schema/Settings";

type Params = {
  params: {
    userId: string;
  };
};

export async function GET(req: any, { params }: Params) {
  await connectDB();

  //   const { userId } = params;
  const userId = req.nextUrl.pathname.split("/")[2];

  if (!userId) {
    return NextResponse.json({ message: "Missing userId" }, { status: 400 });
  }

  const setting = await Settings.findOne({ userId });

  return NextResponse.json(setting, { status: 200 });
}

export async function POST(req: any, { params }: Params) {
  await connectDB();
  const userId = req.nextUrl.pathname.split("/")[2];

  //   const { userId } = params;
  const body = await req.json();
  const { address, theme, language } = body;

  if (!userId) {
    return NextResponse.json({ message: "Missing userId" }, { status: 400 });
  }

  const setting = await Settings.findOneAndUpdate(
    { userId },
    {
      $set: {
        address,
        theme,
        language,
      },
    },
    {
      new: true,
      upsert: true,
    },
  );

  return NextResponse.json(setting, { status: 200 });
}
