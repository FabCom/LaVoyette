import { Button, Card, CardActions, CardContent } from "@mui/material"
import { Box } from "@mui/system"
import Typography from "components/Typography"
import { dashboard_contents } from "config/dashboard_content"
import Link from "next/link"

const Dashboard = () => {
  
  return (
    <Box sx={{padding: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
      <Box sx={{marginTop: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%'}}>
        <Typography variant='h2'>DASHBOARD</Typography>
      </Box>
      {dashboard_contents.map((item, i)=> (
        <Card sx={{ minWidth: 275, margin: 3 }} key={i}>
          <CardContent>
            <Typography variant='h3'>{item.title}</Typography>
            <p>{item.text}</p>
          </CardContent>
          <CardActions sx={{justifyContent: 'center'}}>
            <Link href={item.path}><Button color='secondary'>Voir</Button></Link>
          </CardActions>
        </Card>
      ))}
    </Box>
  )
}

export default Dashboard

{/* <Card sx={{ minWidth: 275 }}>
<CardContent>

</CardContent>
<CardActions>

</CardActions>
</Card> */}