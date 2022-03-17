import useRequest from 'hooks/useRequest'
import { useEffect } from 'react';

import type { Play } from '@prisma/client';



const ArtistsPages = () => {

  const { isLoading, serverError, request, apiData: plays } = useRequest<Play[]>("plays", "GET");

  useEffect(()=>{
    request()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    console.log(isLoading, serverError, plays)
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isLoading, serverError])

  return (
    <div>
        <h1>Hello</h1>
      {plays && <h2>{plays.map((play: Play) => play.title)} </h2>}
    </div>
  )
}

export default ArtistsPages