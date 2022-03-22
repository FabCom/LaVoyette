import { Box } from "@mui/material"
import Typography from "components/Typography"
import useRequest from "hooks/useRequest";
import { useEffect, useState } from "react";

type CompanyInfo = {
  id: number;
  name: string;
  description: string;
  email: string;
  facebook_link: string | null;
  instagram_link: string | null;
};

const Contact = () => {
  const {
    isLoading,
    serverError,
    request,
    apiData: company,
  } = useRequest<CompanyInfo>("company", "GET");

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10}}>
      <Typography variant='h2'>Contactez{company ? " " + company.name : "-nous"}</Typography>
      <Typography variant='h4' sx={{marginTop: 4}}><a href={`mailto: ${company ? " " + company.email : ""}`}>{company ? " " + company.email : ""}</a></Typography>
    </Box>
  )
}

export default Contact