import {NextResponse} from "next/server";
import {ImageResponse} from "next/og";

export async function GET() {
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
          }}
        >
          <div
            style={{
              color: "#FFA500", // A nice beige color for contrast
              fontSize: 90, // Larger size for hero text
              fontWeight: "bold", // Makes text bold
              marginBottom: 12,
            }}
          >
            Founders House
          </div>
          <div
            style={{
              fontSize: 42, // Smaller size for the following text
              color: "#CCCCCC", // A nice blue color for contrast
              display: "flex", // Added to meet the requirement
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 24,
            }}
          >
            Say thank you to whoever helped you!
            <span>
              like: Thanks for helping me with the UI{" "}
              <span
                style={{
                  color: "#FFA500",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              >
                @siddesh.eth/@farcasterId
              </span>
              ....
            </span>
            add a farcaster id or ens name of the person you want to thank
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
