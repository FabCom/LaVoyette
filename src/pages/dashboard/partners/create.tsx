import { Button, FormGroup, TextareaAutosize, TextField } from "@mui/material";
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

  const {isLoading, apiData, request } = useRequest<CompanyPartner>(
    `partners`,
    "POST"
  );

  useEffect(()=> {
    if (isLoading === false && apiData !== null)
    {router.push('/dashboard/partners')}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const onSubmit = async (data: CompanyPartner) => {
    request(data);
  };

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
              label="Nom"
              variant="filled"
              focused
              {...register("name")}
              error={errors.name ? true : false}
              helperText={errors.name ? errors.name.message : null}
              sx={{ marginTop: 3 }}
            />
            <TextField
              label="url vers un logo"
              variant="filled"
              focused
              error={errors.logo_src ? true : false}
              helperText={errors.logo_src ? errors.logo_src.message : null}
              {...register("logo_src")}
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
          <Button color="secondary" variant="contained" type="submit">Enregistrer</Button>
        </Box>
      </form>
    </Dashboard>
  );
};

CreatePartnersDashboard.auth = {
  role: Role.ADMIN,
};

export default CreatePartnersDashboard;