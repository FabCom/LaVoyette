import { Button, FormGroup, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Dashboard from "components/dashboard/LayoutDashboard";
import Typography from "components/Typography";
import useRequest from "hooks/useRequest";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Router from 'next/router'
import { Artist } from "@prisma/client";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";

const schema = yup.object().shape({
  firstname: yup.string().required('Prénom requis'),
  lastname: yup.string().required('Nom requis'),
});

const CreateArtistsDashboard = () => {
  const router = Router;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Artist>({resolver: yupResolver(schema)});

  const {isLoading, apiData, request } = useRequest<Artist>(
    `artists`,
    "POST"
  );

  useEffect(()=> {
    if (isLoading === false && apiData !== null)
    {router.push('/dashboard/artists')}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const onSubmit = async (data: Artist) => {
    console.log(data)
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
            <Box >
              <ErrorMessage errors={errors} name="firstname" />
              <ErrorMessage errors={errors} name="lastname" />
            </Box>
            <TextField
              label="Prénom"
              variant="filled"
              focused
              error
              {...register("firstname")}
              sx={{ marginTop: 3 }}
            />
             <TextField
              label="Nom"
              variant="filled"
              focused
              {...register("lastname")}
              sx={{ marginTop: 3 }}
            />
            <TextField
              label="Courriel"
              variant="filled"
              focused
              {...register("email")}
              sx={{ marginTop: 3 }}
            />
             <TextField
              label="Facebook"
              variant="filled"
              focused
              {...register("facebook_link")}
              sx={{ marginTop: 3 }}
            />
             <TextField
              label="Instagram"
              variant="filled"
              focused
              {...register("instagram_link")}
              sx={{ marginTop: 3 }}
            />
          </FormGroup>
          <FormGroup
            sx={{ display: "flex", flexDirection: "column", width: "45%" }}
          >
            <Typography variant="h4">Biography</Typography>
            <TextareaAutosize
              aria-label="Biographie"
              minRows={20}
              placeholder=""
              style={{ width: "100%" }}
              {...register("biography")}
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

export default CreateArtistsDashboard;