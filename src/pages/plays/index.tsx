import React from 'react'
import { Container } from '@mui/material';
import Typography from 'components/Typography'
import type { Play } from '@prisma/client';
import useRequest from 'hooks/useRequest';
import { useEffect } from 'react';
import PlayCard from 'components/PlayCard';

export default function PlaysIndex() {
	const { request, apiData: plays } = useRequest<Play[]>(`plays`, "GET");

	useEffect(() => {
		request();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<><Typography color="inherit" align="center" variant="h2" marked="center" sx={{ mt: 25 }}>
			Nos Spectacles
		</Typography>
		<Container maxWidth="lg" sx={{ mt: 20 }}>
			{plays?.map((play) => (<PlayCard play={play} key={play.id} />))}
		</Container></>
	)
}
