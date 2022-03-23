import models from "lib/models"
import { deserialize, serialize } from "superjson";
import { User } from "@prisma/client"
import { SuperJSONResult } from "superjson/dist/types"
import { Button, Card, CardActions, CardContent, Chip } from "@mui/material"
import { Box } from "@mui/system"
import Dashboard from "components/dashboard/LayoutDashboard"
import Typography from "components/Typography"
import Link from "next/link"
import moment from 'moment';


const UsersDashboard = ({ser_users}:{ser_users: SuperJSONResult}) => {
  const users: User[] = deserialize(ser_users);
  console.log(users)
  return (
    <Dashboard >
      <Typography variant='h2' sx={{marginTop: 5}}>Utilisate</Typography>
      <Link href="/dashboard/stories/create" passHref><Button color="secondary" variant="contained" type="submit">Ajouter</Button></Link>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'space-between', flexWrap: 'wrap', padding:5, width: "100%"}}>
          <Box sx={{ width: '100%', marginTop:5, padding:5 , display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Box sx={{width:"60%"}}>
            <span>Email</span>
            </Box>
            <Box sx={{width:"20%"}}>
              <span>Rôle</span>
            </Box>
            <Box sx={{width:"20%"}}>
            <span>Supprimer Éditer</span>
            </Box>
          </Box>
        {users.map((user, i) => 
          <Card sx={{ marginBottom: 3 , display: 'flex'}} key={i}>
            <CardContent sx={{width:"60%"}}>
              <Typography variant='h5'>{user.email}</Typography>
            </CardContent>
            <CardContent sx={{width:"20%"}}>
              <Typography variant='h5'>{user.role}</Typography>
            </CardContent>
            <CardActions sx={{width:"20%", justifyContent: 'center'}}>
              <Link href={`/dashboard/users/${user.id}/delete`} passHref><Button variant="contained" size="small">Supprimer</Button></Link>
              <Link href={`/dashboard/users/${user.id}`} passHref><Button color="secondary" variant="contained" size="small">Éditer</Button></Link>
            </CardActions>
          </Card>
        )}
      </Box>
    </Dashboard>
  )
        }
export default UsersDashboard


export async function getServerSideProps() {

  const users = await models.user.findMany()
  const ser_users = serialize(users)
  return { props: { ser_users } }
}