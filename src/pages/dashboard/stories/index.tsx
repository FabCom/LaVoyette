import { Button, Card, CardActions, CardContent, Chip } from "@mui/material"
import { Box } from "@mui/system"
import { CompanyStory } from "@prisma/client"
import Dashboard from "components/dashboard/LayoutDashboard"
import Typography from "components/Typography"
import { COMPANY_NAME } from "config"
import models from "lib/models"
import Image from "next/image"
import Link from "next/link"
import { deserialize, serialize } from "superjson";
import { SuperJSONResult } from "superjson/dist/types"
import moment from 'moment';



const StoriesDashboard= ({ser_stories}: {ser_stories: SuperJSONResult}) => {
  const stories: CompanyStory[] = deserialize(ser_stories)
  // console.log(stories)
  return (
    <Dashboard >
      <Typography variant='h2' sx={{marginTop: 5}}>Historique de la compagnie</Typography>
      <Link href="/dashboard/stories/create"><Button color="secondary" variant="contained" type="submit">Ajouter</Button></Link>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'space-between', flexWrap: 'wrap', padding:5, width: "100%"}}>
          <Box sx={{ width: '100%', marginTop:5, padding:5 , display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Box sx={{width:"60%"}}>
              Titre
            </Box>
            <Box sx={{width:"20%"}}>
              Dates de l'événement
            </Box>
            <Box sx={{width:"20%"}}>
              Supprimer Éditer
            </Box>
          </Box>
        {stories.map((story, i) => 
          <Card sx={{ marginBottom: 3 , display: 'flex'}} key={i}>
            <CardContent sx={{width:"60%"}}>
              <Typography variant='h5'>{story.title}</Typography>
            </CardContent>
            <CardContent sx={{width:"20%"}}>
              {moment(story.start).format('DD-MM-YYYY')}{story.end ? " - " + moment(story.end).format('DD-MM-YYYY') : null}
            </CardContent>
            <CardActions sx={{width:"20%", justifyContent: 'center'}}>
              <Link href={`/dashboard/stories/${story.id}/delete`} passHref><Button variant="contained" size="small">Supprimer</Button></Link>
              <Link href={`/dashboard/stories/${story.id}`} passHref><Button color="secondary" variant="contained" size="small">Éditer</Button></Link>
            </CardActions>
          </Card>
        )}

      </Box>
    </Dashboard>
  )
}

export default StoriesDashboard

export async function getServerSideProps<GetServerSideProps>() {
  
  const company = await models.company.findUnique({where: {name: COMPANY_NAME}, include: {companyStories: true}})
  const ser_stories = serialize(company?.companyStories.sort((a,b)=>(a.start > b.start) ? -1 : 1))
  return { props: { ser_stories } }
}