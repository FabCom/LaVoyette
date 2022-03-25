import { Grid, Card, Stack, Chip, Container, Typography, Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';
import useRequest from 'hooks/useRequest';
import { useEffect } from 'react';
import type { Play } from '@prisma/client';
import { useRouter } from 'next/router';

const itemData = [
	{
		img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
		title: 'Breakfast',
		rows: 2,
		cols: 2,
	},
	{
		img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
		title: 'Coffee',
	},
	{
		img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
		title: 'Burger',
	},
	{
		img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
		title: 'Camera',
	},
	{
		img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
		title: 'Coffee',
	},
];

function srcset(image: string, size: number, rows = 1, cols = 1) {
	return {
		src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
		srcSet: `${image}?w=${size * cols}&h=${size * rows
			}&fit=crop&auto=format&dpr=2 2x`,
	};
}

const PlayPage = () => {
	const { id } = useRouter().query;
	const { request, apiData: play } = useRequest<Play>(`plays/${id}`, "GET");

	useEffect(() => {
		request();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	//{play?.tags.map((tag) => (<Chip label="`${tag}`" variant='outlined' />))}

	return (
		<Container>
			<Grid container spacing={2} >
				<Grid item xs={6}>
					<h2>{play?.title}</h2>
					<Stack direction="row" spacing={2}>
						<Chip label="Comédie" variant='outlined' />
						<Chip label="Dramatique" variant='outlined' />
						<Chip label="Accessible" variant='outlined' />
					</Stack>
					<Typography variant="body1" gutterBottom sx={{ mt: 3 }} >{play?.abstract}</Typography>
					<Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }} >Durée : <b>{play?.duration} min</b></Typography>
				</Grid>
				<Grid item xs={5}>
					<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mt: 3 }}>
						
							
					</List>
				</Grid>
				<Grid item xs={10}>
					<ImageList
						variant="quilted"
						cols={6}
						rowHeight={121}
					>
						{itemData.map((item) => (
							<ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									{...srcset(item.img, 121, item.rows, item.cols)}
									alt={item.title}
									loading="lazy"
								/>
							</ImageListItem>
						))}
					</ImageList>
				</Grid>
			</Grid>
		</Container >
	)
}
export default PlayPage;
