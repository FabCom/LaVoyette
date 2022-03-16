import * as React from 'react';
import Layout from 'components/layout'
import Hero from 'components/Hero';
import ProductValues from 'components/Products';
import ProductCategories from 'components/ProductCategories';

function Index() {
    return (
        <React.Fragment>
            <Layout/>
            <Hero/>
            <ProductCategories />
        </React.Fragment>
    );
}

export default Index;