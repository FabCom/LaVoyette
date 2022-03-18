import { Container, Typography, TextField, Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import useRequest from 'hooks/useRequest';
import { useEffect } from 'react';
import type { Play } from '@prisma/client';
import { useRouter } from 'next/router';

const EditPlayPage = () => {
	const { id } = useRouter().query;
	const { request, apiData: play } = useRequest<Play>(`plays/${id}`, "GET");

	useEffect(() => {
		request();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	//{play?.tags.map((tag) => (<Chip label="`${tag}`" variant='outlined' />))}

	return (
		<Container>
			<Typography variant="h4" color="initial" sx={{ mt: 5 }}>Modifier un spectacle</Typography>
			<form>
				<TextField sx={{ my: 2 }} variant='filled' fullWidth id="outlined-textarea" label="Titre" value={play?.title} />
				<TextField sx={{ my: 2 }} variant='filled' fullWidth id="outlined-textarea" label="Description" value={play?.abstract} multiline />
				<TextField sx={{ my: 2 }} variant='filled' id="outlined-textarea" label="Durée" value={play?.duration} />
				<Button type="submit" size='large' color='warning' variant="contained" sx={{ mt: 3, mb: 2 }}>Modifier</Button>
			</form>
		</Container >
	)
}
export default EditPlayPage;
