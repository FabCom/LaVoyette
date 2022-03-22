import React from "react";
import TeamHero from "components/TeamHero";
import ArtistsHeader from "components/ArtistsHeader";
import useRequest from "hooks/useRequest";
import { useEffect } from "react";
import type { Artist } from "@prisma/client";

const ArtistsPages = () => {
  const {
    isLoading,
    serverError,
    request,
    apiData: artists,
  } = useRequest<Artist[]>("artists", "GET");

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   console.log(isLoading, serverError, artists);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoading, serverError]);

  let blockArtists = <></>;
  if (artists) {
    blockArtists = (
      <>
        {artists.map((artist: Artist, i) => (
          <TeamHero key={i} artist={artist} />
        ))}
      </>
    );
  }

  return (
    <React.Fragment>
      <ArtistsHeader/>
      {blockArtists}
    </React.Fragment>
  );
};

export default ArtistsPages;
