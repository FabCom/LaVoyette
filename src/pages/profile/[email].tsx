import { GetServerSideProps } from "next";
import { getCsrfToken, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import models from "lib/models";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import useRequest from "hooks/useRequest";
import { useEffect } from "react";
import Dashboard from "components/dashboard/LayoutDashboard";
import Typography from "components/Typography";
import { Box } from "@mui/system";
import { Button, FormGroup, TextareaAutosize, TextField } from "@mui/material";
import { useState } from "react";
import { useS3Upload } from "next-s3-upload";
import Image from "next/image";

interface IParams extends ParsedUrlQuery {
  email: string;
}

function Profile({ user }: { user: User }) {
  let [imageUrl, setImageUrl] = useState<string>();
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  let handleFileChange = async (file: File) => {
    let { url } = await uploadToS3(file);
    setImageUrl(url);
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    },
  });
  const { isLoading, apiData, request } = useRequest<User>(
    `users/${user.id}`,
    "PUT"
  );

  const functionTest = (event: MouseEvent) => {
    event.preventDefault();
  };
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    openFileDialog();
  };

  useEffect(() => {
    if (isLoading === false && apiData !== null) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onSubmit = async (data: User) => {
    if (imageUrl) {
      data.image = imageUrl;
    }
    request(data);
    console.log(data);
  };

  let BlockImage = <></>;

  if (imageUrl) {
    BlockImage = (
      <>
        <Image src={imageUrl} width="250" height="250" />
      </>
    );
  } else if (user.image) {
    BlockImage = (
      <>
        <Image  src={user.image} width="250" height="250" />
      </>
    );
  }
  else {
    BlockImage =(
      <>
        <Image  src="/noImageFound.jpg" width="250" height="250" />
      </>
    )
  }
  const { data: session } = useSession();
  const router = useRouter();
  const { email } = router.query;
  if (session && session.user.email === email) {
    return (
      <>
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
                {...register("name")}
                sx={{ marginTop: 3 }}
              />
              {/* <input type="hidden" {...register("image")} /> */}
              
            </FormGroup>
            <FormGroup
              sx={{ display: "flex", flexDirection: "column", width: "45%" }}
            >
              <Typography variant="h4">Email</Typography>
              <TextField
                label="email"
                variant="filled"
                focused
                {...register("email")}
                sx={{ marginTop: 3 }}
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
            <Typography variant="h4">Avatar</Typography>

            {BlockImage}
            <div>
                <FileInput onChange={handleFileChange} />

                <Button sx={{ marginTop: 3 }} color="primary" variant="contained" type="submit" onClick={buttonHandler}>Changer Avatar</Button>

                
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
      </>
    );
  } else {
    return <h1>Loading..</h1>;
  }
}

export default Profile;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { email } = params as IParams;
  const requestUser = await models.user.findUnique({
    where: { email: email },
  });
  const user = {
    id: requestUser?.id,
    name: requestUser?.name,
    image: requestUser?.image,
    email: requestUser?.email,
  };
  return { props: { user } };
};
