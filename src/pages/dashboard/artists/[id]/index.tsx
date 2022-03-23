import * as React from 'react';
import {
  Button,
  ButtonBase,
  Container,
  FormGroup,
  Grid,
  styled,
  TextareaAutosize,
  TextField,
  Theme,
} from "@mui/material";
import { Box, SxProps } from "@mui/system";
import Dashboard from "components/dashboard/LayoutDashboard";
import { Artist } from "@prisma/client";
import Typography from "components/Typography";
import useRequest from "hooks/useRequest";
import models from "lib/models";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";

interface IParams extends ParsedUrlQuery {
  id: string;
}

const ArtistDashboard = ({ artist }: { artist: Artist }) => {
  const router = Router;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Artist>({
    defaultValues: {
      id: artist.id,
      firstname: artist.firstname,
      lastname: artist.lastname,
      biography: artist.biography,
      email: artist.email,
      facebook_link: artist.facebook_link,
      instagram_link: artist.instagram_link,
    },
  });

  const { isLoading, apiData, request } = useRequest<Artist>(
    `artists/${artist.id}`,
    "PUT"
  );

  useEffect(() => {
    if (isLoading === false && apiData !== null) {
      router.push("/dashboard/artists");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onSubmit = async (data: Artist) => {
    request(data);
  };

  const item: SxProps<Theme> = {
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
      component="section"
      sx={{mt: 25, mb: 8, display: 'flex', overflow: 'hidden' }}
    >
       <Container sx={{ display: 'flex', position: 'relative' }}>
        <Grid container spacing={50}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <FormGroup
                sx={{ display: "flex", flexDirection: "column", width: "45%" }}
              >
                <Typography variant="h4" marked="center">Informations</Typography>

                <TextField
                  label="Prénom"
                  variant="filled"
                  focused
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
            </Box>
          </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={item}>
            <FormGroup
              sx={{ display: "flex", flexDirection: "column", width: "80%" }}
            >
              <Typography  variant="h4" align='center' marked="center">Biographie</Typography>
              <Box sx={{mt: 3}}>
              <TextareaAutosize
                aria-label="Biographie"
                minRows={20}
                placeholder=""
                style={{minWidth: "150%", height: "115%" }}
                {...register("biography")}
              />
              </Box>
            </FormGroup>
          </Box>
        </Grid>
        </Grid>
        </Container>
        </Box>
        

        <Box sx={item}>
          <Button color="secondary" variant="contained" type="submit">
            Enregistrer
          </Button>
          
        </Box>
      </form>
      </Dashboard>
  );
};

export default ArtistDashboard;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as IParams;
  const artist = await models.artist.findMany({
    where: { id: parseInt(id) },
  });
  return { props: { artist } };
};
