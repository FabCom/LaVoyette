import useRequest, { RequestMethod } from 'hooks/useRequest'
import { useEffect, useState } from 'react';


const UseRequestExemple = () => {

  const { isLoading, serverError, doFetch, apiData } = useRequest("hello", RequestMethod.GET);
  const [card, setCard] = useState<any>()

  useEffect(()=>{
    doFetch()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    if (isLoading === false && apiData !== null) {
      setCard(apiData)
    }
    console.log(serverError)
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[serverError, isLoading, card])

  return (
    <div>
      {card && <h2>{card.name} </h2>}
    </div>
  )
}

export default UseRequestExemple