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
  console.log(stories)
  return (
    <Dashboard >
      <Typography variant='h2' sx={{marginTop: 5}}>Partenaires de la compagnie</Typography>
      <Link href="/dashboard/stories/create"><Button color="secondary" variant="contained" type="submit">Ajouter</Button></Link>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop:5, width: "100%"}}>
        {stories.map((story, i) => 
          <Card sx={{ minWidth: 275, marginTop: 8 }} key={i}>
            <CardContent>
              <Typography variant='h5'>{story.title}</Typography>
              {moment(story.start).format('DD-MM-YYYY')}{story.end ? " - " + moment(story.end).format('DD-MM-YYYY') : null}
            </CardContent>
            <CardActions sx={{justifyContent: 'center'}}>
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
  const ser_stories = serialize(company?.companyStories)
  return { props: { ser_stories } }
}