import { Button, FormGroup, Stack, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { CompanyStory } from "@prisma/client";
import Dashboard from "components/dashboard/LayoutDashboard";
import Typography from "components/Typography";
import useRequest from "hooks/useRequest";
import models from "lib/models";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Router from 'next/router'
import { deserialize, serialize } from "superjson";

import type { SuperJSONResult } from "superjson/dist/types";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
// import AdapterDateFns from '@mui/lab/AdapterDateFns';


interface IParams extends ParsedUrlQuery {
  id: string;
}

const StoryDashboard = ({ ser_story }: {ser_story: SuperJSONResult}) => {
  const router = Router;
  const story: CompanyStory = deserialize(ser_story)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyStory>({
    defaultValues: {
      id: story.id,
      title: story.title,
      description: story.description,
      start: story.start,
      end: story.end
    },
  });

  const { isLoading, apiData, request } = useRequest<CompanyStory>(
    `stories/${story.id}`,
    "PUT"
  );


  useEffect(()=> {
    if (isLoading === false && apiData !== null)
    {router.push('/dashboard/stories')}
  }, [isLoading])


  const onSubmit = async (data: CompanyStory) => {

    // request(data);
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
              label="Nom"
              variant="filled"
              focused
              {...register("title")}
              sx={{ marginTop: 3 }}
            />
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <Controller 
                  name="start"
                  default=""
                <MobileDatePicker
                   label="For mobile"
                   value={value}
                   onChange={(newValue) => {
                     setValue(newValue);
                   }}
                />
              </Stack>
            </LocalizationProvider> */}
            <TextField
              label="Lien vers le logo"
              variant="filled"
              focused
              {...register("start")}
              sx={{ marginTop: 3 }}
            />
          </FormGroup>
          <FormGroup
            sx={{ display: "flex", flexDirection: "column", width: "45%" }}
          >
            <Typography variant="h4">Description</Typography>
            <TextareaAutosize
              aria-label="description"
              minRows={20}
              placeholder=""
              style={{ width: "100%" }}
              {...register("description")}
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

export default StoryDashboard;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as IParams;
  const req_story = await models.companyStory.findUnique({
    where: { id: parseInt(id) },
  });
  const ser_story = serialize(req_story)
  return { props: { ser_story } };
};
