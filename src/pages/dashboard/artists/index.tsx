import { Button, Card, CardActions, CardContent, IconButton } from "@mui/material"
import { Box } from "@mui/system"
import { Artist, Role } from "@prisma/client"
import Dashboard from "components/dashboard/LayoutDashboard"
import Typography from "components/Typography"
import models from "lib/models"
import Link from "next/link"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const ArtistDashboard = ({artists}: {artists: Artist[] }) => {
  // console.log(artists)
  return (
    <Dashboard>
      <Typography variant="h2" sx={{ marginTop: 5 }}>
        Les Artistes
      </Typography>
      <Link href="/dashboard/artists/create" passHref>
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
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          marginTop: 5,
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: 5,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box sx={{ width: "90%" }}>
            <span>Nom</span>
          </Box>
          <Box sx={{ width: "10%" }}></Box>
        </Box>
        {artists.map((artist, i) => (
          <Card
            sx={{
              width: "100%",
              marginBottom: 3,
              display: "flex",
              flexDirection: "row",
            }}
            key={i}
          >
            <CardContent sx={{ width: "90%" }}>
              <Typography variant="h5">
                {artist.firstname} {artist.lastname}
              </Typography>
            </CardContent>
            <CardActions sx={{ width: "10%", justifyContent: "center" }}>
              <Link href={`/dashboard/artists/${artist.id}/delete`} passHref>
                <IconButton color="primary">
                  <DeleteIcon />
                </IconButton>
              </Link>
              <Link href={`/dashboard/artists/${artist.id}`} passHref>
                <IconButton color="secondary">
                  <EditIcon />
                </IconButton>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Dashboard>
  );
};

ArtistDashboard.auth = {
  role: Role.ADMIN,
};

export default ArtistDashboard

export async function getServerSideProps<GetServerSideProps>() {
  const artists = await models.artist.findMany();
  return { props: { artists } };
}
