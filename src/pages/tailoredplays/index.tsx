import React from 'react'
import { Container } from '@mui/material'
import Typography from "components/Typography"
import type { TayloredPlay } from '@prisma/client';
import useRequest from 'hooks/useRequest';
import { useEffect } from 'react';
import TayloredPlayCard from 'components/TayloredPlayCard';
import models from 'lib/models';
import { TayloredPlayWithAudienceAndTags } from 'pages/dashboard/taylored_plays';

export default function TayloredPlaysIndex({taylored_plays}: {taylored_plays: TayloredPlayWithAudienceAndTags[]}) {
	
	return (
		<><Typography color="inherit" align="center" variant="h2" marked="center" sx={{ mt: 25 }}>
			Spectacles sur-mesure
		</Typography><Container maxWidth="lg" sx={{ mt: 20 }}>
				{taylored_plays?.map((play) => (<TayloredPlayCard play={play} key={play.id} />))}
			</Container></>
	)
}

export async function getStaticProps() {

  const taylored_plays = await models.tayloredPlay.findMany({include: {audienceCategories: true, tags: true}})
 
  return {
    props: {
      taylored_plays,
    },
  }
}
