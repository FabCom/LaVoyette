import React from "react";
import Navbar from "components/navbar";
import TeamHero from "components/TeamHero";
import useRequest from "hooks/useRequest";
import Typography from "../components/Typography";
import { useEffect } from "react";
import withRoot from "../withRoot";
import ContainerStory from "components/ContainerStory";
import TimelineComponents from "components/Timeline";

import type { Company } from "@prisma/client";

const AboutPages = () => {
  const {
    isLoading,
    serverError,
    request,
    apiData: companys,
  } = useRequest<Company[]>("companys", "GET");

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(isLoading, serverError, companys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, serverError]);

  let blockCompanys = <></>;
  if (companys) {
    blockCompanys = (
      <>
        {companys.map((company: Company, i) => (
          <TeamHero key={i} company={company} />
        ))}
      </>
    );
  }

  return (
    <>
      <React.Fragment>
        <Navbar />
        {blockCompanys}
      </React.Fragment>
      <ContainerStory/>
      <TimelineComponents/>

    </>
  );
};

export default withRoot(AboutPages);
