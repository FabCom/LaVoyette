import { Button, FormGroup, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Artist } from "@prisma/client";
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
import { validFormArtist } from "../create";

interface IParams extends ParsedUrlQuery {
  id: string;
}

const ArtistDashboard = ({ artist}: {artist: Artist;}) => {
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
      
    },resolver: yupResolver(validFormArtist)
  });

  const { isLoading, apiData, request } = useRequest<Artist>(
    `artists/${artist.id}`,
    "PUT"
  );


  useEffect(()=> {
    if (isLoading === false && apiData !== null)
    {router.push('/dashboard/artists')}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])


  const onSubmit = async (data: Artist) => {
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

export default ArtistDashboard;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as IParams;
  const artist = await models.artist.findUnique({
    where: { id: parseInt(id) },
  });
  return { props: { artist } };
};
