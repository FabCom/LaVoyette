import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Chip,
} from "@mui/material";
import { Box } from "@mui/system";
import { CompanyStory } from "@prisma/client";
import Dashboard from "components/dashboard/LayoutDashboard";
import Typography from "components/Typography";
import { COMPANY_NAME } from "config";
import models from "lib/models";
import Link from "next/link";
import { deserialize, serialize } from "superjson";
import { SuperJSONResult } from "superjson/dist/types";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const StoriesDashboard = ({
  ser_stories,
}: {
  ser_stories: SuperJSONResult;
}) => {
  const stories: CompanyStory[] = deserialize(ser_stories);
  return (
    <Dashboard>
      <Typography variant="h2" sx={{ marginTop: 15 }}>
        Historique de la compagnie
      </Typography>
      <Link href="/dashboard/stories/create" passHref>
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          sx={{ mt: 10 }}
        >
          Ajouter
        </Button>
      </Link>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "60%" }}>
            <span>Titre</span>
          </Box>
          <Box sx={{ width: "30%" }}>
            <span>Dates de l&apos;événement</span>
          </Box>
          <Box
            sx={{
              width: "10%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          ></Box>
        </Box>
        {stories.map((story, i) => (
          <Card sx={{ marginBottom: 3, display: "flex" }} key={i}>
            <CardContent sx={{ width: "60%" }}>
              <Typography variant="h5">{story.title}</Typography>
            </CardContent>
            <CardContent sx={{ width: "30%" }}>
              {moment(story.start).format("DD-MM-YYYY")}
              {story.end
                ? " - " + moment(story.end).format("DD-MM-YYYY")
                : null}
            </CardContent>
            <CardActions
              sx={{
                width: "10%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Link href={`/dashboard/stories/${story.id}`} passHref>
                <IconButton color="secondary">
                  <EditIcon />
                </IconButton>
              </Link>
              <Link href={`/dashboard/stories/${story.id}/delete`} passHref>
                <IconButton color="primary">
                  <DeleteIcon />
                </IconButton>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Dashboard>
  );
};

export default StoriesDashboard;

export async function getServerSideProps<GetServerSideProps>() {
  const company = await models.company.findUnique({
    where: { name: COMPANY_NAME },
    include: { companyStories: true },
  });
  const ser_stories = serialize(
    company?.companyStories.sort((a, b) => (a.start > b.start ? -1 : 1))
  );
  return { props: { ser_stories } };
}
