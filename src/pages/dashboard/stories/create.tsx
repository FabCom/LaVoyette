import { Alert, Button, FormGroup, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { CompanyStory } from "@prisma/client";
import Dashboard from "components/dashboard/LayoutDashboard";
import Typography from "components/Typography";
import useRequest from "hooks/useRequest";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Router from 'next/router'
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import frLocale from 'date-fns/locale/fr';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const validFormStory = yup.object().shape({
  title: yup.string().required('requis'),
  start: yup.date().required('requis'),
  end: yup.date().default(null)
  .when("start",
      (start, yup) => start && yup.min(start, "La date de fin de l'événement doit être définie après la date de début"))

});


const StoryDashboard = () => {
  const router = Router;
  const {
    control,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyStory>({resolver: yupResolver(validFormStory)});

  const [activEndDate, setActiveEndDate] = useState<boolean>(false)

  const { isLoading, apiData, request } = useRequest<CompanyStory>(
    `stories`,
    "POST"
  );
  
  const watchStoryEnd = watch("end")
  const watchStoryStart = watch("start")

  useEffect(()=> {
    if (isLoading === false && apiData !== null)
    {router.push('/dashboard/stories')}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  useEffect(()=> {
    if (!watchStoryEnd && activEndDate === true) {
      setValue('end', new Date())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activEndDate, watchStoryEnd])

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
              error={errors.title ? true : false}
              helperText={errors.title ? errors.title.message : null}
              sx={{ marginTop: 3 }}
            />
            <Box sx={{display: 'flex', flexDirection: 'row', marginTop: 3 }}>
              <Controller 
                name="start"
                defaultValue={new Date()}
                control={control}
                render={
                  ({field}) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                      <MobileDatePicker
                        label={activEndDate ? "Début de l'événement" : "Date de l'événement"}
                        value={field.value}
                        minDate={watchStoryStart}
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
                defaultValue={new Date}
                control={control}
                render={
                  ({field}) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
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
