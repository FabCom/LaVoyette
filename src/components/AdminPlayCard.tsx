import React from 'react'
import { Card, CardContent, Typography, Grid, CardActions, IconButton, Stack, Chip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Link from 'next/link';
import type {AudienceCategory, Tag} from "@prisma/client"

type PlayWithAudienceAndTags = {
  id: number;
  title: string;
  abstract: string;
  audienceCategories: AudienceCategory[];
  tags: Tag[];
};

const AdminPlayCard = ({ play}:{play:PlayWithAudienceAndTags}) => {
	return (
		<Grid item xs={4}>
			<Card sx={{ mb: 3 }}>
				<CardContent >
					<Typography variant="h5" component="div">{play.title}</Typography>
					<Stack>
						{play.tags.map((item, k) =>
							<Chip label={item.title} key={k} />
						)}
					</Stack>
					<Typography variant="body1" color="initial" sx={{ mt: 3 }}>{play.abstract.slice(0, 200)}...</Typography>
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
	)
}

export default AdminPlayCard;
