import { getAccessToken } from "@/app/api/actions/getaccesstoken";
import { getEpisode } from "@/app/api/actions/getepisode";
import Episode from "@/components/Episode";
import React from "react";

const page = async ({ params }: { params: Promise<{ episodeid: string }> }) => {
  const episodeid = (await params).episodeid;

  console.log(episodeid);

  const accessToken = await getAccessToken();

  let episode;

  if (episodeid && accessToken && accessToken.accessToken) {
    episode = await getEpisode(episodeid, accessToken.accessToken);
    console.log(episode, "episode");
  }

  return (
    <>
      <Episode episode={episode} />
    </>
  );
};

export default page;
