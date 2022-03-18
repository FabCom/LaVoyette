import React from 'react'
import { Card, CardContent, Typography, Grid, CardActions, IconButton, Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Link from 'next/link';
import { useEffect } from 'react';
import useRequest from 'hooks/useRequest';
import type { Play } from '@prisma/client';

function DeletePlay(playId) {
	const { request, apiData: plays } = useRequest<Play>(`plays`, "DELETE");

	useEffect(() => {
		request();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}

export default function PlayCard({ play }) {
	return (
		<Grid item xs={4}>
			<Card sx={{ mb: 3 }}>
				<CardContent >
					<Typography variant="h5" component="div">{play.title}</Typography>
					<Typography variant="body1" color="initial" sx={{ mt: 3 }}>{play.abstract.slice(0, 200)}...</Typography>
				</CardContent>
				<CardActions >
					<Link href={`/plays/${play.id}`} passHref>
						<IconButton color="info"><RemoveRedEyeIcon /></IconButton>
					</Link>
					<Link href={`plays/${play.id}`} passHref>
						<IconButton color="warning"><EditIcon /></IconButton>
					</Link>
					<IconButton color="error"><DeleteIcon /></IconButton>
				</CardActions>
			</Card>
		</Grid >
	)
}
