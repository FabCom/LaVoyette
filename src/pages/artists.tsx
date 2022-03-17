import React from 'react';
import Navbar from 'components/navbar';
import TeamHero from 'components/TeamHero';
import useRequest from 'hooks/useRequest'
import { useEffect } from 'react';
import withRoot from '../withRoot';

import type { Artist } from '@prisma/client';




const ArtistsPages = () => {

  const { isLoading, serverError, request, apiData: artists } = useRequest<Artist[]>("artists", "GET");

  useEffect(()=>{
    request()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    console.log(isLoading, serverError, artists)
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isLoading, serverError])
  
  let blockArtists = (<></>)
  if (artists) {
    blockArtists = (
    <>
    {artists.map((artist: Artist, i) =>
      
      <TeamHero key={i} artist= {artist}/>
    )}
    
    </>
    )
  }  

  return (
    <React.Fragment>
      <Navbar />
      {blockArtists}
      
    </React.Fragment>
        
  )
}

export default withRoot(ArtistsPages);