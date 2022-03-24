import * as React from "react";
import Hero from "components/Hero";
import ProductCategories from "components/ProductCategories";
import DashboardHome from "components/DashboardHome";


function Index() {
  return (
    <React.Fragment>
      <Hero />
      <ProductCategories />
      <DashboardHome/>
    </React.Fragment>
  );
}

export default Index;
