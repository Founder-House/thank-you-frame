import {NextRequest} from "next/server";
import {ImageResponse} from "next/og";
import dbConnect from "../../../lib/dbConnect";
import Message from "../../../models/Message";
import spliceNameAndText from "@/app/lib/spliceNameAndText";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const message = searchParams.get("message") ?? "";
  const sender = searchParams.get("sender") ?? "";
  try {
    await dbConnect();

    const {username: to, text: content} = spliceNameAndText(message);
    const res = await Message.create({to, content, sender});
  } catch (error) {
    console.log("error", error);
  }
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex", // Use flex layout
          flexDirection: "row", // Align items horizontally
          alignItems: "center", // Center items vertically
          justifyContent: "center", // Center items horizontally
          width: "100%",
          height: "100vh", // Full viewport height
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Center content vertically in the column
            alignItems: "center", // Center items horizontally
            paddingLeft: 20, // 20px left margin
            paddingRight: 20, // 20px right margin
            lineHeight: 1.2,
            textAlign: "center", // Center text
            color: "black",
            overflow: "hidden",
            marginTop: 24,
            width: "80vw", // Adjust width to account for padding
          }}
        >
          <div
            style={{
              color: "beige", // A nice beige color for contrast
              fontSize: 72, // Larger size for hero text
              fontWeight: "bold", // Makes text bold
              marginBottom: 12,
            }}
          >
            Founders House
          </div>
          <div
            style={{
              fontSize: 24, // Smaller size for the following text
              color: "white", // A nice blue color for contrast
              display: "flex", // Added to meet the requirement
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {message} has received our thanks! See you again!
          </div>
        </div>
      </div>
    ),
    {
      width: 1528,
      height: 800,
    }
  );
}
