import { Button, Card, CardActions, CardContent } from "@mui/material"
import { Box } from "@mui/system"
import { TayloredPlay } from "@prisma/client"
import Dashboard from "components/dashboard/LayoutDashboard"
import Typography from "components/Typography"
import models from "lib/models"
import Link from "next/link"

type Props = {taylored_plays: TayloredPlay[]}

const TayloredPlaysDashboard: React.FC<Props> = ({taylored_plays}) => {

  console.log(taylored_plays)
  
  return (
    <Dashboard >
      <Typography variant='h2' sx={{marginTop: 5}}>Spectacles sur-mesure </Typography>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop:5, width: "100%"}}>
        {taylored_plays.map((play, i) => 
          <Card sx={{ minWidth: 275 }} key={i}>
            <CardContent>
              <Typography variant='h3'>{play.title}</Typography>
              {/* <Typography variant="h5" component="div" sx={{mt: 3}}>
               {play.concept}
              </Typography> */}
            </CardContent>
            <CardActions sx={{justifyContent: 'center'}}>
              <Link href={`/dashboard/taylored_plays/${play.id}`}><Button sx={{backgroundColor: 'palette.primary'}}>Éditer</Button></Link>
            </CardActions>
          </Card>
        )}
      </Box>
    </Dashboard>
  )
}

export default TayloredPlaysDashboard

export async function getServerSideProps<GetServerSideProps>() {
  
  const taylored_plays = await models.tayloredPlay.findMany({})

  return { props: { taylored_plays } }
}