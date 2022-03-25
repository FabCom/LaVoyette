import { Grid, Card, Stack, Chip, Container, Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Divider, Button, Paper } from '@mui/material';
import React from 'react';
import { AudienceCategory, Tag } from "@prisma/client";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps } from "next";
import models from "lib/models";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Typography from "components/Typography"
import Link from 'next/link';

type TayloredPlayWithAudienceAndTags = {
	id: number;
	title: string;
	concept: string;
	duration: number;
	audienceCategories: AudienceCategory[];
	tags: Tag[];
};

interface IParams extends ParsedUrlQuery {
	id: string;
}

const PlayPage = ({ play }: { play: TayloredPlayWithAudienceAndTags; }) => {
	return (
		<Container sx={{ mt: 5 }}>
			<Link href="/tailoredplays" passHref>
				<Button variant='outlined' color='secondary'>Retour</Button>
			</Link>
			<Typography color="inherit" align="center" variant="h3" marked="center" sx={{ my: 5 }}>{play?.title}</Typography>
			<Grid container >
				<Grid item xs={12} sx={{ bgcolor: "primary.dark", px: 5, py: 3 }}>
					<Typography variant="h5" color="secondary.light" gutterBottom>{play?.concept}</Typography>
				</Grid>
				<Grid item xs={4} sx={{ bgcolor: "secondary.light", p: 1 }}>
					<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
						<Typography sx={{ mr: 2 }} variant="h6" color="initial">Durée : </Typography>
						<Chip variant="outlined" label={`${play.duration} min`} color="secondary" />
					</Box>
				</Grid>
				<Grid item xs={4} sx={{ bgcolor: "secondary.light", p: 1 }}>
					<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
						<Typography sx={{ mr: 2 }} variant="h6" color="initial">Tag : </Typography>
						<Stack direction="row" spacing={2} sx={{ my: 0 }}>
							{play.tags.map((item, k) =>
								<Chip variant="outlined" color='secondary' label={item.title} key={k} />
							)}
						</Stack>
					</Box>
				</Grid>
				<Grid item xs={4} sx={{ bgcolor: "secondary.light", p: 1 }}>
					<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
						<Typography sx={{ mr: 2 }} variant="h6" color="initial">Audience: </Typography>
						<Stack direction="row" spacing={2}>
							{play.audienceCategories.map((item, k) =>
								<Chip variant="outlined" color='secondary' label={item.title} key={k} />
							)}
						</Stack>
					</Box>
				</Grid>
				<Grid item xs={12} sx={{ mt: 10 }}>
					<Typography color="inherit" align="center" variant="h4" marked="center" sx={{ my: 3 }}>Photos</Typography>
				</Grid>
				<Carousel>
					<div>
						<img src="https://images.pexels.com/photos/2888802/pexels-photo-2888802.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="image1" />
						<p className="legend">Image 1</p>
					</div>
					<div>
						<img src="https://images.pexels.com/photos/2888802/pexels-photo-2888802.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="image1" />
						<p className="legend">Image 1</p>
					</div>
					<div>
						<img src="https://images.pexels.com/photos/2888802/pexels-photo-2888802.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="image1" />
						<p className="legend">Image 1</p>
					</div>
				</Carousel>
			</Grid>
		</Container >
	)
}
export default PlayPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as IParams;
	const play = await models.tayloredPlay.findUnique({
		where: { id: parseInt(id) },
		include: {
			audienceCategories: { select: { title: true } },
			tags: { select: { title: true } },
		},
	});
	play?.audienceCategories.join(' ')
	play?.tags.join(' ')
	return { props: { play } };
};

