import { getAccessToken } from "./api/actions/getaccesstoken";
import { getShows } from "./api/actions/getshows";
import Shows from "@/components/Shows";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/splash.png`,
  button: {
    title: "Launch Frame",
    action: {
      type: "launch_frame",
      name: "Purple People Show",
      url: `${appUrl}`,
      splashImageUrl: `${appUrl}/versel.svg`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export function generateMetadata() {
  return {
    title: "Purple People ",
    openGraph: {
      title: "Purple People Show",
      description: "A Frame for All episodes for Purple People .",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default async function Home() {
  const accessToken = await getAccessToken();
  console.log(accessToken);
  let shows;
  if (accessToken && accessToken.accessToken) {
    shows = await getShows(accessToken.accessToken);
    console.log(shows, "shows");
  }

  return (
    <div>
      <Shows shows={shows} />
    </div>
  );
}
