import * as React from "react";
import Typography from "../components/Typography";

import type { Company } from "@prisma/client";
import { AppProps } from "next/app";
//
export default function ContainerStory({ company }: { company: Company }) {
  // const company = props.company;
  // console.log(company);

  if (company) {
    return (
      <>
        <Typography color="inherit" align="center" variant="h2" sx={{ mt: 10 }}>
          {company.name}
        </Typography>
        <Typography variant="h6" sx={{ mt: 10, mr: 20, ml: 20}}>{company.description}</Typography>
      </>
    );
  } else {
    return <p>is loading</p>;
  }
}
