import { Container, Box, Button, Card, CardContent, Typography, Grid, CardActions, IconButton, Stack, Chip } from '@mui/material'
import { AudienceCategory, Tag } from "@prisma/client"
import Dashboard from "components/dashboard/LayoutDashboard"
import models from "lib/models"
import Link from "next/link"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

type TayloredPlayWithAudienceAndTags = { id: number, title: string, concept: string, audienceCategories: AudienceCategory[], tags: Tag[] }
type Props = { taylored_plays: TayloredPlayWithAudienceAndTags[] }

const TayloredPlaysDashboard: React.FC<Props> = ({ taylored_plays }) => {
  return (
    <Dashboard>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Link href="/dashboard/taylored_plays/create" passHref>
          <Button variant="contained" color="secondary" size='large' sx={{ mb: 5 }}>Nouveau spectacle sur mesure</Button>
        </Link>
        <Grid container spacing={1}>
          {taylored_plays.map((play, i) =>
            <Grid item xs={4} key={i}>
              <Card sx={{ mb: 3 }}>
                <CardContent >
                  <Typography variant="h5" component="div">{play.title}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mr: 5 }}>
                    <Stack direction="row" spacing={2} sx={{ my: 1 }}>
                      {play.audienceCategories.map((item, k) =>
                        <Chip size="small" variant="outlined" label={item.title} key={k} />
                      )}
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ my: 1 }}>
                      {play.tags.map((item, k) =>
                        <Chip size="small" label={item.title} key={k} />
                      )}
                    </Stack>
                  </Box>
                  <Typography variant="body2" color="initial">{(play.concept) ? play.concept.slice(0, 100) : null}...</Typography>
                </CardContent>
                <CardActions >
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
        </Grid>
      </Container >
    </Dashboard>
  )
}

export default TayloredPlaysDashboard

export async function getServerSideProps<GetServerSideProps>() {
  const taylored_plays = await models.tayloredPlay.findMany({ include: { audienceCategories: true, tags: true } })

  return { props: { taylored_plays } }
}
