import * as React from "react";
import Navbar from "components/navbar";
import Hero from "components/Hero";
import ProductValues from "components/Products";
import ProductCategories from "components/ProductCategories";
import TeamHero from "components/TeamHero";
import withRoot from "../withRoot";

function Index() {
    return (
        <React.Fragment>
            <Navbar/>
            <Hero/>
            <ProductCategories />
            {/* <TeamHero /> */}
        </React.Fragment>
    );
}

export default withRoot(Index);
