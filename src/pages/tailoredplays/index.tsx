import React from 'react'
import { Container } from '@mui/material'
import Typography from "components/Typography"
import type { TayloredPlay } from '@prisma/client';
import useRequest from 'hooks/useRequest';
import { useEffect } from 'react';
import TayloredPlayCard from 'components/TayloredPlayCard';

export default function TayloredPlaysIndex() {
	const { request, apiData: taylored_plays } = useRequest<TayloredPlay[]>(`taylored_plays`, "GET");

	useEffect(() => {
		request();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<><Typography color="inherit" align="center" variant="h2" marked="center" sx={{ mt: 25 }}>
			Spectacles sur-mesure
		</Typography><Container maxWidth="lg" sx={{ mt: 20 }}>
				{taylored_plays?.map((play) => (<TayloredPlayCard play={play} key={play.id} />))}
			</Container></>
	)
}
