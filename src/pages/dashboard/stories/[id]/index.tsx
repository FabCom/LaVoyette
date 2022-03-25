import { Alert, Button, FormGroup, Grid, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { CompanyStory, Role } from "@prisma/client";
import Dashboard from "components/dashboard/LayoutDashboard";
import Typography from "components/Typography";
import useRequest from "hooks/useRequest";
import models from "lib/models";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Router from 'next/router'
import { deserialize, serialize } from "superjson";

import type { SuperJSONResult } from "superjson/dist/types";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { yupResolver } from '@hookform/resolvers/yup';
import { validFormStory } from "../create";


interface IParams extends ParsedUrlQuery {
  id: string;
}

const StoryDashboard = ({ ser_story }: {ser_story: SuperJSONResult}) => {
  const router = Router;
  const story: CompanyStory = deserialize(ser_story)
  const {
    control,
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
    resolver: yupResolver(validFormStory)
  });

  const [activEndDate, setActiveEndDate] = useState<boolean>(story.end ? true : false)

  const { isLoading, apiData, request } = useRequest<CompanyStory>(
    `stories/${story.id}`,
    "PUT"
  );


  useEffect(()=> {
    if (isLoading === false && apiData !== null)
    {router.push('/dashboard/stories')}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  useEffect(()=> {
    if (!story.end && activEndDate === true) {
      console.log('hello')
      story.end = new Date()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activEndDate, story.end])

  const onSubmit = async (data: CompanyStory) => {

    request(data);
  };

  const item = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    px: 5,
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
            <Typography variant="h4" marked="center" align="center">Informations</Typography>
            <TextField
              label="Nom"
              variant="filled"
              focused
              {...register("title")}
              error={errors.title ? true : false}
              helperText={errors.title ? errors.title.message : null}
              sx={{ marginTop: 3 }}
            />
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: "center", marginTop: 3 }}>
              <Controller 
                name="start"
                defaultValue={story.start}
                control={control}
                render={
                  ({field}) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        label={activEndDate ? "Début de l'événement" : "Date de l'événement"}
                        value={field.value}
                        
                        onChange={(e) => {
                          field.onChange(e)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  )
                }
              />
              {!activEndDate && 
                <Button sx={{position: "relative"}}  onClick={()=> setActiveEndDate(true)}>Ajouter une date de fin</Button>
              }
              {(activEndDate) && 
                <Controller 
                name="end"
                defaultValue={story.end}
                control={control}
                render={
                  ({field}) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        label="Fin de l'événement"
                        value={field.value}
                        
                        onChange={(e) => {
                          field.onChange(e)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  )
                }
              />
              }
              
            </Box>
            {errors.end && 
              <Alert severity="error" variant="outlined">{errors.end.message}</Alert>
              }
          </FormGroup>
          </Box>
          <Grid item xs={12} md={4}>
                <Box sx={item}>
          <FormGroup
            sx={{ display: "flex", flexDirection: "column", width: "45%" }}
          >
            <Typography variant="h4" marked="center" align="center" sx={{ mt: 3}}>Description</Typography>
            <Box sx={{ mt: 3 }}>
            <TextareaAutosize
              aria-label="description"
              minRows={20}
              placeholder=""
              style={{ width: "100%" }}
              {...register("description")}
            />
            </Box>
          </FormGroup>
        </Box>
        </Grid>

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

StoryDashboard.auth = {
  role: Role.ADMIN,
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
