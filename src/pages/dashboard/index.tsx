import * as React from "react";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import Typography from "components/Typography";
import { dashboard_contents } from "config/dashboard_content";
import Link from "next/link";
import DashboardHome from "components/DashboardHome";

function Index() {
  return (
    <React.Fragment>
      <DashboardHome />
    </React.Fragment>
  );
}

export default Index;

{
  /* <Card sx={{ minWidth: 275 }}>
<CardContent>

</CardContent>
<CardActions>

</CardActions>
</Card> */
}
