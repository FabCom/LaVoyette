import React from "react";
import Navbar from "components/navbar";
import TeamHero from "components/TeamHero";
import useRequest from "hooks/useRequest";
import Typography from "../components/Typography";
import { useEffect } from "react";
import withRoot from "../withRoot";
import ContainerStory from "components/ContainerStory";
import TimelineComponents from "components/Timeline";
import PartnerHero from "components/PartnerHero";

import type { Company } from "@prisma/client";
import type { CompanyPartner } from "@prisma/client";

const AboutPages = () => {
  const {
    isLoading,
    serverError,
    request,
    apiData: company,
  } = useRequest<Company[]>("company", "GET");

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(isLoading, serverError, company);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, serverError]);

  // let blockCompany = <></>;
  // if (company) {
  //   blockCompany = (
  //     <>
  //       {company.map((company: Company, i: React.Key | null | undefined) => (
  //         <ContainerStory key={i} company={company} />
  //       ))}
  //     </>
  //   );
  // }

  

  return (
    <>
      <React.Fragment>
      <ContainerStory company={{
        id: 0,
        name: "",
        description: "",
        email: "",
        facebook_link: null,
        instagram_link: null
      }}/>
      
        {/* {blockCompany} */}
      </React.Fragment>
     
      <TimelineComponents/>
      <PartnerHero companypartner={{
          id: 0,
          name: "",
          description: null,
          logo_src: null,
          companyId: null
        }}/>

    </>
  );
  };

export default AboutPages;
