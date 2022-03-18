import React from 'react'
import { Card, Container, CardContent, Typography, Grid, Stack, Chip } from '@mui/material'

export default function playsIndex() {
	return (
		<Container maxWidth="lg" sx={{ mt: 5 }}>
			<Card>
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<img height={200} src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.theatre-madeleine.com%2Fwp-content%2Fuploads%2F2019%2F10%2Ftheatre-de-la-madeleine-03.jpg&f=1&nofb=1" alt="thatre" />
						</Grid>
						<Grid item xs={8}>
							<Typography variant="h5" component="div">Titre de piece</Typography>
							<Typography variant="body1" color="initial" sx={{ my: 3 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, magnam qui illum mollitia architecto animi aperiam odio labore possimus quasi suscipit fugiat, unde placeat atque cupiditate! Perspiciatis quibusdam a maiores.</Typography>
							<Stack direction="row" spacing={2}>
								<Chip label="Comédie" variant='outlined' />
								<Chip label="Dramatique" variant='outlined' />
								<Chip label="Accessible" variant='outlined' />
							</Stack>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	)
}
