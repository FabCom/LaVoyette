import { Button, FormGroup, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { AudienceCategory, Role, Tag } from "@prisma/client";
import Dashboard from "components/dashboard/LayoutDashboard";
import Typography from "components/Typography";
import useRequest from "hooks/useRequest";
import models from "lib/models";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Router from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup';
import { validFormTayloredPlay } from "../create";

type TayloredPlayWithAudienceAndTags = {
  id: number;
  title: string;
  concept: string;
  audienceCategories: AudienceCategory[];
  tags: Tag[];
};
type RequestTayloredPlayWithAudienceAndTags = {
  id: number;
  title: string;
  concept: string;
  audienceCategories: string;
  tags: string;
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

const TayloredPlaysDashboard = ({ taylored_play}: {taylored_play: TayloredPlayWithAudienceAndTags;}) => {
  const router = Router;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestTayloredPlayWithAudienceAndTags>({
    defaultValues: {
      id: taylored_play.id,
      title: taylored_play.title,
      concept: taylored_play.concept,
      audienceCategories: taylored_play.audienceCategories.map(item => item.title).join(','),
      tags: taylored_play.tags.map(item => item.title).join(','),
    },
    resolver: yupResolver(validFormTayloredPlay)
  });

  const { isLoading, apiData, request } = useRequest<RequestTayloredPlayWithAudienceAndTags>(
    `taylored_plays/${taylored_play.id}`,
    "PUT"
  );


  useEffect(()=> {
    if (isLoading === false && apiData !== null)
    {router.push('/dashboard/taylored_plays')}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])


  const onSubmit = async (data: RequestTayloredPlayWithAudienceAndTags) => {
    console.log(data)
    const requestData = {
      title: data.title,
      concept: data.concept,
      audienceCategories: data.audienceCategories !== "" ? data.audienceCategories.split(",").map(categ => categ.trim() ) : [],
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
              error={errors.title ? true : false}
              helperText={errors.title ? errors.title.message : null}
              sx={{ marginTop: 3 }}
            />
            <TextField
              label="Public"
              variant="filled"
              focused
              {...register("audienceCategories")}
              error={errors.audienceCategories ? true : false}
              helperText="Un mot ou une liste de mots séparés par une virgule"
              sx={{ marginTop: 3 }}
            />
            <TextField
              label="Tag"
              variant="filled"
              focused
              {...register("tags")}
              error={errors.tags ? true : false}
              helperText="Un mot ou une liste de mots séparés par une virgule"
              sx={{ marginTop: 3 }}
            />
          </FormGroup>
          <FormGroup
            sx={{ display: "flex", flexDirection: "column", width: "45%" }}
          >
            <Typography variant="h4">Description</Typography>
            <TextareaAutosize
              aria-label="Concept"
              minRows={20}
              placeholder=""
              style={{ width: "100%" }}
 
              {...register("concept")}
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

TayloredPlaysDashboard.auth = {
  role: Role.ADMIN,
};

export default TayloredPlaysDashboard;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as IParams;
  const taylored_play = await models.tayloredPlay.findUnique({
    where: { id: parseInt(id) },
    include: {
      audienceCategories: { select: { title: true } },
      tags: { select: { title: true } },
    },
  });
  taylored_play?.audienceCategories.join(' ')
  taylored_play?.tags.join(' ')
  return { props: { taylored_play } };
};
