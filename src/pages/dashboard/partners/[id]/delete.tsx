import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { CompanyPartner, Role } from "@prisma/client";
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

const DeletePartnerDashboard = ({ partner }: { partner: CompanyPartner }) => {
  const router = Router;

  const { isLoading, request, apiData } = useRequest<String>(
    `partners/${partner.id}`,
    "DELETE"
  );
  useEffect(() => {
    if (isLoading === false && apiData !== null) {
      router.push("/dashboard/partners");
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
        <Typography variant="h4">{partner.name}</Typography>
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
          <Link href="/dashboard/partners" passHref>
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
  const partner = await models.companyPartner.findUnique({
    where: { id: parseInt(id) },
  });
  return { props: { partner } };
};
