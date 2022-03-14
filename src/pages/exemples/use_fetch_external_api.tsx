import useAxiosFetch from 'hooks/useFetchExternalApi';
import { useEffect, useState } from 'react';

import type { AhCard } from 'interfaces/exemples/ahcard';

const UseRequestExemple = () => {

  const [cards, setcards] = useState([])
  const { data, fetchError, isLoading } = useAxiosFetch('https://geo.api.gouv.fr/regions');
  
  useEffect(() => {
    setcards(data);
    console.log(data)
  }, [data])

  return (
    <div>
      {cards.map((card: AhCard, i) => <p key={i}>{card.nom}</p>)}
    </div>
  )
}

export default UseRequestExemple

