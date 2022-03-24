import { Alert, Button, FormGroup, TextareaAutosize, TextField } from "@mui/material";
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

export const validFormArtist = yup.object().shape({
  firstname: yup.string().required('requis'),
  lastname: yup.string().required('requis'),
  email: yup.string().email("format d'email non valide").required('requis'),
  face: yup.string(),
  facebook_link: yup.string(),
  instagram_link: yup.string()
});

const CreateArtistsDashboard = () => {
  const router = Router;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Artist>({resolver: yupResolver(validFormArtist)});

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
  console.log(errors)
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
              label="Prénom"
              variant="filled"
              focused
              error={errors.firstname ? true : false}
              helperText={errors.firstname ? errors.firstname.message : null}
              {...register("firstname")}
              sx={{ marginTop: 3 }}
            />

             <TextField
              label="Nom"
              variant="filled"
              focused
              error={errors.lastname ? true : false}
              helperText={errors.lastname ? errors.lastname.message : null}
              {...register("lastname")}
              sx={{ marginTop: 3 }}
            />

            <TextField
              label="Courriel"
              variant="filled"
              focused
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : null}
              {...register("email")}
              sx={{ marginTop: 3 }}
            />
             <TextField
              label="Facebook"
              variant="filled"
              focused
              error={errors.facebook_link ? true : false}
              helperText={errors.facebook_link ? errors.facebook_link.message : null}
              {...register("facebook_link")}
              sx={{ marginTop: 3 }}
            />
             <TextField
              label="Instagram"
              variant="filled"
              focused
              error={errors.instagram_link ? true : false}
              helperText={errors.instagram_link ? errors.instagram_link.message : null}
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