import { Button, Card, CardActions, CardContent, Chip } from "@mui/material"
import { Box } from "@mui/system"
import { Artist } from "@prisma/client"
import Dashboard from "components/dashboard/LayoutDashboard"
import Typography from "components/Typography"
import models from "lib/models"
import Link from "next/link"

type Props = {artists: Artist[] }

const ArtistDashboard: React.FC<Props> = ({artists}) => {
  // console.log(artists)
  return (
    <Dashboard >
      <Typography variant='h2' sx={{marginTop: 5}}>Les Artistes</Typography>
      <Link href="/dashboard/artists/create"><Button color="secondary" variant="contained" type="submit">Ajouter</Button></Link>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop:5, width: "100%"}}>
        {artists.map((artist, i) => 
          <Card sx={{ minWidth: 275, marginTop: 8 }} key={i}>
            <CardContent>
              <Typography variant='h5'>{artist.firstname} {artist.lastname}</Typography>
              {/* {artist.logo_src && <img src={artist.logo_src} width='150px' height= '100%'/>} */}
            </CardContent>
            <CardActions sx={{justifyContent: 'center'}}>
              <Link href={`/dashboard/artists/${artist.id}/delete`} passHref><Button variant="contained" size="small">Supprimer</Button></Link>
              <Link href={`/dashboard/artists/${artist.id}`} passHref><Button color="secondary" variant="contained" size="small">Éditer</Button></Link>
            </CardActions>
          </Card>
        )}

      </Box>
    </Dashboard>
  )
}

export default ArtistDashboard

export async function getServerSideProps<GetServerSideProps>() {
  
  const artists = await models.artist.findMany()
  return { props: { artists } }
}