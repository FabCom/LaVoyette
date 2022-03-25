import { Container, Box, Button, Card, CardContent, Typography, Grid, CardActions, IconButton, Stack, Chip } from '@mui/material'
import { AudienceCategory, Role, Tag } from "@prisma/client"
import Dashboard from "components/dashboard/LayoutDashboard"
import models from "lib/models"
import Link from "next/link"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export type TayloredPlayWithAudienceAndTags = { id: number, title: string, concept: string, audienceCategories: AudienceCategory[], tags: Tag[] }

const TayloredPlaysDashboard = ({ taylored_plays }: { taylored_plays: TayloredPlayWithAudienceAndTags[] }) => {
  return (
    <Dashboard>
      <Typography variant='h2' sx={{marginTop: 5}}>Les spectacles sur-mesure</Typography>
      <Link href="/dashboard/taylored_plays/create" passHref>
        <Button color="secondary" variant="contained" type="submit">Ajouter</Button>
      </Link>
      <Box sx={{ mt: 5,width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ width: '100%', padding:5 , display: 'flex', flexDirection: 'row'}}>
          <Box sx={{width:"40%"}}>
          <span>Titre</span>
          </Box>
          <Box sx={{width:"25%"}}>
            <span>Public</span>
          </Box>
					<Box sx={{width:"25%"}}>
            <span>Tags</span>
          </Box>
          <Box sx={{width:"10%"}}>
          	
          </Box>
        </Box>
        {taylored_plays.map((play, i) =>
          <Grid item xs={4} key={i}>
            <Card sx={{ mb: 3, display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}>
              <CardContent sx={{width: '40%'}}>
                <Typography variant="h5" component="div">{play.title}</Typography>
                {/* <Typography variant="body2" color="initial">{(play.concept) ? play.concept.slice(0, 100) : null}...</Typography> */}
              </CardContent>
              <CardContent sx={{width: '25%'}}>
                <Stack direction="row" spacing={2} sx={{ my: 1 }}>
                  {play.audienceCategories.map((item, k) =>
                    <Chip size="small" variant="outlined" label={item.title} key={k} />
                  )}
                </Stack>
              </CardContent>
              <CardContent sx={{width: '25%'}}>
                <Stack direction="row" spacing={2} sx={{ my: 1 }}>
                  {play.tags.map((item, k) =>
                    <Chip size="small" label={item.title} key={k} />
                  )}
                </Stack>
              </CardContent>
              <CardActions  sx={{width: '10%'}}>
                <Link href={`/tailoredplays/${play.id}`} passHref>
                  <IconButton><RemoveRedEyeIcon /></IconButton>
                </Link>
                <Link href={`taylored_plays/${play.id}`} passHref>
                  <IconButton color="secondary"><EditIcon /></IconButton>
                </Link>
                <Link href={`/dashboard/taylored_plays/${play.id}/delete`} passHref>
                  <IconButton color="primary"><DeleteIcon /></IconButton>
                </Link>
              </CardActions>
            </Card>
          </Grid >
        )}
      </Box >
    </Dashboard>
  )
}

TayloredPlaysDashboard.auth = {
  role: Role.ADMIN,
};

export default TayloredPlaysDashboard

export async function getServerSideProps<GetServerSideProps>() {
  const taylored_plays = await models.tayloredPlay.findMany({ include: { audienceCategories: true, tags: true } })

  return { props: { taylored_plays } }
}
