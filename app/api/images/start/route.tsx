import {NextResponse} from "next/server";
import {ImageResponse} from "next/og";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex", // Use flex layout
          flexDirection: "row", // Align items horizontally
          alignItems: "stretch", // Stretch items to fill the container height
          width: "100%",
          height: "100vh", // Full viewport height
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingLeft: 24,
            paddingRight: 24,
            lineHeight: 1.2,
            fontSize: 36,
            color: "black",
            flex: 1,
            overflow: "hidden",
            marginTop: 24,
          }}
        >
          <div
            style={{
              color: "#0a588c",
              fontSize: 72,
              marginBottom: 12,
              display: "flex",
            }}
          >
            <strong>Founders House</strong>
          </div>
          <div
            style={{
              display: "flex",
              overflow: "hidden",
            }}
          >
            Say thank you to whoever helped you! <br />
            Thanks for helping me the UI @siddesh.eth/@farcasterId ... add a
            farcaster id or ens name of the person you want to thank
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
