import { Button, FormGroup, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { CompanyStory } from "@prisma/client";
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
  });

  const [activEndDate, setActiveEndDate] = useState<boolean>(story.end ? true : false)

  const { isLoading, apiData, request } = useRequest<CompanyStory>(
    `stories/${story.id}`,
    "PUT"
  );


  useEffect(()=> {
    if (isLoading === false && apiData !== null)
    {router.push('/dashboard/stories')}
  }, [isLoading])

  useEffect(()=> {
    if (!story.end && activEndDate === true) {
      console.log('hello')
      story.end = new Date()
    }
    // if (story.end && activEndDate === false) {
    //   story.end=null
    // }
  }, [activEndDate, story.end])

  const onSubmit = async (data: CompanyStory) => {

    request(data);
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
            <Box sx={{display: 'flex', flexDirection: 'row', marginTop: 3 }}>
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
                <Button onClick={()=> setActiveEndDate(true)}>Ajouter une date de fin</Button>
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
