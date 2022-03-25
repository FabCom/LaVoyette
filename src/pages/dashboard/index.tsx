import * as React from "react";
import DashboardHome from "components/DashboardHome";
import { Role } from "@prisma/client";

function Index() {
  return (
    <React.Fragment>
      <DashboardHome />
    </React.Fragment>
  );
}

Index.auth = {
  role: Role.ADMIN,
};


export default Index;