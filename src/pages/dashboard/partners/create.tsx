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
import { CompanyPartner, Role } from "@prisma/client";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export const validFormPartner = yup.object().shape({
  name: yup.string().required('requis'),
  logo_src: yup.string().url().required('requis'),
  description: yup.string()
});


const CreatePartnersDashboard = () => {
  const router = Router;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyPartner>({resolver: yupResolver(validFormPartner)});

  const { isLoading, apiData, request } = useRequest<CompanyPartner>(
    `partners`,
    "POST"
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
        Ajouter un nouveau partenaire
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <input type="hidden" {...register("id")} />
        <Box
          component="section"
          sx={{ mt: 25, mb: 8, display: "flex", overflow: "hidden" }}
        >
          <Container sx={{ display: "flex", position: "relative" }}>
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

CreatePartnersDashboard.auth = {
  role: Role.ADMIN,
};

export default CreatePartnersDashboard;
