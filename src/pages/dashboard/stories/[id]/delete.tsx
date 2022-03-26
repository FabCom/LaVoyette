import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { CompanyStory, Role } from "@prisma/client";
import Dashboard from "components/dashboard/LayoutDashboard";
import Typography from "components/Typography";
import useRequest from "hooks/useRequest";
import models from "lib/models";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import Router from "next/router";
import { useEffect } from "react";

interface IParams extends ParsedUrlQuery {
  id: string;
}

const DeletePartnerDashboard = ({ story }: { story: CompanyStory }) => {
  const router = Router;

  const { isLoading, request, apiData } = useRequest<String>(
    `stories/${story.id}`,
    "DELETE"
  );
  useEffect(() => {
    if (isLoading === false && apiData !== null) {
      router.push("/dashboard/stories");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onDelete = async () => {
    request();
  };

  return (
    <Dashboard>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
          width: "100%",
        }}
      >
        <Typography variant="h3">ATTENTION</Typography>
        <p>Vous êtes sur le point de supprimer le spectacle sur-mesure</p>
        <Typography variant="h4">{story.title}</Typography>
        <p>Cette action est irréversible.</p>
        <p>Confirmer la suppression ou annuler.</p>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 8,
            width: "30%",
          }}
        >
          <Link href="/dashboard/stories" passHref>
            <Button variant="contained" type="submit">
              Annuler
            </Button>
          </Link>
          <Button
            color="secondary"
            variant="contained"
            type="submit"
            onClick={() => onDelete()}
          >
            Supprimer
          </Button>
        </Box>
      </Box>
    </Dashboard>
  );
};

DeletePartnerDashboard.auth = {
  role: Role.ADMIN,
};

export default DeletePartnerDashboard;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as IParams;
  const story = await models.companyStory.findUnique({
    where: { id: parseInt(id) },
    select: { id: true, title: true },
  });
  return { props: { story } };
};
