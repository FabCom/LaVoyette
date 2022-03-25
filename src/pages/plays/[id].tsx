import { Grid, Card, Stack, Chip, Container, Typography, Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { AudienceCategory, Tag } from "@prisma/client";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps } from "next";
import models from "lib/models";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Image from 'next/image';

type PlayWithAudienceAndTags = {
	id: number;
	title: string;
	abstract: string;
	duration: number;
	audienceCategories: AudienceCategory[];
	tags: Tag[];
};

interface IParams extends ParsedUrlQuery {
	id: string;
}

const PlayPage = ({ play }: { play: PlayWithAudienceAndTags; }) => {
	return (
		<Container sx={{ mt: 5 }}>
			<Grid container >
				<Grid item xs={12} sx={{ bgcolor: "primary.dark", p: 3 }}>
					<Typography variant="h3" color="secondary.main">{play?.title}</Typography>
					<Stack direction="row" spacing={2} sx={{ my: 1 }}>
						{play.tags.map((item, k) =>
							<Chip size="small" variant="outlined" color='secondary' label={item.title} key={k} />
						)}
					</Stack>
					<Typography variant="body1" color="secondary.light" gutterBottom sx={{ mt: 3 }} >{play?.abstract}</Typography>
					<Chip icon={<AccessTimeIcon />} variant="outlined" label={`${play.duration} min`} color="secondary" />
					<Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }} >Durée : <b>{play?.duration} min</b></Typography>
					<Stack direction="row" spacing={2} sx={{ my: 1 }}>
						{play.audienceCategories.map((item, k) =>
							<Chip size="small" color='secondary' label={item.title} key={k} />
						)}
					</Stack>
				</Grid>
			</Grid>
		</Container >
	)
}
export default PlayPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as IParams;
	const play = await models.play.findUnique({
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