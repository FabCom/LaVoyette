import useRequest from 'hooks/useRequest'
import { useEffect } from 'react';

type Card = {name: string}

const UseRequestExemple = () => {

  const { isLoading, serverError, request, apiData: card } = useRequest<Card>("hello", "GET");

  useEffect(()=>{
    request()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      {card && <h2>{card.name} </h2>}
    </div>
  )
}

export default UseRequestExemple