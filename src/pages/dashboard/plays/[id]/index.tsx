import { Button, FormGroup, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { AudienceCategory, Role, Tag } from "@prisma/client";
import Dashboard from "components/dashboard/LayoutDashboard";
import Typography from "components/Typography";
import useRequest from "hooks/useRequest";
import models from "lib/models";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { validFormPlay } from "../create";
import { useS3Upload } from "next-s3-upload";

type Image = { title: string; src: string };

type PlayWithAudienceAndTags = {
  id: number;
  title: string;
  abstract: string;
  duration: number;
  audienceCategories: AudienceCategory[];
  tags: Tag[];
  images: Image[];
};
type RequestPlayWithAudienceAndTags = {
  id: number;
  title: string;
  abstract: string;
  duration: number;
  audienceCategories: string;
  tags: string;
  images: Image[];
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

const PlaysDashboard = ({ play }: { play: PlayWithAudienceAndTags }) => {
  const router = Router;
  const [urls, setUrls] = useState<string[]>([]);
  const { uploadToS3, files } = useS3Upload();

  const handleFilesChange = async ({
    target,
  }: {
    target: HTMLInputElement;
  }) => {
    if (target.files) {
      const files = Array.from(target.files);
      console.log(target);
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const { url } = await uploadToS3(file);

        setUrls((current) => [...current, url]);
      }
    }
  };

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
    resolver: yupResolver(validFormPlay),
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
      images: data.images,
    };
    if (urls) {
      const imagesData = urls.map((url, index) => ({
        title: url.slice(url.lastIndexOf("/") + 1),
        src: url,
      }));
      console.log(imagesData);
      requestData.images = imagesData;
    }

    // console.log(requestData)
    request(requestData);
  };
	console.log(play)
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
              label="Titre"
              variant="filled"
              focused
              {...register("title")}
              error={errors.title ? true : false}
              helperText={errors.title ? errors.title.message : null}
              sx={{ marginTop: 3 }}
            />
            <TextField
              label="Durée (en minutes)"
              variant="filled"
              focused
              {...register("duration")}
              error={errors.duration ? true : false}
              helperText={errors.duration ? errors.duration.message : null}
              sx={{ marginTop: 3 }}
            />
            <TextField
              label="Public"
              variant="filled"
              focused
              {...register("audienceCategories")}
              error={errors.audienceCategories ? true : false}
              helperText={
                errors.audienceCategories
                  ? errors.audienceCategories.message
                  : null
              }
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
          <FormGroup
            sx={{ display: "flex", flexDirection: "column", width: "45%" }}
          >
            <Typography variant="h4">Description</Typography>
            <TextareaAutosize
              aria-label="abstract"
              minRows={20}
              placeholder=""
              style={{ width: "100%" }}
              {...register("abstract")}
            />
          </FormGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "space-around",
            width: "100%",
            marginTop: 5,
            marginLeft: 5,
          }}
        >
          <Typography variant="h4">Images</Typography>
          <div>
            <input
              id="upload-button"
              accept=".jpg, .png, .gif"
              type="file"
              name="file"
              style={{ display: "none" }}
              multiple={true}
              onChange={handleFilesChange}
            />
            <label htmlFor="upload-button">
              <Button color="primary" variant="contained" component="span">
                Ajouter des images
              </Button>
            </label>
          </div>
          <div style={{ marginTop: 5 }}>
						{play.images.length !== 0 && (
              <Typography variant="h6">Images actuelles : </Typography>
            )}
						{play.images.map((image, index) => (
              <div key={index}>{image.title}</div>
            ))}
            {urls.length !== 0 && (
              <Typography variant="h6">Nouvelles images: </Typography>
            )}

            {urls.map((url, index) => (
              <div key={index}>{url.slice(url.lastIndexOf("/") + 1)}</div>
            ))}
          </div>
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
          <Button color="secondary" variant="contained" type="submit">
            Enregistrer
          </Button>
        </Box>
      </form>
    </Dashboard>
  );
};

PlaysDashboard.auth = {
  role: Role.ADMIN,
};

export default PlaysDashboard;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as IParams;
  const play = await models.play.findUnique({
    where: { id: parseInt(id) },
    include: {
      audienceCategories: { select: { title: true } },
      tags: { select: { title: true } },
			images: {select:  {title: true}},
    },
  });
  play?.audienceCategories.join(" ");
  play?.tags.join(" ");
  return { props: { play } };
};
