import {
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Role, User } from "@prisma/client";
import Dashboard from "components/dashboard/LayoutDashboard";
import Typography from "components/Typography";
import useRequest from "hooks/useRequest";
import models from "lib/models";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import { useForm, Controller, NestedValue } from "react-hook-form";
import Router from "next/router";
import { deserialize, serialize } from "superjson";

import type { SuperJSONResult } from "superjson/dist/types";

interface IParams extends ParsedUrlQuery {
  id: string;
}

const StoryDashboard = ({ ser_user }: { ser_user: SuperJSONResult }) => {
  const router = Router;
  const user: User = deserialize(ser_user);
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
  });

  const { isLoading, apiData, request } = useRequest<User>(
    `users/admin/${user.id}`,
    "PUT"
  );

  useEffect(() => {
    if (isLoading === false && apiData !== null) {
      router.push("/dashboard/users");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onSubmit = async (data: User) => {
    // console.log(data);
    request(data);
  };

  const categoryOptionsForRole = [
    {value: Role.USER, label:Role.USER},
    {value: Role.ADMIN, label:Role.ADMIN},
    {value: Role.ARTIST, label:Role.ARTIST},
  ]
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
            sx={{ display: "flex", flexDirection: "column", width: "100%" }}
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
              label="Email"
              variant="filled"
              focused
              {...register("email")}
              sx={{ marginTop: 3 }}
            />
            <TextField
              label="Image"
              variant="filled"
              focused
              {...register("image")}
              sx={{ marginTop: 3 }}
            />

            <InputLabel id="Role">Rôle</InputLabel>
            <Controller
                control={control}
                name='role'
                render={({ field: { onChange, value } }) => (
                    <>
                    <Select defaultValue={user.role} onChange={onChange} value={value}>
                        <MenuItem value={Role.ADMIN}>{Role.ADMIN}</MenuItem>
                        <MenuItem value={Role.USER}>{Role.USER}</MenuItem>
                    </Select>
                    </>
                )}
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
    </Dashboard>
  );
};

export default StoryDashboard;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as IParams;
  const req_user = await models.user.findUnique({
    where: { id: id },
  });
  const ser_user = serialize(req_user);
  return { props: { ser_user } };
};