import {NextRequest, NextResponse} from "next/server";
import {getSSLHubRpcClient, Message} from "@farcaster/hub-nodejs";

const HUB_URL = "nemes.farcaster.xyz:2283";
const hubClient = getSSLHubRpcClient(HUB_URL);

const postUrl = `${process.env.NEXT_PUBLIC_HOST}/api/code`;

export async function POST(req: NextRequest) {
  const {
    untrustedData: {inputText, fid},
    trustedData: {messageBytes},
  } = await req.json();
  const frameMessage = Message.decode(Buffer.from(messageBytes, "hex"));
  const validateResult = await hubClient.validateMessage(frameMessage);
  if (validateResult.isOk() && validateResult.value.valid) {
    const validMessage = validateResult.value.message;

    let urlBuffer = validMessage?.data?.frameActionBody?.url ?? [];
    const urlString = Buffer.from(urlBuffer).toString("utf-8");
    if (!urlString.startsWith(process.env.NEXT_PUBLIC_HOST ?? "")) {
      return new NextResponse("Bad Request", {status: 400});
    }

    const message = inputText ?? "";
    const imageUrl = `${
      process.env.NEXT_PUBLIC_HOST
    }/api/images/thanks?date=${Date.now()}&message=${message}&sender=${fid}`;
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Echo Says:</title>
          <meta property="og:title" content="Echo Says:" />
          <meta property="og:image" content="${imageUrl}" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:post_url" content="${postUrl}" />
          <meta name="fc:frame:image" content="${imageUrl}" />
          <meta name="fc:frame:button:1" content="FH on X" />
          <meta name="fc:frame:button:1:action" content="link" />
          <meta name="fc:frame:button:1:target" content="https://twitter.com/founderhouse_" />
          <meta name="fc:frame:button:2" content="Join FH TG Community" />
          <meta name="fc:frame:button:2:action" content="link" />
          <meta name="fc:frame:button:2:target" content="https://t.me/+ULHESQjzIbI2MjQ1" />
        </head>
        <body/>
      </html>`,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } else {
    return new NextResponse("Unauthorized", {status: 401});
  }
}

export const GET = POST;
