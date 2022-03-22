import * as React from "react";
import Typography from "../components/Typography";

import type { Company } from "@prisma/client";
import { AppProps } from "next/app";
import { Box, Grid } from "@mui/material";
//
export default function ContainerStory({ company }: { company: Company }) {
  // const company = props.company;
  // console.log(company);

  if (company) {
    return (
      <>
        {" "}
        <Typography
          color="inherit"
          align="center"
          variant="h2"
          marked="center"
          sx={{ mt: 25 }}
        >
          {company.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 15,
            px: 50,
          }}
        >
          <Typography variant="h6" sx={{ justifyContent: "center" }}>
            {company.description}
          </Typography>
        </Box>
      </>
    );
  } else {
    return <p>is loading</p>;
  }
}
