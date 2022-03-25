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

type TayloredPlayWithAudienceAndTags = {
  id: number;
  title: string;
  concept: string;
  audienceCategories: AudienceCategory[];
  tags: Tag[];
};
type RequestTayloredPlayWithAudienceAndTags = {
  id: number;
  title: string;
  concept: string;
  audienceCategories: string;
  tags: string;
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

const TayloredPlaysDashboard = ({
  taylored_play,
}: {
  taylored_play: TayloredPlayWithAudienceAndTags;
}) => {
  const router = Router;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestTayloredPlayWithAudienceAndTags>({
    defaultValues: {
      id: taylored_play.id,
      title: taylored_play.title,
      concept: taylored_play.concept,
      audienceCategories: taylored_play.audienceCategories
        .map((item) => item.title)
        .join(","),
      tags: taylored_play.tags.map((item) => item.title).join(","),
    },
  });

  const { isLoading, apiData, request } =
    useRequest<RequestTayloredPlayWithAudienceAndTags>(
      `taylored_plays/${taylored_play.id}`,
      "PUT"
    );

  useEffect(() => {
    if (isLoading === false && apiData !== null) {
      router.push("/dashboard/taylored_plays");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onSubmit = async (data: RequestTayloredPlayWithAudienceAndTags) => {
    console.log(data);
    const requestData = {
      title: data.title,
      concept: data.concept,
      audienceCategories:
        data.audienceCategories !== ""
          ? data.audienceCategories.split(",").map((categ) => categ.trim())
          : [],
      tags:
        data.tags !== ""
          ? data.tags.split(",").map((categ) => categ.trim())
          : [],
    };
    // console.log(requestData)
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <input type="hidden" {...register("id")} />
        <Box
          component="section"
          sx={{ mt: 25, mb: 8, display: "flex", overflow: "hidden" }}
        >
          <Container sx={{ display: "flex", position: "relative" }}>
            <Grid container spacing={50}>
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
                        aria-label="Concept"
                        minRows={20}
                        placeholder=""
                        style={{ width: "100%", height: "100%" }}
                        {...register("concept")}
                      />
                    </Box>
                  </FormGroup>
                </Box>
              </Grid>
            </Grid>
          </Container>
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
    </Dashboard>
  );
};

export default TayloredPlaysDashboard;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as IParams;
  const taylored_play = await models.tayloredPlay.findUnique({
    where: { id: parseInt(id) },
    include: {
      audienceCategories: { select: { title: true } },
      tags: { select: { title: true } },
    },
  });
  taylored_play?.audienceCategories.join(" ");
  taylored_play?.tags.join(" ");
  return { props: { taylored_play } };
};
