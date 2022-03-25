import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { AudienceCategory, Role, Tag } from "@prisma/client";
import Dashboard from "components/dashboard/LayoutDashboard";
import Typography from "components/Typography";
import useRequest from "hooks/useRequest";
import models from "lib/models";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import Router from 'next/router'
import { useEffect } from "react";

type TayloredPlayWithAudienceAndTags = {
  id: number;
  title: string;
  concept: string;
  audienceCategories: AudienceCategory[];
  tags: Tag[];
};


interface IParams extends ParsedUrlQuery {
  id: string;
}

const TayloredPlaysDashboard = ({ taylored_play}: {taylored_play: TayloredPlayWithAudienceAndTags;}) => {
  const router = Router
  
  const { isLoading, request, apiData } = useRequest<String>(
    `taylored_plays/${taylored_play.id}`,
    "DELETE"
  );
  useEffect(()=> {
    if (isLoading === false && apiData !== null)
    {router.push('/dashboard/taylored_plays')}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const onDelete = async () => {
    request();
  };

  return (
    <Dashboard>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8, width: "100%"}}>
          <Typography variant="h3">ATTENTION</Typography>
          <p>Vous êtes sur le point de supprimer le spectacle sur-mesure</p>
          <Typography variant="h4">{taylored_play.title}</Typography>
          <p>Cette action est irréversible.</p>
          <p>Confirmer la suppression ou annuler.</p>
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 8, width: "30%"}}>
            <Link href="/dashboard/taylored_plays" passHref><Button variant="contained" type="submit">Annuler</Button></Link>
            <Button color="secondary" variant="contained" type="submit" onClick={() => onDelete()}>Supprimer</Button>
          </Box>
        </Box>
    </Dashboard>
  );
};

TayloredPlaysDashboard.auth = {
  role: Role.ADMIN,
};

export default TayloredPlaysDashboard;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as IParams;
  const taylored_play = await models.tayloredPlay.findUnique({
    where: { id: parseInt(id) },
  });
  return { props: { taylored_play } };
};
