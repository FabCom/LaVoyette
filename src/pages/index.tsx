import * as React from "react";
import Hero from "components/Hero";
import ProductCategories from "components/ProductCategories";
import withRoot from "../withRoot";

function Index() {
    return (
        <React.Fragment>
            <Hero/>
            <ProductCategories />
        </React.Fragment>
    );
}

export default withRoot(Index);
