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

import type { Company } from "@prisma/client";
import useRequest from "hooks/useRequest";

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

const CompanyDashboard: React.FC<Props> = ({ company }) => {
  // console.log(company)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCompanyInfo>({
    defaultValues: {
      name: company.name,
      description: company.description,
      email: company.email,
      facebook_link: company.facebook_link,
      instagram_link: company.instagram_link,
    },
  });
  const { request } = useRequest<Company>("company", "PUT");

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
      <Typography variant="h2" marked="center" sx={{ marginTop: 15 }}>
        Informations sur la compagnie
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "150%" }}>
        <input type="hidden" {...register("name")} />
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
                    <Typography variant="h4" marked="center">Contacts / Réseaux</Typography>
                    <TextField
                      label="Email"
                      variant="filled"
                      focused
                      {...register("email")}
                      sx={{ marginTop: 3 }}
                    />
                    <TextField
                      label="Lien facebook"
                      variant="filled"
                      focused
                      {...register("facebook_link")}
                      sx={{ marginTop: 3 }}
                    />
                    <TextField
                      label="Lien instagram"
                      variant="filled"
                      focused
                      {...register("instagram_link")}
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
                    <Typography variant="h4" marked="center">Description</Typography>
                    <Box sx={{ mt: 3 }}>
                      <TextareaAutosize
                        aria-label="Descritpion"
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
          <Button color="secondary" variant="contained" type="submit">
            Enregistrer
          </Button>
        </Box>
      </form>
    </Dashboard>
  );
};

export default CompanyDashboard;

export async function getServerSideProps<GetServerSideProps>() {
  const company = await models.company.findUnique({
    where: { name: COMPANY_NAME },
  });

  return { props: { company } };
}
