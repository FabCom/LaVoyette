import React from 'react'
import { Container, Box, Button, Card, CardContent, Typography, Grid, CardActions, IconButton, Stack, Chip } from '@mui/material'
import Dashboard from 'components/dashboard/LayoutDashboard';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import models from "lib/models"
import { AudienceCategory, Tag } from "@prisma/client"
import AccessTimeIcon from '@mui/icons-material/AccessTime';

type PlayWithAudienceAndTags = { id: number, title: string, abstract: string, audienceCategories: AudienceCategory[], tags: Tag[] }
type Props = { plays: PlayWithAudienceAndTags[] }

const PlaysDashboard: React.FC<Props> = ({ plays }) => {
	return (
		<Dashboard>
			<Container maxWidth="lg" sx={{ mt: 5 }}>
				<Link href="/dashboard/plays/create" passHref>
					<Button variant="contained" color="secondary" size='large' sx={{ mb: 5 }}>Nouveau spectacle</Button>
				</Link>
				<Grid container spacing={1}>
					{plays.map((play, i) =>
						<Grid item xs={4} key={i}>
							<Card sx={{ mb: 3 }}>
								<CardContent >
									<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mr: 5 }}>
										<Typography variant="h5" component="div">{play.title}</Typography>
										<Chip icon={<AccessTimeIcon />} variant='outlined' label={`${play.duration} min`} />
									</Box>
									<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mr: 5 }}>
										<Stack direction="row" spacing={2} sx={{ my: 1 }}>
											{play.audienceCategories.map((item, k) =>
												<Chip size="small" variant="outlined" label={item.title} key={k} />
											)}
										</Stack>
										<Stack direction="row" spacing={2} sx={{ my: 1 }}>
											{play.tags.map((item, k) =>
												<Chip size="small" label={item.title} key={k} />
											)}
										</Stack>
									</Box>
									<Typography variant="body2" color="initial">{(play.abstract) ? play.abstract.slice(0, 100) : null}...</Typography>
								</CardContent>
								<CardActions >
									<Link href={`/plays/${play.id}`} passHref>
										<IconButton><RemoveRedEyeIcon /></IconButton>
									</Link>
									<Link href={`plays/${play.id}`} passHref>
										<IconButton color="secondary"><EditIcon /></IconButton>
									</Link>
									<Link href={`/dashboard/plays/${play.id}/delete`} passHref>
										<IconButton color="primary"><DeleteIcon /></IconButton>
									</Link>
								</CardActions>
							</Card>
						</Grid >
					)}
				</Grid>
			</Container >
		</Dashboard>
	)
}

export default PlaysDashboard;

export async function getServerSideProps<GetServerSideProps>() {

	const plays = await models.play.findMany({ include: { audienceCategories: true, tags: true } })

	return { props: { plays } }
}
