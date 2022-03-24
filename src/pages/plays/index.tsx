import React from 'react'
import { Container } from '@mui/material';
import Typography from 'components/Typography'
import PlayCard from 'components/PlayCard';
import models from 'lib/models';
import { PlayWithAudienceAndTags } from 'pages/dashboard/plays';


export default function PlaysIndex({ plays }: { plays: PlayWithAudienceAndTags[]}) {
	// const { request, apiData: plays } = useRequest<Play[]>(`plays`, "GET");

	// useEffect(() => {
	// 	request();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])
	// console.log(plays)
	return (
		<><Typography color="inherit" align="center" variant="h2" marked="center" sx={{ mt: 25 }}>
			Nos Spectacles
		</Typography>
		<Container maxWidth="lg" sx={{ mt: 20 }}>
			{plays?.map((play) => (<PlayCard play={play} key={play.id} />))}
		</Container></>
	)
}


export async function getStaticProps() {

  const plays = await models.play.findMany({include: {audienceCategories: true, tags: true}})
 
  return {
    props: {
      plays,
    },
  }
}