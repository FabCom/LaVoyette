import React from 'react'
import { Container } from '@mui/material'
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
		<Container maxWidth="lg" sx={{ mt: 5 }}>
			{plays?.map((play) => (<PlayCard play={play} key={play.id} />))}
		</Container>
	)
}
