import {Metadata} from "next";

const postUrl = `${process.env.NEXT_PUBLIC_HOST}/api/start`;
console.log("postUrl", postUrl);
export async function generateMetadata(): Promise<Metadata> {
  const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/start.png`;
  return {
    title: "Thank You",
    description: "Say thank you to whoever helped you!",
    openGraph: {
      title: "Thank You",
      images: [imageUrl],
    },
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": imageUrl,
      "fc:frame:post_url": postUrl,
      "fc:frame:input:text": "Thanks for helping me @siddesh.eth ...",
      "fc:frame:button:1": "Thank",
    },
  };
}

export default function Home() {
  return (
    <main className="flex flex-col text-center lg:p-16">
      <h1>Hello</h1>
    </main>
  );
}
