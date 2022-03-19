import React, { useState } from "react";
import useRequest from "hooks/useRequest";
import { useEffect } from "react";
import ContainerStory from "components/ContainerStory";
import TimelineComponents from "components/Timeline";
import PartnerHero from "components/PartnerHero";

import type { CompanyPartner, CompanyStory } from "@prisma/client";

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
    apiData: companies,
  } = useRequest<CompanyInfo>("company", "GET");

  const [company, setCompany] = useState<CompanyInfo | null>(null);
  useEffect(() => {

    request();
  }, []);

  useEffect(() => {
    console.log("useEffect 2");
    console.log(isLoading, serverError, companies);
    if (companies && isLoading === false) {
      console.log("useEffect 2.1");

      setCompany(companies);
    }
  }, [companies, isLoading, serverError]);

  let blockCompany = <></>;
  let blockCompanyPartners = <></>;
  let blockCompanyStories = <></>;
  console.log(company);
  if (company && company.companyStories && company.companyPartners) {
    blockCompany = (
      <>
        <ContainerStory company={company} />
      </>
    );
    blockCompanyStories = (
      <>
        <TimelineComponents companystory={company.companyStories[0]} />
      </>
    );
    blockCompanyPartners = (
      <>
        <PartnerHero companypartner={company.companyPartners[0]} />
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
