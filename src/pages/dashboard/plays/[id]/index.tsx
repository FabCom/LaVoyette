import { Button, FormGroup, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { AudienceCategory, Tag } from "@prisma/client";
import Dashboard from "components/dashboard/LayoutDashboard";
import Typography from "components/Typography";
import useRequest from "hooks/useRequest";
import models from "lib/models";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Router from 'next/router'

type PlayWithAudienceAndTags = {
	id: number;
	title: string;
	abstract: string;
	duration: number;
	audienceCategories: AudienceCategory[];
	tags: Tag[];
};
type RequestPlayWithAudienceAndTags = {
	id: number;
	title: string;
	abstract: string;
	duration: number;
	audienceCategories: string;
	tags: string;
};

interface IParams extends ParsedUrlQuery {
	id: string;
}

const PlaysDashboard = ({ play }: { play: PlayWithAudienceAndTags; }) => {
	const router = Router;

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<RequestPlayWithAudienceAndTags>({
		defaultValues: {
			id: play.id,
			title: play.title,
			duration: play.duration,
			abstract: play.abstract,
			audienceCategories: play.audienceCategories.map(item => item.title).join(','),
			tags: play.tags.map(item => item.title).join(','),
		},
	});

	const { isLoading, apiData, request } = useRequest<RequestPlayWithAudienceAndTags>(
		`plays/${play.id}`,
		"PUT"
	);


	useEffect(() => {
		if (isLoading === false && apiData !== null) { router.push('/dashboard/plays') }
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading])


	const onSubmit = async (data: RequestPlayWithAudienceAndTags) => {
		console.log(data)
		const requestData = {
			title: data.title,
			abstract: data.abstract,
			duration: data.duration,
			audienceCategories: data.audienceCategories !== "" ? data.audienceCategories.split(",").map(categ => categ.trim()) : [],
			tags: data.tags !== "" ? data.tags.split(",").map(categ => categ.trim()) : [],
		};
		// console.log(requestData)
		request(requestData);
	};

	return (
		<Dashboard>
			<form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
				<input type="hidden" {...register("id")} />
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-around",
						width: "100%",
						marginTop: 5,
					}}
				>
					<FormGroup
						sx={{ display: "flex", flexDirection: "column", width: "45%" }}
					>
						<Typography variant="h4">Informations</Typography>
						<TextField
							label="Titre"
							variant="filled"
							focused
							{...register("title")}
							sx={{ marginTop: 3 }}
						/>
						<TextField
							label="Durée"
							variant="filled"
							focused
							{...register("duration")}
							sx={{ marginTop: 3 }}
						/>
						<TextField
							label="Public"
							variant="filled"
							focused
							{...register("audienceCategories")}
							sx={{ marginTop: 3 }}
						/>

						<TextField
							label="Tag"
							variant="filled"
							focused
							{...register("tags")}
							sx={{ marginTop: 3 }}
						/>
					</FormGroup>
					<FormGroup
						sx={{ display: "flex", flexDirection: "column", width: "45%" }}
					>
						<Typography variant="h4">Description</Typography>
						<TextareaAutosize
							aria-label="abstract"
							minRows={20}
							placeholder=""
							style={{ width: "100%" }}
							{...register("abstract")}
						/>
					</FormGroup>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-around",
						width: "100%",
						marginTop: 5,
					}}
				>
					<Button color="secondary" variant="contained" type="submit">Enregistrer</Button>
				</Box>
			</form>
		</Dashboard>
	);
};

export default PlaysDashboard;

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
