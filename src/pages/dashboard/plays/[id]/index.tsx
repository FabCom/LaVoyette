import {
  Button,
  Container,
  FormGroup,
  Grid,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { AudienceCategory, Tag } from "@prisma/client";
import Dashboard from "components/dashboard/LayoutDashboard";
import Typography from "components/Typography";
import useRequest from "hooks/useRequest";
import models from "lib/models";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";

type PlayWithAudienceAndTags = {
  id: number;
  title: string;
  abstract: string;
  duration: number;
  audienceCategories: AudienceCategory[];
  tags: Tag[];
};
type RequestPlayWithAudienceAndTags = {
  id: number;
  title: string;
  abstract: string;
  duration: number;
  audienceCategories: string;
  tags: string;
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

const PlaysDashboard = ({ play }: { play: PlayWithAudienceAndTags }) => {
  const router = Router;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestPlayWithAudienceAndTags>({
    defaultValues: {
      id: play.id,
      title: play.title,
      duration: play.duration,
      abstract: play.abstract,
      audienceCategories: play.audienceCategories
        .map((item) => item.title)
        .join(","),
      tags: play.tags.map((item) => item.title).join(","),
    },
  });

  const { isLoading, apiData, request } =
    useRequest<RequestPlayWithAudienceAndTags>(`plays/${play.id}`, "PUT");

  useEffect(() => {
    if (isLoading === false && apiData !== null) {
      router.push("/dashboard/plays");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onSubmit = async (data: RequestPlayWithAudienceAndTags) => {
    console.log(data);
    const requestData = {
      title: data.title,
      abstract: data.abstract,
      duration: data.duration,
      audienceCategories:
        data.audienceCategories !== ""
          ? data.audienceCategories.split(",").map((categ) => categ.trim())
          : [],
      tags:
        data.tags !== ""
          ? data.tags.split(",").map((categ) => categ.trim())
          : [],
    };
    request(requestData);
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
        {" "}
        Éditer un spectacle
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
                      label="Titre"
                      variant="filled"
                      focused
                      {...register("title")}
                      sx={{ marginTop: 3 }}
                    />
                    <TextField
                      label="Durée"
                      variant="filled"
                      focused
                      {...register("duration")}
                      sx={{ marginTop: 3 }}
                    />
                    <TextField
                      label="Public"
                      variant="filled"
                      focused
                      {...register("audienceCategories")}
                      sx={{ marginTop: 3 }}
                    />

                    <TextField
                      label="Tag"
                      variant="filled"
                      focused
                      {...register("tags")}
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
                      Description
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                      <TextareaAutosize
                        aria-label="abstract"
                        minRows={20}
                        placeholder=""
                        style={{ width: "100%", height: "100%" }}
                        {...register("abstract")}
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

export default PlaysDashboard;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as IParams;
  const play = await models.play.findUnique({
    where: { id: parseInt(id) },
    include: {
      audienceCategories: { select: { title: true } },
      tags: { select: { title: true } },
    },
  });
  play?.audienceCategories.join(" ");
  play?.tags.join(" ");
  return { props: { play } };
};
