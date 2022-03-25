import {
  Button,
  Container,
  FormGroup,
  Grid,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { CompanyPartner } from "@prisma/client";
import Dashboard from "components/dashboard/LayoutDashboard";
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <input type="hidden" {...register("id")} />
        <Box
          component="section"
          sx={{ mt: 25, mb: 8, display: "flex", overflow: "hidden" }}
        >
          <Container sx={{ display: "flex", position: "relative" }}>
            <Grid container spacing={20}>
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
                      label="Nom"
                      variant="filled"
                      focused
                      {...register("name")}
                      sx={{ marginTop: 3 }}
                    />
                    <TextField
                      label="Lien vers le logo"
                      variant="filled"
                      focused
                      {...register("logo_src")}
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
                        aria-label="description"
                        minRows={20}
                        placeholder=""
                        style={{ width: "100%" }}
                        {...register("description")}
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

export default PartnerDashboard;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as IParams;
  const partner = await models.companyPartner.findUnique({
    where: { id: parseInt(id) },
  });
  return { props: { partner } };
};
