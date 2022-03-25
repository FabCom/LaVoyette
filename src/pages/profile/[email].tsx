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

interface IParams extends ParsedUrlQuery {
  email: string;
}

function Profile({ user }: { user: User }) {
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

  useEffect(() => {
    if (isLoading === false && apiData !== null) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onSubmit = async (data: User) => {
    request(data);
  };
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
              <TextField
                label="image"
                variant="filled"
                focused
                {...register("image")}
                sx={{ marginTop: 3 }}
              />
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
