import {
  Button,
  Container,
  FormGroup,
  Grid,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { CompanyPartner, Role } from "@prisma/client";
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
import { validFormPartner } from "../create";

interface IParams extends ParsedUrlQuery {
  id: string;
}

const PartnerDashboard = ({ partner }: { partner: CompanyPartner }) => {
  const router = Router;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyPartner>({
    defaultValues: {
      id: partner.id,
      name: partner.name,
      description: partner.description,
      logo_src: partner.logo_src,
    },
    resolver: yupResolver(validFormPartner)
  });

  const { isLoading, apiData, request } = useRequest<CompanyPartner>(
    `partners/${partner.id}`,
    "PUT"
  );

  useEffect(() => {
    if (isLoading === false && apiData !== null) {
      router.push("/dashboard/partners");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onSubmit = async (data: CompanyPartner) => {
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
        {" "}
        Éditer un partenaire
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <input type="hidden" {...register("id")} />
        <Box
          component="section"
          sx={{ mt: 25, mb: 8, display: "flex", overflow: "hidden" }}
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
              error={errors.name ? true : false}
              helperText={errors.name ? errors.name.message : null}
              sx={{ marginTop: 3 }}
            />
            <TextField
              label="Lien vers le logo"
              variant="filled"
              focused
              {...register("logo_src")}
              error={errors.logo_src ? true : false}
              helperText={errors.logo_src ? errors.logo_src.message : null}
              sx={{ marginTop: 3 }}
            />
          </FormGroup>
          <FormGroup
            sx={{ display: "flex", flexDirection: "column", width: "45%" }}
          >
            <Typography variant="h4">Description</Typography>
            <TextareaAutosize
              aria-label="description"
              minRows={20}
              placeholder=""
              style={{ width: "100%" }}
              {...register("description")}
            />
          </FormGroup>
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

PartnerDashboard.auth = {
  role: Role.ADMIN,
};

export default PartnerDashboard;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as IParams;
  const partner = await models.companyPartner.findUnique({
    where: { id: parseInt(id) },
  });
  return { props: { partner } };
};
