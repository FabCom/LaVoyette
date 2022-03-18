import React from 'react'
import { Card, CardContent, Typography, Grid, Stack, Chip, Box } from '@mui/material'
import Router from 'next/router'
import Image from 'next/image'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function PlayCard({ play }) {
	return (
		<Card sx={{ mb: 3 }} onClick={() => Router.push("/plays/[id]", `/plays/${play.id}`)}>
			<CardContent sx={{ bgcolor: 'primary.dark' }}>
				<Grid container spacing={5} sx={{ bgcolor: 'primary.dark' }}>
					<Grid item xs={4}>
						<Image height={250} width={370} src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.theatre-madeleine.com%2Fwp-content%2Fuploads%2F2019%2F10%2Ftheatre-de-la-madeleine-03.jpg&f=1&nofb=1" alt="thatre" />
					</Grid>
					<Grid item xs={1}>
					</Grid>
					<Grid item xs={7} sx={{ bgcolor: 'warning.main', my: 1, borderRadius: 2 }}>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mr: 5 }}>
							<Typography variant="h5" component="div">{play.title}</Typography>
							<Chip icon={<AccessTimeIcon />} variant='outlined' label={`${play.duration} min`} />
						</Box>
						<Typography variant="body1" color="initial">{play.abstract.slice(0, 400)}...</Typography>
						<Stack direction="row" spacing={2} sx={{ pb: 2 }}>
							<Chip label="Comédie" />
							<Chip label="Dramatique" />
							<Chip label="Accessible" />
						</Stack>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}
