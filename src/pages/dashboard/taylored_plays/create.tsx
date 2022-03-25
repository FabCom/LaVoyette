import {
  Button,
  Container,
  FormGroup,
  Grid,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import Dashboard from "components/dashboard/LayoutDashboard";
import Typography from "components/Typography";
import useRequest from "hooks/useRequest";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Router from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Role } from "@prisma/client";

type RequestTayloredPlayWithAudienceAndTags = {
  id: number;
  title: string;
  concept: string;
  audienceCategories: string;
  tags: string;
};

export const validFormTayloredPlay = yup.object().shape({
  title: yup.string().required('requis'),
  concept: yup.string().required('requis'),
  audienceCategories: yup.string().matches(/(.+?)(?:,|$)/, "Un mot ou une liste de mots séparés par une virgule"),
  tags: yup.string().default(null).matches(/(.+?)(?:,|$)/, "Un mot ou une liste de mots séparés par une virgule")
});

const CreateTayloredPlaysDashboard = () => {
  const router = Router;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestTayloredPlayWithAudienceAndTags>({resolver: yupResolver(validFormTayloredPlay)});

  const { isLoading, apiData, request } =
    useRequest<RequestTayloredPlayWithAudienceAndTags>(
      `taylored_plays`,
      "POST"
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
        Créer un spectacle sur-mesure
      </Typography>
      <Container sx={{ display: "flex", position: "relative" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <input type="hidden" {...register("id")} />
          <Box
            component="section"
            sx={{ mt: 25, mb: 8, display: "flex", overflow: "hidden" }}
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

CreateTayloredPlaysDashboard.auth = {
  role: Role.ADMIN,
};

export default CreateTayloredPlaysDashboard;
