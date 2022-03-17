import * as React from 'react';
import Layout from 'components/layout'
import Hero from 'components/Hero';
import ProductValues from 'components/Products';
import ProductCategories from 'components/ProductCategories';
import TeamHero from 'components/TeamHero';
import withRoot from '../withRoot';

function Index() {
    return (
        <React.Fragment>
            <Layout/>
            <Hero/>
            <ProductCategories />
            <TeamHero/>
        </React.Fragment>
    );
}

export default withRoot(Index);