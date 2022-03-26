import { Alert, Button, Container, FormGroup, Grid, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Dashboard from "components/dashboard/LayoutDashboard";
import Typography from "components/Typography";
import useRequest from "hooks/useRequest";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Router from 'next/router'
import { Artist, Role } from "@prisma/client";
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
  }, [isLoading]);

  const onSubmit = async (data: Artist) => {
    console.log(data)
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
      <Typography
        variant="h2"
        marked="center"
        align="center"
        sx={{ marginTop: 15, mr: 25 }}
      >
        Ajouter un nouvel artiste
      </Typography>
      <Container sx={{ display: "flex", position: "relative" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <input type="hidden" {...register("id")} />
          <Box
            component="section"
            sx={{ mt: 20, mb: 8, display: "flex", overflow: "hidden" }}
          >
            <Grid container spacing={10}>
              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <FormGroup
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "45%",
                    }}
                  >
                    <Typography variant="h4" marked="center">
                      Informations
                    </Typography>
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
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <FormGroup
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "45%",
                    }}
                  >
                    <Typography variant="h4" marked="center">
                      Biography
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                      <TextareaAutosize
                        aria-label="Biographie"
                        minRows={20}
                        placeholder=""
                        style={{ width: "100%", height: "100%" }}
                        {...register("biography")}
                      />
                    </Box>
                  </FormGroup>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={item}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              sx={{ mr: 25 }}
            >
              Enregistrer
            </Button>
          </Box>
        </form>
      </Container>
    </Dashboard>
  );
};

CreateArtistsDashboard.auth = {
  role: Role.ADMIN,
};

export default CreateArtistsDashboard;
