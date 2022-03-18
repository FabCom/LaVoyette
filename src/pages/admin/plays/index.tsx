import React from 'react'
import { Container, Grid, Button } from '@mui/material'
import type { Play } from '@prisma/client';
import useRequest from 'hooks/useRequest';
import { useEffect } from 'react';
import AdminPlayCard from 'components/AdminPlayCard';

export default function AdminPlaysIndex() {
	const { request, apiData: plays } = useRequest<Play[]>(`plays`, "GET");

	useEffect(() => {
		request();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Container maxWidth="lg" sx={{ mt: 5 }}>
			<Button variant="contained" color="success" size='large' sx={{ mb: 5 }}>Nouveau spectacle</Button>
			<Grid container spacing={2}>
				{plays?.map((play) => (<AdminPlayCard play={play} key={play.id} />))}
			</Grid>
		</Container >
	)
}

