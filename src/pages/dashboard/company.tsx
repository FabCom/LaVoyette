import { FormGroup, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Dashboard from "components/dashboard/LayoutDashboard";
import Typography from "components/Typography";
import { COMPANY_NAME } from "config";
import models from "lib/models";
import { useForm } from "react-hook-form";

import type { Company } from '@prisma/client'
import useRequest from "hooks/useRequest";

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

const CompanyDashboard: React.FC<Props> = ({company}) => {

  // console.log(company)
  const { register, setValue, handleSubmit, formState: { errors }} = useForm<FormCompanyInfo>({
    defaultValues: {
      name: company.name,
      description: company.description,
      email: company.email,
      facebook_link: company.facebook_link,
      instagram_link: company.instagram_link
    },
  });
  const { request } = useRequest<Company>("company", "PUT");

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
              sx={{marginTop: 3}}
            />
            <TextField
              label="Lien facebook"
              variant="filled"
              focused
              {...register("facebook_link")}
              sx={{marginTop: 3}}
            />
            <TextField
              label="Lien instagram"
              variant="filled"
              focused
              {...register("instagram_link")}
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
          <input type="submit" />
        </Box>
      </form>
    </Dashboard>
  );
};

export default CompanyDashboard;

export async function getServerSideProps<GetServerSideProps>() {

  const company = await models.company.findUnique({where: {name: COMPANY_NAME}})

  return { props: { company } }
}