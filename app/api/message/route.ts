import dbConnect from "../../lib/dbConnect";
import Message from "../../models/Message";

import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    await dbConnect();

    const body = await req.json();

    const {to, content, sender} = body;
    const message = await Message.create({to, content, sender});

    return new NextResponse(JSON.stringify({data: message}), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({message: "Internal server error"}),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export const GET = POST;
