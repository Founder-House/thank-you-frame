import {NextRequest} from "next/server";
import {ImageResponse} from "next/og";
import dbConnect from "../../../lib/dbConnect";
import Message from "../../../models/Message";
import spliceNameAndText from "@/app/lib/spliceNameAndText";
import {join} from "path";
import * as fs from "fs";

export const dynamic = "force-dynamic";

const pirateOnePath = join(process.cwd(), "public/PirataOne-Regular.ttf");
let pirateOne = fs.readFileSync(pirateOnePath);

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const message = searchParams.get("message") ?? "";
  const sender = searchParams.get("sender") ?? "";
  let receiver;
  try {
    await dbConnect();
    console.log(sender);
    const {username: to, text: content} = spliceNameAndText(message);
    receiver = to;
    const res = await Message.create({to, content, sender});
  } catch (error) {
    console.log("error", error);
  }
  const image_url = `${process.env.NEXT_PUBLIC_HOST}/thanks.png`;
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${image_url})`, // You will need the actual path to the image here
          backgroundSize: "cover", // Ensure the image covers the div completely
          backgroundPosition: "center", // Center the background image
        }}
      >
        {/* ... other divs and styles ... */}
        <div
          style={{
            color: "black", // Ensure the text color contrasts with the background
            fontSize: "52px", // Adjust size as needed
            textAlign: "center", // Center the text within the div
            display: "flex",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "10px 20px",
            marginTop: "200px",
          }}
        >
          <span style={{color: "#FFA500", marginRight: "5px"}}>{receiver}</span>
          <span>has received your thank you note! See you again!</span>
        </div>
      </div>
    ),
    {
      width: 1528, // Match these dimensions to your image's dimensions
      height: 800,
      fonts: [
        {
          name: "pirateOne",
          data: pirateOne,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
