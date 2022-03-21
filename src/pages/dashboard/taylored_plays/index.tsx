import { Button, Card, CardActions, CardContent, Chip } from "@mui/material"
import { Box } from "@mui/system"
import { AudienceCategory, Tag } from "@prisma/client"
import Dashboard from "components/dashboard/LayoutDashboard"
import Typography from "components/Typography"
import models from "lib/models"
import Link from "next/link"

type TayloredPlayWithAudienceAndTags = {id: number, title: string, concept: string, audienceCategories: AudienceCategory[], tags: Tag[] }
type Props = {taylored_plays: TayloredPlayWithAudienceAndTags[] }

const TayloredPlaysDashboard: React.FC<Props> = ({taylored_plays}) => {
  
  return (
    <Dashboard >
      <Typography variant='h2' sx={{marginTop: 5}}>Spectacles sur-mesure </Typography>
      <Link href="/dashboard/taylored_plays/create"><Button color="secondary" variant="contained" type="submit">Ajouter</Button></Link>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop:3, width: "100%"}}>
        {taylored_plays.map((play, i) => 
          <Card sx={{ minWidth: 275, marginTop: 8 }} key={i}>
            <CardContent>
              <Typography variant='h3'>{play.title}</Typography>
              <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <Typography variant='h5'>Publics</Typography>
                  <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    {play.audienceCategories.map((item, j)=>
                      <Chip label={item.title} key={j}/>
                    )}
                  </Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap'}}>
                  <Typography variant='h5'>Tags</Typography>
                  <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    {play.tags.map((item, k)=>
                      <Chip label={item.title} key={k}/>
                    )}
                  </Box>
                </Box>
              </Box>
              {/* <Typography variant="h5" component="div" sx={{mt: 3}}>
               {play.concept}
              </Typography> */}
            </CardContent>
            <CardActions sx={{justifyContent: 'center'}}>
              <Link href={`/dashboard/taylored_plays/${play.id}/delete`} passHref><Button variant="contained" size="small">Supprimer</Button></Link>
              <Link href={`/dashboard/taylored_plays/${play.id}`} passHref><Button color="secondary" variant="contained" size="small">Éditer</Button></Link>
            </CardActions>
          </Card>
        )}
      </Box>
    </Dashboard>
  )
}

export default TayloredPlaysDashboard

export async function getServerSideProps<GetServerSideProps>() {
  
  const taylored_plays = await models.tayloredPlay.findMany({include: {audienceCategories: true, tags: true}})

  return { props: { taylored_plays } }
}