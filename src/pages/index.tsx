import * as React from "react";
import Hero from "components/Hero";
import ProductCategories from "components/ProductCategories";
// import ArtistsCards from "components/admin/ArtistsCards";

function Index() {
  return (
    <React.Fragment>
      <Hero />
      <ProductCategories />
      {/* <ArtistsCards/> */}
    </React.Fragment>
  );
}

export default Index;
