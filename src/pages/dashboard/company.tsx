import { Button, FormGroup, TextareaAutosize, TextField } from "@mui/material";
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
  company: Company
}

type FormCompanyInfo = {
  name: string,
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
      instagram_link: company.instagram_link
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
    request(data)
  };

  return (
    <Dashboard>
      <Typography variant='h2' sx={{marginTop: 5}}>Informations sur la compagnie</Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}}>
        <input type="hidden" {...register("name")}/>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            marginTop: 5
          }}
        >
          <FormGroup
            sx={{ display: "flex", flexDirection: "column", width: "45%" }}
          >
            <Typography variant='h4'>Contacts / Réseaux</Typography>
            <TextField
              label="Email"
              variant="filled"
              focused
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : null}
              sx={{marginTop: 3}}
            />
            <TextField
              label="Lien facebook"
              variant="filled"
              focused
              {...register("facebook_link")}
              error={errors.facebook_link ? true : false}
              helperText={errors.facebook_link ? errors.facebook_link.message : null}
              sx={{marginTop: 3}}
            />
            <TextField
              label="Lien instagram"
              variant="filled"
              focused
              {...register("instagram_link")}
              error={errors.instagram_link ? true : false}
              helperText={errors.instagram_link ? errors.instagram_link.message : null}
              sx={{marginTop: 3}}
            />
          </FormGroup>
          <FormGroup sx={{ display: "flex", flexDirection: "column", width: "45%" }}>
            <Typography variant='h4'>Description</Typography>
            <TextareaAutosize
              aria-label="Descritpion"
              minRows={20}
              placeholder=""
              style={{width: "100%"}}
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
            marginTop: 5
          }}
        >
          <Button color="secondary" variant="contained" type="submit">Enregistrer</Button>
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

  const company = await models.company.findUnique({where: {name: COMPANY_NAME}})

  return { props: { company } }
}