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
import { COMPANY_NAME } from "config";
import models from "lib/models";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Company, Role } from '@prisma/client'
import useRequest from "hooks/useRequest";
import { useEffect } from "react";
import Router from "next/router";

type Props = {
  company: Company;
};

type FormCompanyInfo = {
  name: string;
  description: string;
  email: string;
  facebook_link: string | null;
  instagram_link: string | null;
};

export const validFormCompany = yup.object().shape({
  email: yup.string().email('format invalide').required('requis'),
  facebook_link: yup.string().url('format invalide').nullable(),
  instagram_link: yup.string().url('format invalide').nullable(),
});

const CompanyDashboard = ({company}: {company: Company}) => {
  const router = Router;
  // console.log(company)
  const { register, setValue, handleSubmit, formState: { errors }} = useForm<FormCompanyInfo>({
    defaultValues: {
      name: company.name,
      description: company.description,
      email: company.email,
      facebook_link: company.facebook_link,
      instagram_link: company.instagram_link,
    },
    resolver: yupResolver(validFormCompany)
  });
  const {isLoading, apiData, request } = useRequest<Company>("company", "PUT");

  useEffect(()=> {
    if (isLoading === false && apiData !== null)
    {router.push('/dashboard')}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])


  const onSubmit = async (data: FormCompanyInfo) => {
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
      <Container sx={{ display: "flex", position: "relative" }}>
        <Typography
          variant="h2"
          marked="center"
          align="center"
          sx={{ marginTop: 15 }}
        >
          Informations sur la compagnie
        </Typography>
      </Container>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "150%" }}>
        <input type="hidden" {...register("name")} />
        <Box
          component="section"
          sx={{ mt: 15, mb: 8, display: "flex", overflow: "hidden" }}
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
                      Contacts / R??seaux
                    </Typography>
                    <TextField
                      label="Email"
                      variant="filled"
                      focused
                      {...register("email")}
                      error={errors.email ? true : false}
                      helperText={errors.email ? errors.email.message : null}
                      sx={{ marginTop: 3 }}
                    />
                    <TextField
                      label="Lien facebook"
                      variant="filled"
                      focused
                      {...register("facebook_link")}
                      error={errors.facebook_link ? true : false}
                      helperText={errors.facebook_link ? errors.facebook_link.message : null}
                      sx={{ marginTop: 3 }}
                    />
                    <TextField
                      label="Lien instagram"
                      variant="filled"
                      focused
                      {...register("instagram_link")}
                      error={errors.instagram_link ? true : false}
                      helperText={errors.instagram_link ? errors.instagram_link.message : null}
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
                        aria-label="Descritpion"
                        minRows={20}
                        placeholder=""
                        style={{ width: "100%", height: "100%" }}
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

CompanyDashboard.auth = {
  role: Role.ADMIN,
};

export default CompanyDashboard;

export async function getServerSideProps<GetServerSideProps>() {
  const company = await models.company.findUnique({
    where: { name: COMPANY_NAME },
  });

  return { props: { company } };
}
