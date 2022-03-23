import React, { useState } from "react";
import useRequest from "hooks/useRequest";
import { useEffect } from "react";
import ContainerStory from "components/ContainerStory";
import TimelineComponents from "components/Timeline";
import PartnerHero from "components/PartnerHero";

import type { CompanyPartner, CompanyStory } from "@prisma/client";
import Typography from "components/Typography";

type CompanyInfo = {
  id: number;
  name: string;
  description: string;
  email: string;
  facebook_link: string | null;
  instagram_link: string | null;
  companyPartners: CompanyPartner[];
  companyStories: CompanyStory[];
};

const AboutPages = () => {
  const {
    isLoading,
    serverError,
    request,
    apiData: company,
  } = useRequest<CompanyInfo>("company", "GET");

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(company);
  let blockCompany = <></>;
  let blockCompanyPartners = <></>;
  let blockCompanyStories = <></>;
  if (company && company.companyStories && company.companyPartners) {
    blockCompany = (
      <>
        <ContainerStory company={company} />
      </>
    );
    blockCompanyStories = (
      <>
        <TimelineComponents companystories={company.companyStories} />
      </>
    );
    blockCompanyPartners = (
      <>
        <Typography color="inherit" align="center" variant="h2" marked="center" sx={{ mt: 20 }}>
          Nos Partenaires
        </Typography>
        {company.companyPartners.map((companypartner: CompanyPartner, i) => (
          <PartnerHero companypartner={companypartner} key={i} />
        ))}
      </>
    );
  }

  return (
    <>
      <React.Fragment>
        {blockCompany}

        {blockCompanyStories}

        {blockCompanyPartners}
      </React.Fragment>
    </>
  );
};

export default AboutPages;
