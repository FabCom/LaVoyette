import { Box } from "@mui/material"
import { Company } from "@prisma/client";
import Typography from "components/Typography"
import { COMPANY_NAME } from "config";
import useRequest from "hooks/useRequest";
import models from "lib/models";

type CompanyInfo = {
  id: number;
  name: string;
  description: string;
  email: string;
  facebook_link: string | null;
  instagram_link: string | null;
};

const Contact = ({ company }: {company: Company}) => {
  
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10}}>
      <Typography color="inherit" align="center" variant="h2" marked="center" sx={{ mt: 25 }}>
        Contactez {company.name} :
      </Typography>
         <Typography variant='h4' sx={{marginTop: 4}}><a href={`mailto: ${company ? " " + company.email : ""}`}>{company ? " " + company.email : ""}</a></Typography>
    </Box>
  )
}

export async function getStaticProps() {

  const company = await models.company.findUnique({where: {name: COMPANY_NAME}})
 
  return {
    props: {
      company,
    },
  }
}

export default Contact
